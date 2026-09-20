---
sidebar_position: 1
title: Managing test cases
description: Creating, organising, filtering, and bulk-editing your test case library.
---

# Managing test cases

## Creating a case

Open your project, then the test explorer, and create a case. Only the **title** is required — you
can capture a case quickly and fill in detail later. See [Test cases](../concepts/test-cases) for
what each field means.

A practical approach when starting out: write the case as you would say it out loud to a
colleague ("Password reset rejects an expired link"), then add the steps.

## Organising with suites

Cases live in a tree of [suites](../concepts/projects-and-suites). To move a case:

- **Drag and drop** it to reorder within a suite, or
- Select several and use the bulk **Move** operation to relocate them in one action.

Cases that belong nowhere yet sit in the **Unsorted** view until you triage them.

## Finding cases

The case list supports several filters, which combine:

| Filter | Behaviour |
| --- | --- |
| **Suite** | Cases in that suite |
| **Status** | `draft`, `active`, or `deprecated` |
| **Priority** | `low`, `medium`, `high`, or `critical` |
| **Tags** | Comma-separated; a case must have **all** the tags you enter |
| **Search** | Case-insensitive match anywhere in the title |
| **Unsorted** | Only cases with no suite |

Because the tag filter requires *all* tags to match, adding more tags narrows the results. That
makes `smoke, checkout` a precise way to find the subset you want to run.

## Editing cases

Open a case to edit its title, steps, expected result, preconditions, description, priority,
status, tags, and automation settings.

Every change is recorded. The case's **history** tab shows which field changed, from what, to
what, and who changed it.

## Cloning a case

Cloning creates a copy within the same project. Use it when a new case is a variation of an
existing one — the same flow on a different browser, or the same check with a different input.
Clone, then change only what differs.

## Bulk editing

Select multiple cases to apply an operation to all of them. Available operations:

| Operation | Effect on tags |
| --- | --- |
| **Set tags** | **Replaces** the entire tag list |
| **Add tags** | Adds, keeping existing tags |
| **Remove tags** | Removes the named tags, keeping the rest |
| **Set status** | Sets `draft` or `active` only |
| **Set priority** | One priority for the whole selection |
| **Move** | Relocates to a chosen suite |
| **Delete** | Deletes the cases |

:::warning Set tags overwrites
**Set tags** replaces every tag on the selected cases. If you are adding a tag to cases that
already have their own tags, use **Add tags** instead — otherwise you will silently strip tags you
meant to keep.
:::

Bulk operations accept up to **500 cases** per action.

## The Unsorted inbox

Cases without a suite collect in **Unsorted**. This is where imported cases land unless you
specified a suite during import.

Triage them by filtering to Unsorted and using bulk **Move** to place groups into the right
suites. Keeping this view near empty makes the tree trustworthy — if it is empty, every case is
filed somewhere.

## Viewing a case's execution history

The **execution history** tab lists every result the case has recorded across all runs, in order.

Use it to answer:

- *Has this test ever passed?*
- *When did it start failing?*
- *Is it intermittent?*

Intermittent oscillation between pass and fail is what surfaces the case in the
[flakiness report](./reports-and-insights) as well.

## Linking a case to a ticket

A case can carry a link to a Jira or Linear issue. Once linked, the ticket's status appears next
to the case in the run view, so a tester can see whether the underlying issue is still open without
switching tools.

See [Tickets and linked issues](./tickets-and-linked-issues).

## Deleting cases

Deleting requires an admin or owner role. When you delete a suite, decide where its cases should
go — check the confirmation carefully, because deleting a suite with cases in it is the easiest
way to lose coverage unintentionally.
