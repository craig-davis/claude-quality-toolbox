---
name: jira
description: List open Jira tasks assigned to the current user. Use when the user types /jira or asks to see their Jira tickets or tasks.
---

Fetch and display the user's open Jira tasks using the Atlassian MCP tools.

1. Call `mcp__claude_ai_Atlassian__searchJiraIssuesUsingJql` with:
   - cloudId: `d3f01b0b-913d-4f7a-a1d5-dba37bead165`
   - jql: `assignee = currentUser() AND statusCategory != Done ORDER BY updated DESC`
   - fields: `["summary", "status", "issuetype", "priority", "updated", "project", "customfield_10026"]`
   - maxResults: 50

2. Display results as a markdown table with columns: Key (linked), Summary, Type, Status, Priority, Points, Updated. For Points, use `customfield_10026`, showing `—` if null.

3. Group by status category if there are many results (In Progress first, then To Do, then In Review).

4. If the priority of a row is P0, bold the entire row and prefix the priority cell with 🔴 (e.g. **🔴 P0**). Do not use any HTML style attributes — the renderer strips them and may drop the entire table block.
