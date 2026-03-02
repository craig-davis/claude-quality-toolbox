---
name: jira
description: List open Jira tasks assigned to the current user. Use when the user types /jira or asks to see their Jira tickets or tasks.
---

Fetch and display the user's open Jira tasks using the Atlassian MCP tools.

1. Look for `CLAUDE.md` in the current working directory — check `CLAUDE.md` first, then `.claude/CLAUDE.md`. Read whichever exists (if both exist, prefer the root one). Find the `## Jira` section and extract:
   - **Cloud ID** → use as `cloudId`
   - **Estimate Field** → use as the custom field ID (e.g. `customfield_10026`)
   - **Estimate Label** → use as the column header in the results table

   If `CLAUDE.md` does not exist or the `## Jira` section is missing, stop and tell the user to add the following to their `CLAUDE.md`:

   ```
   ## Jira

   - **Cloud ID**: <your-cloud-id>
   - **Estimate Field**: <customfield_XXXXX>
   - **Estimate Label**: Points
   ```

2. Call `mcp__claude_ai_Atlassian__searchJiraIssuesUsingJql` with:
   - cloudId: (from CLAUDE.md)
   - jql: `assignee = currentUser() AND statusCategory != Done ORDER BY updated DESC`
   - fields: `["summary", "status", "issuetype", "priority", "updated", "project", "<estimate-field>"]`
   - maxResults: 50

3. Display results as a markdown table with columns: Key (linked), Summary, Type, Status, Priority, <Estimate Label>, Updated. For the estimate column, use the custom field from step 1, showing `—` if null.

4. Group by status category if there are many results (In Progress first, then To Do, then In Review).

5. If the priority of a row is P0, bold the entire row and prefix the priority cell with 🔴 (e.g. **🔴 P0**). Do not use any HTML style attributes — the renderer strips them and may drop the entire table block.
