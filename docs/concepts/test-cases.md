---
sidebar_position: 4
title: Test cases
description: Fields, formats, priorities, statuses, and tags on a test case.
---

# Test cases

A **test case** describes a single thing to verify. It is the unit you write once and execute
many times across runs.

## Fields

| Field | Required | Notes |
| --- | --- | --- |
| **Title** | ✓ | 1–500 characters |
| **Format** | ✓ | `steps` or `gherkin` |
| **Suite** | — | Optional; cases without a suite appear in the Unsorted view |
| **Steps** | — | A list of actions, or a Gherkin scenario |
| **Expected result** | — | What should happen |
| **Preconditions** | — | What must be true before the test starts |
| **Description** | — | Extra context |
| **Priority** | — | Defaults to `medium` |
| **Status** | — | Defaults to `draft` |
| **Tags** | — | Free-form labels, up to 50 characters each |
| **Automated** | — | Marks the case as covered by an automated test |
| **Automation ID** | — | Links the case to an automated test's identifier |

## Formats

### Steps

The familiar numbered list: an action, and what you expect to happen.

Use steps when the test is procedural and read by a human executing it manually.

### Gherkin

Given / When / Then. Use Gherkin when you want behaviour described in a business-readable form,
or when the case is shared with people outside the QA team.

You choose the format per case; a project can mix both freely.

## Priority

| Value | Use for |
| --- | --- |
| `low` | Edge cases and cosmetic checks |
| `medium` | The default for ordinary coverage |
| `high` | Important flows that should be verified regularly |
| `critical` | Core flows where a failure blocks release |

Priority drives filtering, so it is worth keeping honest. If everything is `critical`, the field
stops being useful for triage.

## Status

| Value | Meaning |
| --- | --- |
| `draft` | Being written, or not yet trusted |
| `active` | Current and expected to pass |
| `deprecated` | Kept for history, no longer executed |

New cases start as `draft`.

:::note Status does not gate execution
A `draft` case can still be added to a run and executed. Status records your intent about the
case's maturity; it does not block anything. `deprecated` likewise does not prevent execution —
it marks a case as one you have stopped maintaining.
:::

There is one exception: the **bulk** status change only offers `draft` and `active`. To set many
cases to `deprecated` at once, edit them individually.

## Tags

Tags are free-form labels you invent. They cut across the suite tree, which makes them the right
tool for a dimension your folders do not capture:

- `smoke` — the subset you run before every release
- `regression`
- `mobile`
- `payments`
- `flaky`

Each tag is at most 50 characters, and duplicates are removed. **Filtering by several tags
requires a case to match all of them**, not any of them — so `smoke` combined with `mobile`
narrows to mobile smoke tests.

Tags are the fastest way to build a run from an existing library: filter to `smoke`, select all,
add to a run.

## Automated cases

Marking a case **automated** and giving it an **automation ID** connects it to your test suite's
code.

The **automation ID is globally unique** — it identifies one case across the whole product, not
just within its project. This is what allows results pushed from CI to be matched back to the
right case.

The recommended convention is to prefix with the case's identifier:

```
tc-4f8a1b2c
```

When your CI job reports results, each test carries its automation ID in a `testbase_id` property
in the JUnit XML. Lashtest Lab matches on that value and records the result against the case. See
[Automated test IDs](../integrations/automated-test-ids).

:::warning Changing an automation ID breaks the link
If you change a case's automation ID, results from older CI runs will no longer match it. Update
the test code in the same change.
:::

## Editing and history

Every edit is recorded. Each case has a **history** tab showing field-level changes: which field
changed, from what, to what, who made the change, and when.

Cases also have an **execution history** — every result the case has received across all runs.
This is the fastest way to answer "has this ever passed?" or "when did it start failing?" without
opening run after run.

## Cloning

Cloning duplicates a case within its project. Use it to build variants of an existing test rather
than retyping steps — for example, testing the same flow on a second browser.

## Bulk operations

You can act on many cases at once. Select cases in the list, then choose an operation:

| Operation | Effect |
| --- | --- |
| **Delete** | Removes the selected cases |
| **Move** | Moves them to a different suite |
| **Set status** | Sets `draft` or `active` |
| **Set priority** | Sets one priority for all selected |
| **Set tags** | Replaces their tags entirely |
| **Add tags** | Adds tags, keeping existing ones |
| **Remove tags** | Removes specific tags, keeping the rest |

Bulk operations accept up to **500 cases** at a time.

The distinction between **Set tags** and **Add tags** is worth noting: Set replaces the whole tag
list, so it can silently strip tags you meant to keep. Use Add to tag a selection without losing
what is there.
