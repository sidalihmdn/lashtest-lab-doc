---
sidebar_position: 1
title: Overview
description: How organisations, projects, suites, cases, runs, and plans fit together.
---

# Core concepts

Lashtest Lab has a small number of concepts that fit together in a fixed hierarchy. Understanding
this shape makes everything else in the product predictable.

## The hierarchy

```
Organisation                    ← your company or team; owns the plan and billing
└── Project                     ← one body of testing work
    ├── Suites (nested)         ← folders for organising cases
    │   └── Test cases
    ├── Test runs               ← cases executed together, with results
    ├── Test plans              ← groups of runs reported on together
    ├── Run templates           ← saved sets of cases for starting runs quickly
    ├── API keys                ← for CI and automation
    └── Webhooks                ← outbound notifications
```

## In one paragraph

An **organisation** holds everything and owns the plan. Inside it, a **project** is one body of
testing work — one product or service. Within a project you write **test cases** and organise
them into a tree of **suites**. To execute testing you create a **test run**, which is a snapshot
of selected cases that you work through and mark with results. If you want to report on several
runs as one unit of work, you group them into a **test plan**.

## Concepts at a glance

| Concept | What it is | Notes |
| --- | --- | --- |
| [Organisation](./organisations-and-roles) | The top-level tenant | Owns members, roles, plan, and integrations |
| [Project](./projects-and-suites) | A container for one body of testing | Has a unique slug; scopes runs, plans, and API keys |
| [Suite](./projects-and-suites) | A folder for test cases | Nests without limit; cases can also sit outside any suite |
| [Test case](./test-cases) | A single test to perform | Steps or Gherkin, with priority, status, and tags |
| [Test run](./test-runs) | A set of cases executed together | The unit you mark pass/fail |
| [Test plan](./test-plans) | A group of runs | For reporting across several runs |
| [Reports](./pass-rate) | Trends and flakiness | Computed across runs |

## Two things that surprise people

**A test case is not a copy inside a run.** When you add a case to a run, the run references the
case and holds *your result* for it. Editing the case later changes the case — the result you
recorded stays attached to the run. This is what lets flakiness and trends be computed: the same
case, measured across many runs.

**A completed run is immutable.** Once you close a run, its results are frozen. That is what makes
it a trustworthy record of what happened. If you need to test again, create a new run — and if you
want it to contain the same cases, use a [run template](../guides/run-templates).

## Where to go next

- [Organisations and roles](./organisations-and-roles) — who can do what.
- [Projects and suites](./projects-and-suites) — organising your work.
- [Test cases](./test-cases) — writing them.
- [Test runs](./test-runs) — executing them.
- [Pass rate](./pass-rate) — how the numbers are calculated.
