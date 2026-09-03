import { getContributions, type ContributionDay } from "@/lib/github-contributions";
import { profile } from "./content";

/**
 * Contribution graph rendered from live GitHub data (GraphQL when
 * GITHUB_TOKEN is set, the public contributions API otherwise) instead of a
 * third-party image. Server component — the fetch is cached for an hour.
 */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

type Week = (ContributionDay | null)[];

/** Group days into Sunday-first columns, padding the leading partial week. */
function toWeeks(days: ContributionDay[]): Week[] {
  const weeks: Week[] = [];
  let week: Week = [];

  if (!days.length) return weeks;

  const firstDay = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < firstDay; i += 1) week.push(null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

/** One label per week column: the month name where a new month begins. */
function monthLabels(weeks: Week[]): (string | null)[] {
  let previous = -1;
  return weeks.map((week) => {
    const first = week.find(Boolean);
    if (!first) return null;
    const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    if (month === previous) return null;
    previous = month;
    return MONTHS[month];
  });
}

function label(day: ContributionDay) {
  const date = DATE_FORMAT.format(new Date(`${day.date}T00:00:00Z`));
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${date}`;
}

export async function CommitHistory() {
  const data = await getContributions(profile.githubHandle);
  const weeks = data ? toWeeks(data.days) : [];
  const months = monthLabels(weeks);

  return (
    <section className="pf-section">
      <div className="pf-section-head" data-reveal>
        <h2 className="pf-label">Commit history</h2>
        <span className="pf-caption">
          Graph shows the last 12 months · figures are all-time
        </span>
        <a
          className="pf-chart-link"
          href={profile.github}
          target="_blank"
          rel="noopener"
        >
          @{profile.githubHandle} &#8599;
        </a>
      </div>

      {data ? (
        <div className="pf-chart-frame" data-reveal>
            <div className="pf-graph">
              <div className="pf-graph-months">
                {months.map((month, i) => (
                  <span key={i} className="pf-graph-month">
                    {month}
                  </span>
                ))}
              </div>
              <div className="pf-graph-grid">
                {weeks.map((week, w) =>
                  week.map((day, d) =>
                    day ? (
                      <span
                        key={day.date}
                        className="pf-graph-cell"
                        data-level={day.level}
                        data-tip={label(day)}
                      />
                    ) : (
                      <span
                        key={`pad-${w}-${d}`}
                        className="pf-graph-cell"
                        data-level="empty"
                      />
                    ),
                  ),
                )}
              </div>
            </div>

            <div className="pf-graph-footer">
              <dl className="pf-graph-stats">
                <div>
                  <dt>Contributions</dt>
                  <dd>{data.total.toLocaleString("en-US")}</dd>
                </div>
                <div>
                  <dt>Longest streak</dt>
                  <dd>{data.longestStreak} days</dd>
                </div>
                <div>
                  <dt>Current streak</dt>
                  <dd>{data.currentStreak} days</dd>
                </div>
                <div>
                  <dt>Busiest day</dt>
                  <dd>{data.best?.count ?? 0}</dd>
                </div>
              </dl>
              <div className="pf-graph-legend" aria-hidden="true">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="pf-graph-cell"
                    data-level={level}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
        </div>
      ) : (
        <div className="pf-chart-frame pf-chart-empty" data-reveal>
          Contribution data is unavailable right now.
        </div>
      )}
    </section>
  );
}
