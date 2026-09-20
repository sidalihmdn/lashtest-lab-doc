---
sidebar_position: 8
title: AI Intelligence
description: Analysing a release's tickets to find coverage, identify gaps, and propose missing test cases.
---

# AI Intelligence

AI Intelligence reads the tickets in a release, compares them against your existing test cases, and
tells you two things:

- **Which tickets are already covered** — and by which cases.
- **Which tickets have no coverage at all**, with drafted test cases to fill the gap.

It is a coverage aid, not an autopilot. Everything it proposes is reviewed by a human before it
becomes a test case.

:::note Requires a Pro or Enterprise plan
On the Free plan the feature is locked, showing *"AI Intelligence requires a Pro or Enterprise
plan."* You must also configure an AI provider — see
[AI providers](../integrations/ai-providers).
:::

## Before you start

Three things must be in place:

1. **A ticket integration.** AI Intelligence reads tickets from Jira or Linear. See
   [Ticket integrations](../integrations/ticket-integrations).
2. **A project mapped to a destination.** The project must map to a Jira project or Linear team,
   since that is where releases come from.
3. **An AI provider configured.** An org admin sets this up once for the organisation.

If any of these is missing, the page tells you which one and where to fix it.

## How releases are determined

The analysis works on one **release** at a time:

| Provider | What counts as a release |
| --- | --- |
| **Jira** | Fix versions (archived versions are excluded) |
| **Linear** | Team cycles |

Pick the release from a searchable list. Its tickets are then loaded for you to select from.

## Running an analysis

1. **Choose a release.**
2. **Select the tickets to analyse.** You can analyse all of them or a subset — useful when a
   release contains unrelated work you do not want to test.
3. **Click Analyze Release.**

The button stays disabled until you select at least one ticket, showing *"Select at least one
ticket"*.

### While it runs

The status card shows **"Analysis queued…"** while the job waits to start, then
**"Analyzing `{release}`…"** while it works.

:::warning One analysis at a time per project
You cannot start a second analysis while one is `pending` or `running`. Attempting to gives
*"Wait for it to complete before triggering a new one."*
:::

### If it fails

A failed analysis shows **"Analysis failed"** with the error and a **Retry** button. Common causes
are an invalid AI provider key or a ticket integration whose credentials have expired.

## Reading the results

### Summary

The top of the results shows *"N tickets analyzed · N covered · N gaps · N proposals"* — a quick
read on how much of the release your existing cases cover.

### Recommendations

For each ticket that has matching test cases, the analysis lists them with two things:

| Field | Meaning |
| --- | --- |
| **Confidence** | How sure the model is that this case covers this ticket, from 0.0 to 1.0 |
| **Rationale** | Why it considers them a match |

Confidence is colour-coded:

| Confidence | Shown as |
| --- | --- |
| **0.8 or above** | Green — a strong match |
| **0.5 to 0.8** | Amber — plausible, worth checking |
| **Below 0.5** | Grey — weak |

:::tip Treat confidence as a triage signal
High-confidence matches are usually right, but they still deserve a glance — the model is matching
on ticket and case text, and can be fooled by similar wording describing different behaviour.

Low-confidence matches are worth reviewing: either the case genuinely covers the ticket and its
title is unclear, or it does not and you have found a gap.
:::

Cases that were themselves created from an accepted AI proposal show a sparkle **AI** chip instead
of a confidence badge, so you can tell AI-origin cases apart from ones a person wrote.

### Coverage gaps

Tickets with no matching case appear under coverage gaps, each with a red **"No coverage"** badge
and one or more **proposed test cases** drafted to cover it.

## Reviewing proposals

Each proposed case is a draft you either accept or reject. A proposal includes:

| Field | Notes |
| --- | --- |
| Title | Editable before accepting |
| Description | Editable |
| Steps | Editable, each with an action and optional expected outcome |
| Expected result | Editable |
| Priority | Editable — `low`, `medium`, `high`, or `critical` |
| Suggested suite | Where it would be filed |

### Accepting

**Accept** creates a real test case. You can edit any field first — the proposal is a starting
point, and editing it before accepting is normal.

Accepted cases are tagged as AI-origin, which is what makes the sparkle chip appear and lets you
see later how much of your library came from AI suggestions.

### Rejecting

**Reject** discards the proposal. You can give an optional reason, which is worth doing when the
reason is not obvious — it records why the suggestion was wrong.

### Proposals expire

Unreviewed proposals **expire after 30 days**. Review a batch reasonably soon after running an
analysis, or the proposals will disappear before you get to them.

## Creating a test plan from an analysis

Once you have reviewed the recommendations, you can turn the selected cases into a
[test plan](../concepts/test-plans):

1. Tick the recommended cases you want to include.
2. Click **Create Test Plan from Selection**.
3. Enter a plan name — the placeholder suggests something like `Q4 Release Coverage`.
4. Confirm; the button reads **"Create Plan (N cases)"**.

This builds a plan from the chosen cases, ready to execute. It is the natural way to turn "here is
what this release needs tested" into work someone can actually do.

## Discarding an analysis

**Discard** abandons an analysis. It is only available once the analysis is awaiting review, and it
is not reversible:

> *"All pending proposals will be rejected. This cannot be undone."*

Use it when an analysis was run against the wrong release, or is superseded by a newer one.

## Analysis history

Previous analyses are listed below, with their status:

| Status | Shown as |
| --- | --- |
| `pending` | Queued |
| `running` | Running |
| `complete` / `awaiting_review` | Awaiting review |
| `plan_created` | Plan created |
| `discarded` | Discarded |
| `failed` | Failed |

Each entry records who triggered it, when, and its summary counts, so you can see what has been
analysed and how much coverage it found.

## What data is sent to the AI provider

This is the disclosure shown in the product when you configure a provider. It is a commitment, so
it is reproduced here exactly:

> Your ticket titles and descriptions, and test case titles and descriptions are sent to your
> configured AI provider when running an analysis. No attachments, comments, or personal data are
> included.

What this means in practice:

| Sent | Not sent |
| --- | --- |
| Ticket titles and descriptions | Attachments |
| Test case titles and descriptions | Comments |
| | Personal data |

If your tickets contain personal or sensitive information, that content **will** be sent to your
configured provider. Review what is in your tickets before running an analysis, and choose a
provider whose data handling you are comfortable with — including whether it retains or trains on
submitted content.

Note also that the provider is one **you** configure with your own API key, so the data goes to your
account with that provider, under their terms.

## Limits

| Limit | Value |
| --- | --- |
| Plan requirement | Pro or Enterprise |
| Concurrent analyses per project | **1** |
| Tickets fetched per release | **200** |
| Ticket batch size during processing | 50 |
| Proposal expiry | **30 days** |
| Analysis timeout | 300 seconds (soft), 360 seconds (hard) |

The 200-ticket cap means very large releases are truncated. If a release exceeds it, analyse it in
smaller pieces — by component, or by splitting the fix versions.

The 5-minute timeout means an analysis over a large ticket set with a slow provider can fail
outright. Custom and self-hosted providers get a longer per-request timeout, but the overall
analysis is still bound by the task limit.
