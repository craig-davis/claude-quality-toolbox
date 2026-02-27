# Code Knolling Test Fixtures

## Purpose

These fixtures let you evaluate the code-knolling skill manually. Apply the skill to `sample-before.ts` and compare the result against `sample-after.ts`.

## How to Use

1. Open a new session and load `sample-before.ts`
2. Run `/code-knolling`
3. Diff the output against `sample-after.ts`

## What Each File Tests

### Pass 1 — Spacing & Whitespace
- **Before**: No blank line after the `if (!u)` guard clause return; no blank line before final `return` in `formatScore`; imports not grouped (third-party mixed with local)
- **After**: Guard clauses followed by blank lines; blank line before each final return; third-party imports separated from local imports with a blank line

### Pass 2 — Naming & Clarity
- **Before**: Vague names (`u`, `s`, `lbl`, `t`, `ts`, `fmtDate`); `new Date()` called twice on consecutive lines; magic numbers `1.5`, `0.5`, `100` inline in calculation
- **After**: Descriptive names (`user`, `score`, `label`, `now`, `timestamp`, `formattedDate`); `new Date()` called once and reused; constants `POINTS_WEIGHT`, `BONUS_WEIGHT`, `SCORE_SCALE` extracted to the top of the file; long boolean condition broken into `hasValidEmail` and `isEligible`

### Pass 3 — Decomposition & Simplification
- **Before**: Complex score calculation as a single expression; nested ternary for tier/active label; unreachable `console.log` after `return null`
- **After**: Calculation split into `weightedPoints`, `weightedBonus`, `denominator`, `score`; nested ternary expanded to `if/else`; unreachable code removed

### Pass 4 — Alignment & Ordering
- **Before**: `saveScore` data object keys in arbitrary order (`label, timestamp, score, date`); `getDefaultSettings` keys in arbitrary order (`notifications, maxScore, timezone, minScore, ...`)
- **After**: Keys ordered primary/required first (`score, label, timestamp, date`); settings ordered constraints → display → locale → behavior

> **Note on vertical alignment**: The skill's Pass 4 alignment rule (aligning `=` signs into a column) is automatically stripped by Prettier on save. This is expected — in a Prettier-formatted codebase, the alignment benefit is limited to contexts Prettier doesn't touch (e.g., SQL, config files, hand-maintained tables).

### Pass 5 — Structure & Grouping
- **Before**: `userId/orgId/tenantId` repeated across `scoreUser`, `logActivity`, and `saveScore` with no comment; `logActivity` silently swallows errors while `fetchUserRecord` throws them
- **After**: `TODO [Pass 5]` comments flagging the parameter group as a `UserContext` candidate; `TODO [Pass 5]` comments flagging the inconsistent error handling strategy

## Notes

- The formatter (Prettier) handles some of what Passes 1 and 4 address — long argument lists, import grouping style, brace spacing. The skill's highest value is in Passes 2, 3, and 5, which no formatter touches.
- The `sample-after.ts` file has been run through the project linter, so the expected output reflects real-world output (not idealized pre-Prettier code).
