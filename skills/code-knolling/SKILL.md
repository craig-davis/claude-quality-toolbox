---
name: code-knolling
description: >
  Apply this skill when asked to "knoll", clean up, tidy, or aesthetically
  organize code. Covers spacing, naming clarity, decomposition, alignment,
  and structural grouping. Use when preparing code for review or handoff,
  or when code is functional but visually or semantically cluttered.
---

# Code Knolling Skill

## What is Code Knolling?

Knolling is the practice of arranging objects at 90-degree angles, grouped by category, evenly spaced — everything parallel, organized, and visually intentional. Applied to code, knolling means arranging the elements of a file or function so that the structure, intent, and relationships are immediately legible. Prettier handles surface formatting; knolling handles the deeper aesthetic and semantic organization.

## When to Apply This Skill

Apply this skill when:
- Asked to "knoll" a file or function
- Asked to clean up, tidy, or organize code beyond formatting
- Performing a code review pass focused on readability and clarity
- Preparing code for handoff or long-term maintenance

## How to Apply This Skill

Work through the file in passes, one category at a time. Do not attempt to apply all rules simultaneously. Each pass has a focus.

---

## Pass 1: Spacing & Whitespace

These rules govern blank lines and breathing room.

- Conditional blocks that end with a `return` statement must be followed by a blank line before the next statement.
- The final `return` of a function must always have a blank line above it.
- Group related variable declarations together. Separate unrelated groups with a blank line.
- Sort imports in this order: stdlib, then third-party, then local. Separate each group with a blank line.

---

## Pass 2: Naming & Clarity

These rules reduce the need for comments by making the code self-describing.

- If a comment exists solely to explain what the next line does, evaluate whether renaming the variable or function eliminates the need for the comment. Prefer the rename.
- Extract magic numbers and magic strings into named constants declared at the top of the scope.
- If a long boolean condition exists in an `if` statement, break it into one or more named intermediate boolean variables that describe the intent. The `if` statement should then read like a sentence.
- If the same expression appears more than once in a scope, extract it into a named variable.
- Function names within a module should use consistent verb prefixes. Audit for consistency across the file: `get`, `fetch`, `build`, `validate`, `parse`, `format`, etc. Flag inconsistencies.

---

## Pass 3: Decomposition & Simplification

These rules reduce cognitive load by breaking complex logic into legible steps.

- If a complex calculation exists on one line, evaluate whether it can be broken into intermediate steps with named variables. Each intermediate variable should describe what it holds, not how it was computed.
- If a function body shows more than one distinct responsibility, flag it with a comment for extraction. Do not extract automatically unless instructed.
- If similar consecutive function calls differ only by argument, evaluate whether they can be consolidated into a loop or map.
- If an inline ternary contains nesting or side effects, expand it to a full conditional block.
- If logic follows an early return and can never be reached, remove it.

---

## Pass 4: Alignment & Ordering

These rules apply visual grouping through consistent layout.

- When a block of related assignments exists (config, constants, struct fields), align the `=` or `:` signs vertically so values form a column.
- Object, dict, or hash literal keys should follow a consistent ordering: required or primary fields first, optional or secondary fields after.
- Function calls with long argument lists should be broken to one argument per line with consistent indentation.

---

## Pass 5: Structure & Grouping

These rules identify structural issues that affect long-term maintainability.

- If function parameters consistently appear together across multiple call sites, flag them as a candidate for grouping into a struct, object, or type.
- Audit error handling across the file. If some errors are handled and others are silently ignored, flag every inconsistency with a comment. Do not resolve them automatically unless instructed.

---

## Output Expectations

- Apply all changes to the actual code. Do not describe what you would do — do it.
- When flagging rather than fixing (function extraction, error handling, parameter grouping), leave an inline comment at the relevant location with a brief explanation.
- Do not remove existing comments unless they are being replaced by a rename that makes them redundant.
- Do not alter logic. Knolling is structural and aesthetic. If you believe a logic issue exists, note it separately after completing the knolling pass.
- After completing all passes, provide a brief summary of what was changed and what was flagged.