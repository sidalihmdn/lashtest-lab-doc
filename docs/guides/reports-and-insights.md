---
sidebar_position: 7
title: Reports and insights
description: Trends across runs, flakiness detection, and exporting reports.
---

# Reports and insights

Reports turn a pile of run results into a picture of whether quality is improving. They live in the
**Reports** section of a project.

:::note Requires a paid plan
Reports are not available on the Free plan. See
[Plans and quotas](../getting-started/plans-and-quotas).
:::

## Trends

The trends tab charts three measures across your recent runs:

| Chart | What it shows |
| --- | --- |
| **Pass rate (%)** | The share of terminal results that passed |
| **Fail rate (%)** | The share that failed |
| **Execution rate (%)** | How much of the planned work was actually executed |

Pass rate alone can mislead — see [How pass rate is calculated](../concepts/pass-rate). Reading it
with execution rate is what tells you whether you genuinely tested the release or just tested a
small part of it thoroughly.

You control how many runs the charts cover: between 5 and 100, defaulting to 20.

Until you have enough history, the tab shows *"Not enough data"* rather than a misleading flat line.

## Flakiness

The flakiness tab lists test cases that alternate between pass and fail.

| Column | Meaning |
| --- | --- |
| Case | The test case title |
| Suite | Which area it belongs to |
| Executions | How many times it has run |
| Pass / fail counts | The raw tallies |
| Alternations | How many times the result flipped between consecutive runs |
| **Flakiness score** | Alternations divided by executions |

A **high flakiness score** means the result flips often. These are the worst cases to have in a
suite, because each result has to be investigated before it can be trusted — a flaky case costs
attention every time it runs, whether it passes or fails.

This is different from a case that consistently fails. A consistently failing case is broken and
obvious; a flaky one gives false confidence on the runs where it happens to pass.

:::tip Use the flakiness report as a work queue
The highest scores are the most valuable cases to fix or retire. A suite with fewer, trustworthy
tests is more useful than a larger one where results cannot be believed.
:::

When there is nothing flaky, the tab says *"No flaky tests detected"*.

You control how many cases the list covers: between 5 and 100, defaulting to 30.

## Exporting

Trends, flakiness, and individual run results each export to **CSV** and **PDF**.

- **CSV** — for further analysis in a spreadsheet or a script.
- **PDF** — for attaching evidence to a release ticket or sharing with people outside the tool.

Individual run results export to PDF from the reports area as well.

## What reports need from you

Reports are only as good as the data behind them. Three habits make them accurate:

1. **Record real results.** A run closed with everything still `not_run` contributes nothing.
2. **Use `blocked` and `skipped` honestly.** Both count against pass rate, which keeps the number
   truthful — see [pass rate](../concepts/pass-rate).
3. **Keep running.** Trends need several runs. One run is a snapshot; five runs show a direction.

## Reports and test plans

For a single release spanning several runs, a [test plan](../concepts/test-plans) aggregates them
into one summary. Reports answer *"how has quality moved over time?"*; a plan answers *"is this
release ready?"*
