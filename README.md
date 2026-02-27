# Claude Quality Toolbox

A collection of [Claude Code skills](https://docs.anthropic.com/en/docs/claude-code/skills) that extend your AI coding assistant with specialized, reusable behaviors — from code aesthetics to Jira triage to image enhancement.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## What are Skills?

Skills are prompt files that teach Claude Code a specialized behavior. They live in `~/.claude/skills/` (or a project-local `skills/` directory) and are invoked with a `/skill-name` slash command or triggered automatically by matching descriptions.

Each skill in this toolbox is a focused, tested capability with clear inputs, consistent outputs, and documented behavior.

---

## Skills

### `/code-knolling` — Code Aesthetics

> *"Knolling is the practice of arranging objects at 90-degree angles, grouped by category, evenly spaced — everything parallel, organized, and visually intentional."*

Code knolling is what happens after your formatter runs. Prettier handles surface formatting; knolling handles the deeper structural and semantic organization that no tool automates.

The skill works in **five sequential passes**:

| Pass | Focus | Example |
|------|-------|---------|
| 1 | Spacing & whitespace | Blank lines after guard clauses, before final returns, between import groups |
| 2 | Naming & clarity | Rename vague variables, extract magic numbers, decompose complex booleans |
| 3 | Decomposition | Break single-line calculations into named steps, expand nested ternaries |
| 4 | Alignment & ordering | Vertical alignment of assignments, consistent key ordering in objects |
| 5 | Structure & grouping | Flag parameter groups as type candidates, audit error handling consistency |

**Invoke it:**

```
/code-knolling
```

```
Please knoll the auth service before we hand it off to the new team.
```

**Test fixtures** are included in `code-knolling/tests/` — a realistic `sample-before.ts` and its fully-knolled `sample-after.ts` — so you can evaluate the skill's output against a known-good reference.

---

### `/image-enhancer` — Image Quality

Enhances images using ImageMagick (`magick` CLI). Covers sharpening, noise reduction, format conversion, resizing, and compression artifact reduction. Requires ImageMagick (`brew install imagemagick`).

**Invoke it:**

```
/image-enhancer
```

```
Sharpen screenshot.png and save without overwriting the original
```

```
Reduce JPEG artifacts in this image and convert to WebP
```

**Works well for:**
- UI screenshots heading into documentation
- Reducing compression artifacts on exported images
- Batch converting or resizing a folder of assets

---

### `/jira` — Jira Task List

Fetches your open Jira issues and displays them as a prioritized markdown table. Groups results by status (In Progress → In Review → To Do), highlights P0 issues, and surfaces story point estimates.

**Invoke it:**

```
/jira
```

**Output format:**

| Key | Summary | Type | Status | Priority | Points | Updated |
|-----|---------|------|--------|----------|--------|---------|
| ENG-42 | Fix login redirect loop | Bug | In Progress | P1 | 3 | Feb 26 |
| **ENG-7** | **Production outage — auth service** | **Bug** | **In Progress** | **🔴 P0** | **—** | **Feb 27** |

> Requires the [Atlassian MCP integration](https://modelcontextprotocol.io/) to be configured in your Claude Code environment.

---

## Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/craig-davis/claude-quality-toolbox.git
   ```

2. Copy the skills you want into your Claude skills directory:

   ```sh
   # Individual skills
   cp -r skills/code-knolling ~/.claude/skills/
   cp -r skills/image-enhancer ~/.claude/skills/
   cp -r skills/jira ~/.claude/skills/

   # Or symlink for live updates
   ln -s "$(pwd)/skills/code-knolling" ~/.claude/skills/code-knolling
   ```

3. Restart Claude Code — skills are discovered automatically.

---

## Structure

```
claude-quality-toolbox/
└── skills/
    ├── code-knolling/
    │   ├── SKILL.md               # Skill definition (5-pass knolling system)
    │   └── tests/
    │       ├── sample-before.ts   # Unorganized input fixture
    │       ├── sample-after.ts    # Expected output after knolling
    │       └── README.md          # What each pass tests and why
    ├── image-enhancer/
    │   └── SKILL.md               # Image enhancement skill definition
    └── jira/
        └── SKILL.md               # Jira task listing skill definition
```

---

## License

MIT © 2026 Craig Davis
