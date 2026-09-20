---
sidebar_position: 2
title: Statuses and results
description: Every status value in the product, with the label shown in the interface.
---

# Statuses and results

This page lists every status value, including the label the interface displays for it. Internal
values and interface labels differ in a few places, so both are given.

## Test case status

| Value | Meaning |
| --- | --- |
| `draft` | Being written, or not yet trusted |
| `active` | Current and expected to pass |
| `deprecated` | Kept for history, no longer executed |

New cases default to `draft`. Bulk status changes only offer `draft` and `active`.

## Test case priority

| Value | Meaning |
| --- | --- |
| `low` | Edge cases and cosmetic checks |
| `medium` | The default |
| `high` | Important flows |
| `critical` | Core flows that block release |

## Test case format

| Value | Meaning |
| --- | --- |
| `steps` | A numbered list of actions |
| `gherkin` | Given / When / Then |

## Test run status

| Value | Interface label | Meaning |
| --- | --- | --- |
| `draft` | **DRAFT** | Being assembled |
| `active` | **IN PROGRESS** | Execution under way |
| `closed` | **COMPLETED** | Finished; read-only |

:::info Labels differ from values
The internal value `active` displays as **IN PROGRESS**, and `closed` displays as **COMPLETED**.
This is deliberate: "active" reads better as a verb in the interface than as a state name. If you
are reading the API, expect the internal values.
:::

## Test run trigger

| Value | Shown as |
| --- | --- |
| `manual` | *"Triggered manually"* |
| `webhook` | *"Triggered by CI"* |

## Test case result

| Value | Interface label | Keyboard | Counts toward pass rate |
| --- | --- | --- | --- |
| `not_run` | Not Run | — | ❌ Excluded |
| `pass` | Pass | `p` | ✅ Numerator and denominator |
| `fail` | Fail | `f` | ✅ Denominator |
| `blocked` | Blocked | `b` | ✅ Denominator |
| `skipped` | Skipped | `s` | ✅ Denominator |
| `in_progress` | In Progress | `i` | ❌ Excluded |
| `obsolete` | Obsolete | `o` | ✅ Denominator |

New results default to `not_run`. See
[How pass rate is calculated](../concepts/pass-rate) for the reasoning behind which results count.

## Test plan status

| Value | Action to leave | Meaning |
| --- | --- | --- |
| `draft` | **Activate Plan** | Being assembled |
| `active` | **Close Plan** | In progress |
| `closed` | — | Finished |

## Organisation status

| Value | Meaning |
| --- | --- |
| `active` | Normal |
| `deleting` | Soft-deleted; purged after 30 days |
| `deleted` | Purged |

## Organisation role

| Value |
| --- |
| `owner` |
| `admin` |
| `tester` |
| `viewer` |

## Invitation status

| Value | Meaning |
| --- | --- |
| `pending` | Sent, awaiting acceptance |
| `accepted` | The person joined |
| `cancelled` | Withdrawn by an admin |
| `expired` | Past the 7-day window |

## CI connection status

| Value | Meaning |
| --- | --- |
| `active` | Working |
| `expired` | Credentials no longer valid |
| `error` | Other failure |

## CI job status

| Value | Meaning |
| --- | --- |
| `pending` | Queued |
| `running` | In progress |
| `completed` | Finished successfully |
| `failed` | Finished with errors |
| `cancelled` | Cancelled by a user |

## AI analysis status

| Value | Interface label |
| --- | --- |
| `pending` | *"Analysis queued…"* |
| `running` | *"Analyzing `{release}`…"* |
| `complete` | *"Awaiting review"* |
| `awaiting_review` | *"Awaiting review"* |
| `plan_created` | *"Plan created"* |
| `discarded` | *"Discarded"* |
| `failed` | *"Analysis failed"* |

## AI proposed case status

| Value | Meaning |
| --- | --- |
| `pending` | Awaiting review |
| `accepted` | Became a test case |
| `rejected` | Declined by a reviewer |
| `expired` | Past the 30-day review window |

## Linked ticket status category

Provider workflow states are normalised into three categories:

| Value | Meaning |
| --- | --- |
| `todo` | Not started |
| `in_progress` | Being worked on |
| `done` | Finished |

The provider's own status name is preserved alongside the category.

## Webhook events

| Event |
| --- |
| `run.created` |
| `run.status_changed` |
| `run.assigned` |
| `case.result_changed` |
| `case.comment_added` |

## Webhook provider

| Value |
| --- |
| `slack` |
| `discord` |
| `teams` |
| `custom` |

## CI provider

| Value |
| --- |
| `github` |
| `gitlab` |
| `jenkins` |
| `custom` |

## Ticket provider

| Value |
| --- |
| `jira` |
| `linear` |

## AI provider

| Value |
| --- |
| `anthropic` |
| `openai` |
| `custom` |
| `huggingface` |

## AI ticket type

Ticket types are normalised from each provider's own naming:

| Value |
| --- |
| `bug` |
| `story` |
| `task` |
| `epic` |
| `other` |
