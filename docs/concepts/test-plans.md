---
sidebar_position: 6
title: Test plans
description: Grouping runs into one unit of work and reporting on them together.
---

# Test plans

A **test plan** groups several test runs into one unit of work, so they can be reported on
together.

Use a plan when a body of testing spans more than one run. Common cases:

- A release needs several runs — one per feature area — and you want a single view of whether
  the release is ready.
- A regression cycle runs weekly across platforms, and each platform is its own run.
- You want to hand someone one link that represents the whole testing effort.

:::note Test plans require a paid plan
Test plans are not available on the Free plan. See [Plans and quotas](../getting-started/plans-and-quotas).
:::

## Lifecycle

Like runs, plans move through three states:

| State | Action to leave | Notes |
| --- | --- | --- |
| `draft` | **Activate Plan** | Being assembled |
| `active` | **Close Plan** | In progress |
| `closed` | — | Finished |

You can filter the plans list by state.

## Creating a plan

A plan needs a **name** (required, 1–255 characters) and can take a description.

Once created, attach runs to it. The attach picker lists the project's runs that are **not already
attached**, so a run belongs to a plan at most once. When every run is attached, the picker says
*"All project runs are already attached to this plan."*

You can also detach a run from a plan without deleting the run — the run itself is unaffected.

## What a plan reports

A plan aggregates the results across all its attached runs into one summary: totals for each
result type and an overall pass rate.

This is the number to look at when deciding whether a release is ready — unlike a single run, it
covers everything that was executed for that piece of work.

## Plans and AI Intelligence

A test plan can be created directly from an [AI Intelligence](../guides/ai-intelligence) analysis.
When you accept recommended cases from an analysis, **Create Test Plan from Selection** builds a
plan from those cases, so a release's AI-suggested coverage becomes a plan you can execute.

## Plan vs run — which to use

| You want to… | Use |
| --- | --- |
| Execute a set of cases and record results | A **run** |
| Re-execute the same cases next week | A new **run**, started from a **run template** |
| Report on several runs as one effort | A **plan** |
| Track quality over time across many runs | **Reports** — not a plan |

A plan is a grouping for reporting, not an execution mechanism. You execute runs; the plan
aggregates them.
