---
sidebar_position: 6
title: Tickets and linked issues
description: Linking test cases to Jira or Linear issues and creating tickets from failures.
---

# Tickets and linked issues

Connecting a ticket tracker lets you see issue status next to the test case it relates to, so a
tester knows whether a known bug is still open without switching tools.

Lashtest Lab supports **Jira** and **Linear**.

:::note Requires a paid plan
Ticket integrations are not available on the Free plan. See
[Plans and quotas](../getting-started/plans-and-quotas).
:::

## Two levels of configuration

Ticket integration happens at two levels, and both are needed:

| Level | Where | What it does |
| --- | --- | --- |
| **Organisation** | Org settings → Integrations | Stores credentials for Jira or Linear |
| **Project** | Project settings → Tickets | Maps the project to one Jira project or Linear team |

The organisation connection authenticates you with the provider. The project mapping decides
**which** destination tickets are created in and read from. A project with no mapping shows
*"(not connected)"*.

## Connecting the organisation

An admin or owner configures this in organisation settings.

### Jira

| Field | Notes |
| --- | --- |
| Base URL | Your Jira site, e.g. `https://your-team.atlassian.net` |
| Account email | The Atlassian account that owns the API token |
| API token | Created in your Atlassian account settings |

### Linear

| Field | Notes |
| --- | --- |
| API key | A personal or workspace API key from Linear |

### Test before you rely on it

Each connection form has a **Test connection** button. It saves the credentials and then attempts
to list your projects or teams, reporting something like *"Connection successful. 12 projects
found. Credentials saved."*

Use it immediately after entering credentials — it catches a mistyped token straight away rather
than the first time someone tries to create a ticket during a test run.

Credentials are stored encrypted. Only one connection per provider per organisation is allowed.

## Mapping a project

Once the organisation is connected, map the project:

1. Open project settings → **Tickets**.
2. Load the list of available destinations.
3. Select one Jira project or one Linear team.

Changing the mapping later changes where **new** tickets go; it does not move existing ones.

## What a linked ticket gives you

### Status on a test case

Link a case to a Jira or Linear issue and the issue's status appears alongside the case. During
execution, a tester can see whether the underlying defect is still open without leaving the run.

Ticket data is cached and refreshed in the background, so statuses update without slowing the
interface.

### Creating a ticket from a failure

When a case fails, you can create a ticket directly from it. The ticket is created in the project's
mapped destination. This keeps the loop short: find a bug, file it, and have the case linked to it
without retyping the title or steps.

### Linking rules

A linked ticket URL must be a Jira-style URL of the form
`https://<site>.atlassian.net/browse/<KEY>-<number>`. Other URL shapes are rejected.

## Ticket status categories

Whatever a provider calls its workflow states, the ticket cache normalises them into three
categories so the interface can show a consistent signal:

| Category | Meaning |
| --- | --- |
| **To do** | Not started |
| **In progress** | Being worked on |
| **Done** | Finished |

The original status name is preserved alongside the category, so you still see "In Review" rather
than a generic label.

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Project shows *"(not connected)"* | The project has no mapping, or the org integration is missing |
| Ticket list will not load | The org credentials are wrong, or the token was revoked |
| Statuses are stale | The cache refreshes in the background; it should catch up shortly |

For connection failures, verify the token still works in Jira or Linear directly — a revoked API
token is the most common cause.
