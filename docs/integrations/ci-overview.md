---
sidebar_position: 1
title: CI integration overview
description: Connecting a CI provider and getting automated test results into a run.
---

# CI integration overview

CI integration brings automated test results into Lashtest Lab, attached to the same test cases
your manual runs use. That means one report covering both, and automation results that persist
beyond your CI logs' retention.

:::note Requires a paid plan
CI integration is not available on the Free plan. See
[Plans and quotas](../getting-started/plans-and-quotas).
:::

## How it works

```
   your CI pipeline                     Lashtest Lab
   ────────────────                     ─────────────
   run tests
        │
        ▼
   emit JUnit XML
   (each test carries
    its automation ID)
        │
        ▼
   POST to the results
   endpoint with an                     matches each test to a
   X-API-Key            ──────────────▶  test case by automation ID,
                                        records the result
```

Two halves, configured separately:

| Half | Where | Purpose |
| --- | --- | --- |
| **Connection** | Org settings → CI | Stores credentials so Lashtest Lab can identify your CI provider |
| **Results push** | Your pipeline | Sends JUnit XML to Lashtest Lab, authenticated by an API key |

The connection is org-wide; the results push is per project, because API keys are project-scoped.

## What is supported today

| Capability | Status |
| --- | --- |
| Connect GitHub, GitLab, Jenkins, or a custom endpoint | ✅ Available |
| Connection health checks, with an email alert on expiry | ✅ Available |
| Push automated results in from any CI provider | ✅ Available |
| View job status, cancel a running job | ✅ Available |
| Trigger a CI job *from* Lashtest Lab | ❌ Not yet available |

:::info Triggering CI from the app is not yet available
The connection and the **inbound** results flow are available: your pipeline pushes results to
Lashtest Lab.

Triggering a pipeline run *from* the interface — a button that dispatches a GitHub Actions
workflow or a Jenkins job — is not implemented. Start your pipelines from your existing CI
triggers (push, pull request, schedule), and let them push results back.
:::

## Connecting a provider

An admin or owner configures this once per organisation at **Settings → CI**.

| Provider | Required fields |
| --- | --- |
| **GitHub** | Personal access token (needs Actions read/write and Contents read) |
| **GitLab** | Optional base URL for self-hosted instances, plus an access token with `api` scope |
| **Jenkins** | Jenkins URL, username, and API token |
| **Custom** | Webhook URL, plus an optional bearer token |

### Connection status

| Status | Meaning |
| --- | --- |
| `active` | Working |
| `expired` | Credentials no longer valid |
| `error` | Something else went wrong |

Lashtest Lab checks connections on a schedule. If a connection moves from `active` to `expired`,
the **organisation owner** is emailed — so an expired token is caught before someone wonders why
results stopped arriving. You can also run a check manually.

Only one CI connection is allowed per organisation. Credentials are stored encrypted.

### The custom provider

For anything not covered by the named providers, choose **custom** and supply a webhook URL.
Lashtest Lab POSTs a payload like:

```json
{
  "run_id": "...",
  "test_ids": ["..."],
  "org_slug": "acme",
  "project_slug": "checkout"
}
```

When you set a bearer token, the request is signed so your endpoint can verify it came from
Lashtest Lab. Your endpoint should return a 2xx status.

:::warning Two different signature header names
The CI custom-provider documentation references `X-Lashtest-Signature`, while the outbound
**webhook** feature uses `X-TestBase-Signature-256` (the pre-rename product name). These are
different features with different headers — verify against a real request before integrating, and
do not assume one name applies to both.
:::

## Pushing results

Results are pushed to the project's CI results endpoint, authenticated with a **project API key**
in an `X-API-Key` header — not a session token, since CI has no browser session.

The request carries:

| Part | Notes |
| --- | --- |
| JUnit XML file | The test results |
| `run_id` | Which test run to attach the results to |

The response tells you what happened:

```json
{
  "matched": 42,
  "total": 45,
  "unmatched": ["..."],
  "job_id": "..."
}
```

**Always check `unmatched`.** Those are tests whose automation ID did not match any test case in the
project. They are silently dropped otherwise, which is how you end up believing you have coverage
you do not have.

The most common causes of unmatched tests:

- The test's `testbase_id` property does not match any case's automation ID.
- The case's automation ID was changed without updating the test.
- The API key belongs to a **different project** — keys are project-scoped, and a mismatch is
  rejected outright.

## Prerequisites

- An [API key](./api-keys) for the project. Keys require a paid plan.
- Each test case that automation should match must have an **automation ID**. See
  [Automated test IDs](./automated-test-ids).

## Job status

Each run shows its CI jobs with a status of `pending`, `running`, `completed`, or `failed`. While a
job is pending or running the interface refreshes automatically, so results appear as they arrive.

A pending or running job can be cancelled from the run view. Once it has completed it cannot be.
