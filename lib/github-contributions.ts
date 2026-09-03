/**
 * Real GitHub contribution data for the commit-history section.
 *
 * Two sources, in order of preference:
 *   1. GitHub's GraphQL API when GITHUB_TOKEN is set. Authoritative, and it
 *      includes private-repo contributions when the profile opts in.
 *   2. github-contributions-api.jogruber.de — no auth, public contributions
 *      only. Keeps the section working on a fresh clone with no secrets.
 *
 * Both are cached for an hour; the graph only changes once a day in practice.
 */

export type ContributionDay = {
  /** ISO date, YYYY-MM-DD */
  date: string;
  count: number;
  /** 0–4, GitHub's own intensity buckets */
  level: number;
};

/** The graph's window, the full history behind it, and the account total. */
type Fetched = {
  days: ContributionDay[];
  allDays: ContributionDay[];
  allTimeTotal: number;
};

export type ContributionData = {
  /** The rolling 12-month window the graph draws. */
  days: ContributionDay[];
  /** Every contribution on the account, across all years — not just `days`. */
  total: number;
  /** Longest run of consecutive days with at least one contribution, all time. */
  longestStreak: number;
  /** Streak ending today (or yesterday, so a quiet morning doesn't zero it). */
  currentStreak: number;
  /** Busiest single day on the account, all time. */
  best: ContributionDay | null;
  source: "graphql" | "public-api";
};

const REVALIDATE_SECONDS = 3600;

const GRAPHQL_QUERY = `query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

const CREATED_AT_QUERY = `query($login: String!) { user(login: $login) { createdAt } }`;

/**
 * `contributionsCollection` accepts at most a one-year span, so all-time figures
 * mean one sub-query per year the account has existed. They are aliased into a
 * single request rather than fetched in a loop.
 *
 * The days come back too, for the streak and busiest-day figures. Their levels
 * are quartiles computed per calendar year, which is why the graph still uses
 * its own window query rather than slicing these — GitHub's colours for a
 * rolling 12 months are not the same buckets.
 */
function allTimeQuery(firstYear: number, lastYear: number) {
  const fields: string[] = [];
  for (let year = firstYear; year <= lastYear; year += 1) {
    fields.push(
      `y${year}: contributionsCollection(` +
        `from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z"` +
        `) { contributionCalendar { totalContributions ` +
        `weeks { contributionDays { date contributionCount contributionLevel } } } }`,
    );
  }
  return `query($login: String!) { user(login: $login) { ${fields.join(" ")} } }`;
}

type YearCalendar = {
  contributionCalendar?: {
    totalContributions?: number;
    weeks?: { contributionDays: unknown[] }[];
  };
} | null;

function toDay(day: unknown): ContributionDay {
  const d = day as {
    date: string;
    contributionCount: number;
    contributionLevel: string;
  };
  return {
    date: d.date,
    count: d.contributionCount,
    level: LEVEL_BY_NAME[d.contributionLevel] ?? 0,
  };
}

const LEVEL_BY_NAME: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** Both sources pad the current calendar year with future zero-days; they would
 *  otherwise break the current-streak walk on their way back from December. */
function withoutFutureDays(days: ContributionDay[], today: Date) {
  const cutoff = today.toISOString().slice(0, 10);
  return days.filter((day) => day.date <= cutoff);
}

function startOfWindow(to: Date) {
  const from = new Date(to);
  from.setUTCFullYear(from.getUTCFullYear() - 1);
  from.setUTCDate(from.getUTCDate() + 1);
  return from;
}

async function graphql(token: string, query: string, variables: object) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL responded ${res.status}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GitHub GraphQL error");
  }
  return json;
}

async function fetchAllTimeFromGraphQL(
  login: string,
  token: string,
  to: Date,
): Promise<{ allDays: ContributionDay[]; allTimeTotal: number }> {
  const profile = await graphql(token, CREATED_AT_QUERY, { login });
  const createdAt = profile.data?.user?.createdAt;
  if (!createdAt) throw new Error(`No profile for @${login}`);

  const firstYear = new Date(createdAt).getUTCFullYear();
  const years = await graphql(
    token,
    allTimeQuery(firstYear, to.getUTCFullYear()),
    { login },
  );

  const user = years.data?.user as Record<string, YearCalendar> | undefined;
  if (!user) throw new Error(`No contribution history for @${login}`);

  let allTimeTotal = 0;
  const allDays: ContributionDay[] = [];

  for (const year of Object.values(user)) {
    const calendar = year?.contributionCalendar;
    if (typeof calendar?.totalContributions === "number") {
      allTimeTotal += calendar.totalContributions;
    }
    for (const week of calendar?.weeks ?? []) {
      for (const day of week.contributionDays) allDays.push(toDay(day));
    }
  }

  return { allDays: withoutFutureDays(allDays, to), allTimeTotal };
}

async function fetchFromGraphQL(
  login: string,
  token: string,
): Promise<ContributionDay[]> {
  const to = new Date();
  const json = await graphql(token, GRAPHQL_QUERY, {
    login,
    from: startOfWindow(to).toISOString(),
    to: to.toISOString(),
  });

  const weeks =
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) {
    throw new Error(`No contribution calendar for @${login}`);
  }

  return weeks.flatMap((week: { contributionDays: unknown[] }) =>
    week.contributionDays.map(toDay),
  );
}

async function fetchFromPublicApi(login: string): Promise<Fetched> {
  // `y=all` returns every year's days plus a per-year total map, so the rolling
  // window and the all-time figure both come from a single request.
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
      login,
    )}?y=all`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );

  if (!res.ok) {
    throw new Error(`Contributions API responded ${res.status}`);
  }

  const json = (await res.json()) as {
    total?: Record<string, number>;
    contributions?: { date: string; count: number; level: number }[];
  };
  if (!json.contributions?.length) {
    throw new Error(`No contributions returned for @${login}`);
  }

  const allTimeTotal = Object.values(json.total ?? {}).reduce(
    (sum, count) => sum + count,
    0,
  );

  // The API returns whole calendar years; trim to a rolling 12 months so the
  // graph always ends on today.
  const today = new Date();
  const from = startOfWindow(today).toISOString().slice(0, 10);
  const to = today.toISOString().slice(0, 10);

  const all = json.contributions.map((day) => ({
    date: day.date,
    count: day.count,
    level: day.level,
  }));

  return {
    days: all.filter((day) => day.date >= from && day.date <= to),
    allDays: withoutFutureDays(all, today),
    allTimeTotal,
  };
}

/**
 * Every figure describes the whole account. Only `days` — what the graph draws —
 * is the rolling 12-month window.
 */
function summarise(
  { days, allDays, allTimeTotal }: Fetched,
  source: ContributionData["source"],
): ContributionData {
  const sorted = [...allDays].sort((a, b) => a.date.localeCompare(b.date));

  let longestStreak = 0;
  let run = 0;
  let best: ContributionDay | null = null;

  for (const day of sorted) {
    if (day.count > 0) {
      run += 1;
      longestStreak = Math.max(longestStreak, run);
    } else {
      run = 0;
    }
    if (!best || day.count > best.count) best = day;
  }

  // Walk backwards for the live streak, allowing today to still be empty.
  let currentStreak = 0;
  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    const day = sorted[i];
    if (day.count > 0) {
      currentStreak += 1;
    } else if (i === sorted.length - 1) {
      continue;
    } else {
      break;
    }
  }

  return {
    days: [...days].sort((a, b) => a.date.localeCompare(b.date)),
    total: allTimeTotal,
    longestStreak,
    currentStreak,
    best,
    source,
  };
}

export async function getContributions(
  login: string,
): Promise<ContributionData | null> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const now = new Date();
      const [days, allTime] = await Promise.all([
        fetchFromGraphQL(login, token),
        fetchAllTimeFromGraphQL(login, token, now),
      ]);
      return summarise({ days, ...allTime }, "graphql");
    } catch (error) {
      console.error("[commit-history] GraphQL fetch failed:", error);
    }
  }

  try {
    return summarise(await fetchFromPublicApi(login), "public-api");
  } catch (error) {
    console.error("[commit-history] public API fetch failed:", error);
    return null;
  }
}
