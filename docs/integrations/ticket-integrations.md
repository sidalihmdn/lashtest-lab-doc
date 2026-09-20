---
sidebar_position: 5
title: Ticket integrations
description: Connecting Jira or Linear to link test cases with issues.
---

# Ticket integrations

This page covers **connecting** Jira or Linear. For how linked tickets behave during testing, see
[Tickets and linked issues](../guides/tickets-and-linked-issues).

:::note Requires a paid plan
Ticket integrations are not available on the Free plan. See
[Plans and quotas](../getting-started/plans-and-quotas).
:::

## Supported providers

| Provider | Authentication |
| --- | --- |
| **Jira** | Site URL, Atlassian account email, and an API token |
| **Linear** | An API key |

One connection per provider per organisation. To use Jira in several organisations, connect it in
each with that organisation's own credentials.

## Connecting Jira

An admin or owner configures this at **Org settings → Integrations → Tickets**.

| Field | Where to get it |
| --- | --- |
| **Base URL** | Your Jira site, e.g. `https://your-team.atlassian.net` |
| **Account email** | The Atlassian account that owns the token |
| **API token** | Create at your Atlassian account's security settings |

The token inherits the permissions of the account that created it. Use an account that can read the
projects you intend to map, and create issues where needed. A token created by an account with no
access to a project will fail when you try to map it.

## Connecting Linear

| Field | Where to get it |
| --- | --- |
| **API key** | Linear → Settings → API |

## Always test the connection

Each form has a **Test connection** button. It saves the credentials and then lists available
projects or teams, confirming with something like:

> *"Connection successful. 12 projects found. Credentials saved."*

Do this immediately. It turns a silent misconfiguration into an obvious error, rather than a
failure the first time someone files a ticket mid-run.

## Mapping projects

Connecting at the organisation level does not by itself attach anything to a project. Each project
needs a mapping, at **Project settings → Tickets**:

| Provider | You choose |
| --- | --- |
| Jira | One Jira project |
| Linear | One Linear team |

A project with no mapping shows *"(not connected)"*, even when the organisation connection is
healthy. This is the most common confusion: the org is connected, so tickets "should" work, but the
project has no destination.

Changing a mapping redirects **future** tickets. Existing links are unaffected.

## Credentials are encrypted

Ticket credentials are encrypted at rest. They are stored per organisation, so a member of one
organisation cannot use another's connection.

## What the integration enables

| Capability | Where it appears |
| --- | --- |
| Inline ticket status on linked cases | Run execution view |
| Create a ticket from a failing case | Run execution view |
| Release listing for [AI Intelligence](../guides/ai-intelligence) | AI analysis page |

That last one is significant: AI Intelligence reads releases from your ticket provider, using Jira
fix versions or Linear cycles. Without a ticket integration, the AI feature has nothing to analyse.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| *"No ticket integration configured for this project."* | The project has no mapping — set one at Project settings → Tickets |
| *"No `{provider}` integration found for this organisation."* | The org credentials are missing — configure at Org settings → Integrations |
| *"Could not fetch releases from `{provider}` (`{status}`). Check your integration credentials."* | The token is invalid or revoked |
| *"Timed out fetching releases from `{provider}`. Try again."* | The provider was slow or unreachable |

For a rejected token, check it directly in Jira or Linear. Revoked tokens are the usual culprit, and
the app cannot tell you that the token is revoked — only that its requests are refused.
