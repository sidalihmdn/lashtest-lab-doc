---
sidebar_position: 5
title: API reference
description: The HTTP API surface, authentication methods, and endpoint groups.
---

# API reference

Lashtest Lab exposes a REST API under `/api/v1`. The application itself uses it, so anything the
interface does is available programmatically.

## Authentication

Three methods are accepted:

| Method | Use |
| --- | --- |
| **HttpOnly cookie** | What the web application uses. Set automatically at login — you do not manage it by hand |
| **`Authorization: Bearer <token>`** | For API clients that hold an access token |
| **`X-API-Key: <key>`** | For automation. Project-scoped, requires a paid plan |

For CI and scripts, use an [API key](../integrations/api-keys). Keys are scoped to one project, so a
key issued for project A is rejected on project B.

## Conventions

- All paths are prefixed with `/api/v1`.
- Organisation-scoped paths are `/orgs/{slug}/…`; project-scoped paths add
  `/projects/{project_slug}/…`.
- Errors return a `code` (stable, machine-readable) and a `detail` message (human-readable). See
  [Error codes](./error-codes).
- Timestamps are ISO 8601 with timezone.
- Rate-limited responses carry `retry_after_seconds`.

## Endpoint groups

### Auth

| Method | Path |
| --- | --- |
| `POST` | `/auth/signup` |
| `POST` | `/auth/verify-email` |
| `POST` | `/auth/resend-verification` |
| `POST` | `/auth/login` |
| `POST` | `/auth/refresh` |
| `POST` | `/auth/logout` |
| `POST` | `/auth/forgot-password` |
| `POST` | `/auth/reset-password` |
| `GET` | `/auth/google` |
| `GET` | `/auth/google/callback` |

### Profile

| Method | Path |
| --- | --- |
| `GET` | `/me` |
| `PATCH` | `/me` |
| `POST` | `/me/avatar` |
| `DELETE` | `/me/avatar` |
| `POST` | `/me/change-password` |

### Organisations

| Method | Path |
| --- | --- |
| `POST` | `/orgs` |
| `GET` | `/orgs` |
| `GET` `PATCH` `DELETE` | `/orgs/{slug}` |
| `GET` | `/orgs/{slug}/members` |
| `PATCH` | `/orgs/{slug}/members/{membership_id}` |
| `GET` | `/orgs/{slug}/active-runs` |
| `GET` | `/orgs/{slug}/dashboard` |
| `GET` | `/orgs/{slug}/billing` |
| `PATCH` | `/orgs/{slug}/plan` |

### Invitations

| Method | Path |
| --- | --- |
| `GET` `POST` | `/orgs/{slug}/invitations` |
| `DELETE` | `/orgs/{slug}/invitations/{id}` |
| `POST` | `/orgs/{slug}/invitations/{id}/resend` |
| `GET` | `/invitations/preview` |
| `POST` | `/invitations/accept` |

### Projects

| Method | Path |
| --- | --- |
| `GET` `POST` | `/orgs/{slug}/projects` |
| `GET` `PATCH` `DELETE` | `/orgs/{slug}/projects/{project_slug}` |
| `GET` `POST` | `/orgs/{slug}/projects/{project_slug}/members` |
| `DELETE` | `/orgs/{slug}/projects/{project_slug}/members/{user_id}` |
| `POST` | `/orgs/{slug}/projects/{project_slug}/regenerate-webhook-key` |

### Test suites

| Method | Path |
| --- | --- |
| `GET` `POST` | `/…/suites` |
| `GET` | `/…/suites/tree` |
| `POST` | `/…/suites/reorder` |
| `GET` `PATCH` `DELETE` | `/…/suites/{suite_id}` |

### Test cases

| Method | Path |
| --- | --- |
| `GET` `POST` | `/…/cases` |
| `POST` | `/…/cases/bulk` |
| `POST` | `/…/cases/reorder` |
| `POST` | `/…/cases/import` |
| `GET` | `/…/cases/export` |
| `GET` | `/…/cases/export-all` |
| `GET` `PATCH` `DELETE` | `/…/cases/{case_id}` |
| `POST` | `/…/cases/{case_id}/clone` |
| `GET` | `/…/cases/{case_id}/history` |
| `GET` | `/…/cases/{case_id}/execution-history` |
| `PATCH` | `/…/cases/{case_id}/linked-ticket` |

### Test runs

| Method | Path |
| --- | --- |
| `GET` `POST` | `/…/runs` |
| `GET` `PATCH` `DELETE` | `/…/runs/{run_id}` |
| `GET` `POST` | `/…/runs/{run_id}/cases` |
| `POST` | `/…/runs/{run_id}/cases/bulk` |
| `GET` | `/…/runs/{run_id}/cases/by-automation-id/{automation_id}` |
| `PATCH` `DELETE` | `/…/runs/{run_id}/cases/{trc_id}` |
| `GET` | `/…/runs/{run_id}/ci-job` |
| `POST` | `/…/runs/{run_id}/ci-job/cancel` |
| `GET` | `/…/runs/{run_id}/ci-job/history` |
| `GET` | `/…/runs/{run_id}/plans` |

### Comments and attachments

| Method | Path |
| --- | --- |
| `GET` `POST` | `/…/runs/{run_id}/cases/{trc_id}/comments` |
| `DELETE` | `/…/runs/{run_id}/cases/{trc_id}/comments/{comment_id}` |
| `GET` `POST` | `/…/runs/{run_id}/cases/{trc_id}/attachments` |
| `GET` | `/…/runs/{run_id}/cases/{trc_id}/attachments/{id}/download` |
| `DELETE` | `/…/runs/{run_id}/cases/{trc_id}/attachments/{id}` |

### Run templates

| Method | Path |
| --- | --- |
| `GET` `POST` | `/…/run-templates` |
| `DELETE` | `/…/run-templates/{template_id}` |

### Test plans

| Method | Path |
| --- | --- |
| `GET` `POST` | `/…/plans` |
| `GET` `PATCH` `DELETE` | `/…/plans/{plan_id}` |
| `POST` | `/…/plans/{plan_id}/runs` |
| `GET` | `/…/plans/{plan_id}/runs` |
| `DELETE` | `/…/plans/{plan_id}/runs/{run_id}` |
| `GET` | `/…/plans/{plan_id}/summary` |

### Reports

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/…/reports/trends` | `limit` 5–100, default 20 |
| `GET` | `/…/reports/flakiness` | `limit` 5–100, default 30 |
| `GET` | `/…/reports/trends/export/pdf` | |
| `GET` | `/…/reports/flakiness/export/pdf` | |
| `GET` | `/…/runs/{run_id}/export/pdf` | |

### API keys

| Method | Path |
| --- | --- |
| `GET` `POST` | `/…/api-keys` |
| `DELETE` | `/…/api-keys/{key_id}` |

### Webhooks

| Method | Path |
| --- | --- |
| `GET` `POST` | `/…/webhooks` |
| `GET` `PATCH` `DELETE` | `/…/webhooks/{id}` |
| `POST` | `/…/webhooks/{id}/test` |

### CI

| Method | Path | Notes |
| --- | --- | --- |
| `GET` `POST` | `/orgs/{slug}/ci-connection` | |
| `DELETE` | `/orgs/{slug}/ci-connection` | |
| `POST` | `/orgs/{slug}/ci-connection/check` | Manual health check |
| `POST` | `/…/projects/{project_slug}/ci/results` | **API key auth only** — JUnit XML upload |

### Ticket integrations

| Method | Path |
| --- | --- |
| `GET` `PATCH` | `/orgs/{slug}/integrations/tickets` |
| `DELETE` | `/orgs/{slug}/integrations/tickets/{provider}` |
| `GET` | `/orgs/{slug}/integrations/list-projects` |
| `POST` | `/orgs/{slug}/integrations/ticket-proxy` |
| `POST` | `/orgs/{slug}/integrations/create-ticket` |

### AI

| Method | Path | Notes |
| --- | --- | --- |
| `GET` `POST` `DELETE` | `/orgs/{slug}/ai-provider` | Provider configuration |
| `GET` | `/…/ai/releases` | Releases from the ticket provider |
| `GET` | `/…/ai/releases/{release_ref}/tickets` | **URL-encode the ref**; capped at 200 |
| `POST` | `/…/ai/analyses` | Start an analysis |
| `GET` | `/…/ai/analyses` | History |
| `GET` | `/…/ai/analyses/{analysis_id}` | |
| `POST` | `/…/ai/analyses/{id}/discard` | |
| `POST` | `/…/ai/analyses/{id}/confirm-to-plan` | |
| `GET` | `/…/ai/proposed-cases` | `status` filter, `page_size` 1–100 |
| `PATCH` | `/…/ai/proposed-cases/{id}` | Accept or reject |

:::warning URL-encode release references
A release reference contains colons, for example `jira:fixVersion:10020`. When it appears in a
path it must be percent-encoded:

```
/api/v1/orgs/acme/projects/checkout/ai/releases/jira%3AfixVersion%3A10020/tickets
```

Sending it unencoded produces a 404 that looks like the release does not exist.
:::

## Pushing CI results

The most common programmatic integration. Authenticated by API key:

```bash
curl -X POST \
  -H "X-API-Key: $LASHTEST_API_KEY" \
  -F "file=@results.xml" \
  -F "run_id=$RUN_ID" \
  https://your-instance/api/v1/orgs/acme/projects/checkout/ci/results
```

The response:

```json
{
  "matched": 42,
  "total": 45,
  "unmatched": ["..."],
  "job_id": "..."
}
```

Check `unmatched` on every push — those tests were not attributed to any case. See
[Automated test IDs](../integrations/automated-test-ids).
