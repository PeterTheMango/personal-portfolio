/**
 * Runtime configuration, in the spirit of DESIGN.md §8.
 *
 * `scrollReveal` is a deliberate departure from DESIGN.md §7.1, which states
 * that content does not animate in or out. Enabled after an A/B of both
 * versions. Flip per-visit with `?reveal=1` / `?reveal=0` (the choice is
 * remembered in localStorage) to compare against the contract behaviour.
 */
export const scrollReveal = true;

/** localStorage key holding the per-visitor override, if any. */
export const REVEAL_STORAGE_KEY = "pf-reveal";
