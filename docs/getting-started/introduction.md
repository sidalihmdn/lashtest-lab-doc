---
sidebar_position: 1
title: Introduction
description: What Lashtest Lab is, who it is for, and how this documentation is organised.
---

# Introduction

Lashtest Lab is a test management workspace. It gives QA and engineering teams one place to
write test cases, organise them into suites, run them against a release, and see whether
quality is improving or regressing.

It is built for teams who run a mix of manual and automated testing. Manual runs are
executed in a fast keyboard-driven view. Automated results arrive from your CI pipeline as
JUnit XML and are matched back to the same test cases, so both sources land in the same
reports.

## The problem it solves

Most teams lose quality information in three places:

- **Test cases live in spreadsheets** that drift from what is actually executed.
- **Manual results live in someone's notes**, so nobody can tell whether a release is safer
  than the last one.
- **Automated results live in CI logs** that expire, disconnected from the cases that
  describe the intent behind them.

Lashtest Lab keeps the case, the manual result, and the automated result in one record, then
reports on all three over time.

## What you can do

| Area | What it gives you |
| --- | --- |
| [Projects and suites](/concepts/projects-and-suites) | A hierarchy to organise work: an organisation contains projects, a project contains nested suites |
| [Test cases](/concepts/test-cases) | Steps or Gherkin, with priority, status, tags, and a change history |
| [Test runs](/concepts/test-runs) | A snapshot of selected cases executed together, with per-case results and notes |
| [Test plans](/concepts/test-plans) | A group of runs reported on as one unit of work |
| [Reports](/guides/reports-and-insights) | Pass-rate and execution trends across runs, plus flakiness detection |
| [AI Intelligence](/guides/ai-intelligence) | Analysis of a release's tickets to find coverage and propose missing cases |
| [CI integration](/integrations/ci-overview) | Automated results pushed in from GitHub, GitLab, Jenkins, or a custom endpoint |
| [Tickets](/integrations/ticket-integrations) | Jira and Linear links on cases, with status shown inline during execution |

## Who this documentation is for

These pages are written for **people using the application**: testers executing runs, QA leads
organising coverage, and administrators configuring integrations. Every page describes what is
in the interface today.

If you are looking for the HTTP API, see the [API reference](/reference/api).

## How this documentation is organised

- **Getting started** — create an account, understand the layout, learn what your plan allows.
- **Core concepts** — the vocabulary and data model. Read this before the guides if the terms
  are unfamiliar.
- **Guides** — task-focused walkthroughs, one per job to be done.
- **Integrations** — CI pipelines, API keys, webhooks, ticket trackers, and AI providers.
- **Reference** — permissions, status values, limits, and error codes, for looking things up.

:::info A note on product naming
The product is **Lashtest Lab**. Some internal identifiers you may encounter in configuration
still use the earlier name *TestBase* — for example the `testbase_id` property injected into
JUnit XML, and the storage bucket name. They refer to the same product.
:::
