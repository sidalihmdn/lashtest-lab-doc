---
sidebar_position: 4
title: Run templates
description: Save a set of test cases and reuse it to start new runs quickly.
---

# Run templates

A **run template** is a saved set of test cases. It exists so you do not have to rebuild the same
case selection every time you test.

Use one for any recurring scope: a smoke suite, a release regression set, a weekly platform check.

:::note Requires a paid plan
Run templates are not available on the Free plan. See
[Plans and quotas](../getting-started/plans-and-quotas).
:::

## Creating a template

:::warning Templates are created from a run, not from scratch
There is no form for building a blank template. You save one **from an existing run**.

The template list says so directly: *"Templates save a set of test cases so you can quickly start
a new run from them. Save a template from an existing test run."*
:::

The workflow:

1. Open a run whose case selection you want to keep.
2. Use **Save as Template**.
3. Give it a name — the run's name is filled in by default, which is usually a good starting point.
4. Save.

The template stores the run's current list of cases.

This means the first time you want a reusable set, you build it as a run. If you have an existing
run that already has the right cases — a recent regression run, for instance — save that rather
than creating a new one.

## Starting a run from a template

When you create a run, choose a template under **From template**. The new run is preloaded with the
template's cases, and you can add or remove cases before or after starting it.

The template is a starting point, not a binding: editing the new run's cases does not affect the
template, and editing a template does not change runs already created from it.

## Updating a template

Templates hold a fixed case list. If your reusable set needs to change — say you add a suite to the
regression scope — create a new run with the cases you want, save that as a template, and delete the
old one.

Because templates are cheap to recreate, this is usually simpler than trying to maintain one in
place.

## Deleting a template

Delete from the run templates list in project settings, with an inline confirmation.

Deleting a template does **not** affect any run created from it, and does not delete any test cases.
A template only holds references to cases; the cases themselves live in your library.

## Where templates live

Run templates are per **project**. Two projects cannot share one, because cases are project-scoped.

Templates are managed under project settings → **Run Templates**, alongside the other project
configuration.
