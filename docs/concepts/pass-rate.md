---
sidebar_position: 7
title: How pass rate is calculated
description: Which results count toward pass rate, and why skipped tests are included.
---

# How pass rate is calculated

Pass rate is the headline number in the product, so it is worth being precise about what it means.

## The formula

```
              pass
pass rate = ─────────────────────────────────────
            pass + fail + blocked + skipped + obsolete
```

The denominator is **terminal results** — results that represent a finished decision. Anything
still in flux is excluded.

## What is included and excluded

| Result | Counts? | Why |
| --- | --- | --- |
| `pass` | ✅ numerator and denominator | A success |
| `fail` | ✅ denominator | A failure |
| `blocked` | ✅ denominator | Counted as not-passing |
| `skipped` | ✅ denominator | Counted as not-passing — see below |
| `obsolete` | ✅ denominator | Counted as not-passing |
| `not_run` | ❌ excluded | No decision has been made yet |
| `in_progress` | ❌ excluded | Still being worked on |

## Why skipped counts against you

This is the most common surprise. A skipped test is **not** a passing test, so it lowers the pass
rate.

The reasoning: if you skip a test and it still counted as a pass, a run where everything was
skipped would show a 100% pass rate. That would be misleading — nothing was verified. By counting
`skipped` in the denominator, a run that skipped its hard cases reports honestly.

If you deliberately skip cases that should not count, consider whether they belong in the run at
all. Removing a case from a run is a clearer signal than skipping it.

## Why not_run is excluded

An unexecuted case is not a failure. If `not_run` counted against you, every run would show a
poor rate the moment it was created, before anyone had tested anything.

The practical consequence: **pass rate measures the quality of what you executed, not how much
you executed.** A run where you executed 2 of 100 cases and passed both shows a 100% pass rate.
Use the **execution rate** in reports to see how much of the planned work was actually done.

## Execution rate

Reports show execution rate alongside pass rate:

```
                 terminal results
execution rate = ─────────────────
                   total cases
```

Reading the two together is what gives a real picture:

| Pass rate | Execution rate | Reading |
| --- | --- | --- |
| High | High | Genuinely healthy |
| High | Low | Misleading — little was actually tested |
| Low | High | Real problems, thoroughly tested |

## Where pass rate appears

- **Run detail page** — the rate for that run.
- **Run cards** in the runs list — with colour coding: green at **80% or above**, amber from
  **50%**, red below that.
- **Test plan summary** — aggregated across every attached run.
- **Reports → Trends** — pass rate and fail rate per run over time.
- **Reports → Flakiness** — per-case pass and fail counts.

## Flakiness score

Flakiness is a different measurement. A case is **flaky** when it alternates between pass and fail
across runs, rather than consistently passing or consistently failing.

The **flakiness score** in reports is the number of alternations divided by the number of
executions. A case that goes pass → fail → pass → fail scores high, regardless of whether it
passes overall. A case that has failed every time is not flaky — it is broken, and that is a
different problem with a different fix.

Flakiness matters because a high score means the test cannot be trusted to tell you anything:
each result has to be investigated again. The reports tab lists flaky cases so you can fix or
retire them.
