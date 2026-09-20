---
sidebar_position: 5
title: Test runs
description: The run lifecycle, per-case results, assignment, and the execution view.
---

# Test runs

A **test run** is a set of test cases executed together, with a result recorded for each. It is
the unit of testing work: you create one, work through its cases, and close it.

Typical run names describe a scope and a moment — `Checkout smoke — 1 Oct`, `Release 4.2 regression`.

## Lifecycle

A run moves through three states:

```
draft  ──"Start Run"──▶  active  ──"Close Run"──▶  closed
```

| State | Shown as | What you can do |
| --- | --- | --- |
| `draft` | **DRAFT** | Add and remove cases, edit the run, record results |
| `active` | **IN PROGRESS** | Record results, add cases |
| `closed` | **COMPLETED** | Read only |

:::warning Closing a run is one-way
A closed run cannot be reopened, and its results cannot be changed. That immutability is the
point — it makes the run a trustworthy record of what was actually observed. To test again,
create a new run.
:::

Attempting to modify a closed run fails with *"This run has already been closed."*

## Creating a run

When you create a run you can set:

| Field | Notes |
| --- | --- |
| **Name** | Required, 1–255 characters |
| **Description** | Optional context |
| **From template** | Optionally start from a saved [run template](../guides/run-templates) to preload its cases |
| **Assignee** | Optionally assign the run to a member |

The run is created with trigger `manual`. Runs created by CI carry trigger `webhook` and show
*"Triggered by CI"* in their header instead of *"Triggered manually"*.

### Who can be assigned

Only an **active owner, admin, or tester** can be assigned a run. Viewers are not eligible, and
the interface filters them out of the picker. Assigning an ineligible user is rejected with
*"Assignee must be an active owner, admin, or tester in this organisation."*

You can unassign a run, returning it to nobody.

## Adding cases

Cases are added from a browse-and-select picker that lets you search the suite tree. Cases already
in the run are shown as unavailable, so you cannot add the same case twice — a case appears **once
per run**.

## Recording results

Each case in a run has exactly one result:

| Result | Keyboard | Meaning |
| --- | --- | --- |
| `not_run` | — | The default; not yet executed |
| `pass` | `p` | Works as expected |
| `fail` | `f` | Does not work |
| `blocked` | `b` | Cannot be tested because something else is broken |
| `skipped` | `s` | Deliberately not tested this time |
| `in_progress` | `i` | Currently being worked on |
| `obsolete` | `o` | No longer relevant |

Alongside the result you can record **notes**, set a **per-case assignee**, and see when the case
was last executed.

### The execution view

The run detail page is built for speed, because executing a large run is repetitive work.

| Shortcut | Action |
| --- | --- |
| `j` / `↓` | Next case |
| `k` / `↑` | Previous case |
| `Enter` | Open the focused case |
| `x` | Toggle selection |
| `Esc` | Close the open case |
| `p` `f` `b` `s` `i` `o` | Set the result directly |

Result shortcuts are suppressed while you are typing in a notes field, so writing a note
containing the letter `p` will not mark the case as passed.

### Bulk results

To set the same result on many cases, select them and apply the result in bulk — useful for
marking a whole suite as skipped when a build was not available. Bulk updates accept up to
**500 cases** at a time.

## Run assignment

A run can be assigned to one member, and individual cases within it can be assigned separately.
That lets a lead hand one run to a tester while splitting particular cases to specialists.

## Saving a run as a template

If a run's set of cases is one you will want again — a smoke suite, a release regression set — use
**Save as Template** on the run. It saves the current case list as a reusable template that you
can pick when creating future runs. See [Run templates](../guides/run-templates).

## Runs and reports

Every closed run feeds the project's reports: pass rate and execution trends over time, and
flakiness detection. A run containing only `not_run` results contributes little, so closing runs
out with results recorded keeps reports meaningful.

To group several runs into one unit of work, use a [test plan](./test-plans).
