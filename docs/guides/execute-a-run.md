---
sidebar_position: 3
title: Executing a test run
description: Working through a run quickly, recording results, and closing it out.
---

# Executing a test run

A run is executed from its detail page. The interface is built for speed, because working through
a long run is repetitive.

## Before you start

Check that the run is in the right state:

1. **Start the run** — click **Start Run** to move it from `DRAFT` to `IN PROGRESS`.
2. **Confirm the case list** — add cases with **Add Test Cases** if the run is missing anything.
   Cases already in the run are shown as unavailable, so a case can only appear once.

You can record results in either state; starting a run is mainly a signal that work has begun.

## Recording results

Each case takes one of seven results:

| Result | Key | Use when |
| --- | --- | --- |
| **Pass** | `p` | It works as expected |
| **Fail** | `f` | It does not work |
| **Blocked** | `b` | You cannot test it — something else is broken |
| **Skipped** | `s` | Deliberately not tested this time |
| **In Progress** | `i` | Being worked on now |
| **Obsolete** | `o` | No longer relevant |
| **Not Run** | — | The default |

Alongside the result you can add **notes** to record what actually happened — the exact error
message, the environment, the data used. Notes are the difference between a result someone can act
on and a bare pass/fail that has to be investigated from scratch.

## Moving fast with the keyboard

| Shortcut | Action |
| --- | --- |
| `j` or `↓` | Next case |
| `k` or `↑` | Previous case |
| `Enter` | Open the focused case |
| `x` | Toggle selection |
| `Esc` | Close the open case |
| `p` `f` `b` `s` `i` `o` | Set the result |

The result keys are suppressed while you are typing in a notes field, so a note containing the
letter `p` will not mark the case as passed.

:::tip The efficient habit
Work top to bottom with `j`, and set each result with a single key. Open a case with `Enter` only
when you need to write a note.
:::

## Bulk results

Select several cases with `x`, then apply one result to all of them. This is most useful when:

- A build was unavailable and a whole suite is **skipped**.
- A dependency is broken and several cases are **blocked** for the same reason.
- You are clearing out cases that are no longer relevant as **obsolete**.

Bulk updates accept up to **500 cases** at a time.

## Assigning cases

A run can be assigned to one person, and individual cases within the run can be assigned
separately. Use per-case assignment when a run is split between testers — one person owns the
checkout cases, another owns payments.

Only an active owner, admin, or tester can be assigned.

## Watching automated results arrive

If the run is connected to CI, automated results appear as they are pushed in. A CI job panel
shows the job's status — `pending`, `running`, `completed`, or `failed` — refreshing automatically
while the job is in flight.

The run header shows **"Triggered by CI"** for runs created by a pipeline, and **"Triggered
manually"** otherwise. A pending or running job can be **cancelled**; once it finishes it cannot
be.

See [CI integration](../integrations/ci-overview) for how results get matched to cases.

## Closing the run

When you are done, click **Close Run**. The run moves to `COMPLETED`.

:::warning Closing is permanent
A closed run cannot be reopened and its results cannot be edited. This is deliberate — it makes
the run a reliable historical record, which is what trends and flakiness detection depend on.

If you spot a mistake after closing, the fix is to create a new run. Start it from a
[run template](./run-templates) so it contains the same cases.
:::

## Re-running the same set of cases

Testing rarely happens once. To repeat a run's cases:

1. If you do not already have one, open the completed run and use **Save as Template** — this
   saves its case list for reuse.
2. Create a new run, choosing that template under **From template**.
3. Start it and execute.

This is how regression cycles work in practice: the template holds the cases, each run holds one
execution's results.

## Exporting a run's results

A closed run's results can be exported to PDF from the reports area — useful for attaching evidence
to a release ticket or sharing with someone outside the tool.
