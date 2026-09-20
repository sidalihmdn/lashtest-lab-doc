---
sidebar_position: 3
title: Projects and suites
description: How projects scope your work and how the suite tree organises test cases.
---

# Projects and suites

## Projects

A **project** is a container for one body of testing work — typically one product, service, or
team. Projects scope almost everything:

- Test cases and suites belong to a project.
- Test runs, test plans, and reports belong to a project.
- **API keys are project-scoped** — a key issued for one project is rejected on another.
- Webhooks fire per project.

This matters for CI: a key from the wrong project fails with *"This API key does not have access
to the requested project."*

Each project has a **name** (up to 255 characters) and a **slug** (up to 50 characters, unique
within the organisation). The slug appears in URLs.

### Project settings

Project configuration lives in its own section, reachable from the project:

| Page | What it configures |
| --- | --- |
| **Details** | Project name, description, and the webhook trigger key |
| **Defaults** | Default values applied to new test cases |
| **Tickets** | Which Jira project or Linear team this project maps to |
| **Run Templates** | Saved sets of cases for starting runs |
| **API Keys** | Keys for CI and automation |
| **Webhooks** | Outbound notifications for run and case events |
| **CI Integration** | Which CI provider this project reports automated results to |

### Project members

Beyond organisation roles, a project can have its own member list. Adding and removing project
members requires **admin** or **owner**.

## Suites

A **suite** is a folder for test cases. Suites are the primary way to keep a large case library
navigable.

### Nesting

Suites nest **without a depth limit**. A typical structure:

```
Authentication
├── Login
├── Password reset
└── Two-factor
Checkout
├── Cart
├── Payment
└── Confirmation
```

Use as much or as little structure as suits your library. Two levels is usually enough; deeply
nested trees get hard to navigate in the sidebar.

### Managing suites

Admins and owners can:

- **Create** a suite anywhere in the tree.
- **Rename** a suite. Its name can be up to 255 characters.
- **Delete** a suite.
- **Reorder** suites by dragging them.

:::warning Deleting a suite
Deleting a suite does not silently destroy your test cases. Decide where its cases should go
before you confirm — a suite is a folder, and the cases inside it are the valuable part.
:::

## The Unsorted inbox

A test case does **not** have to live in a suite. Cases with no suite appear in a special
**Unsorted** view.

This is useful when you are importing a batch of cases, or capturing cases quickly during
exploratory testing, and have not decided where they belong yet. You can filter to just the
unsorted cases to triage them into suites later.

The Unsorted inbox is a filter, not a real suite — there is no suite named "Unsorted" in your
tree.

## Why the tree matters

The suite structure is what makes reports readable. Case names are rarely unique enough on their
own, and reports and the case list both show the suite alongside the case title so you can tell
which part of the product a result refers to.

If you are starting from scratch, a good rule is to mirror how your team talks about the product.
If people say "checkout is broken", have a Checkout suite.
