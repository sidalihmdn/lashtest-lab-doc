---
sidebar_position: 3
title: Limits
description: Field lengths, upload caps, batch sizes, pagination defaults, and rate limits.
---

# Limits

A single page listing every limit the application enforces, for when you need to look one up.

## Field lengths

| Field | Limit |
| --- | --- |
| Full name | 1–255 characters |
| Organisation name | 1–255 characters |
| Organisation slug | 50 characters |
| Project name | 255 characters |
| Project slug | 50 characters, unique per organisation |
| Suite name | 255 characters |
| **Test case title** | **1–500 characters** |
| Test case tag | 50 characters each |
| Test case `automation_id` | 500 characters, **globally unique** |
| Test run name | 1–255 characters |
| Test plan name | 1–255 characters |
| Run template name | 255 characters |
| Attachment filename | 255 characters |
| Webhook URL | 2048 characters |
| Webhook secret | 8–256 characters |
| API key name | 100 characters |
| Email address | 254 characters |
| AI proposal title | 500 characters |
| AI rationale | 500 characters |

Comment bodies are unbounded — a comment is stored as free text with no length limit.

## Password rules

A password must be **8–128 characters** and contain at least:

- one lowercase letter
- one uppercase letter
- one digit

This applies to sign-up and to password reset.

## Upload limits

| Upload | Limit |
| --- | --- |
| **Test case attachment** | **20 MB per file**, **maximum 10 per case per run** |
| **Avatar image** | **5 MB** |

### Allowed attachment types

| Category | Types |
| --- | --- |
| Images | `image/png`, `image/jpeg`, `image/gif`, `image/webp` |
| Documents | `application/pdf`, `text/plain`, `text/csv` |
| Data | `application/json`, `application/zip` |
| Video | `video/mp4` |

Anything else is rejected with *"File type `{type}` is not allowed"*. Zip files are accepted, which
is the workaround for attaching an unsupported format.

## Batch limits

| Operation | Limit |
| --- | --- |
| Bulk test case operations | 500 cases |
| Bulk case reorder | 500 cases |
| Bulk run result updates | 500 cases |
| **Webhook endpoints per project** | **20** |

## Pagination defaults

| List | Range | Default |
| --- | --- | --- |
| Case history | up to 100 | 50 |
| Case execution history | 1–200 | 50 |
| Report trends | 5–100 runs | 20 |
| Report flakiness | 5–100 cases | 30 |
| AI analysis history | 1–100 | 10 |
| AI proposed cases | 1–100 | 20 |

## AI-specific limits

| Limit | Value |
| --- | --- |
| Concurrent analyses per project | 1 |
| Tickets fetched per release | 200 |
| Ticket batch size | 50 |
| Proposal expiry | 30 days |
| Analysis timeout | 300s soft / 360s hard |
| Provider request timeout | 30s (120s for custom and Hugging Face) |

## Time-based limits

| Item | Duration |
| --- | --- |
| **Invitation validity** | **7 days** |
| Organisation deletion grace period | 30 days |
| Email verification resend cooldown | 1 hour |
| Password reset resend cooldown | 1 hour |

## Rate limits

| Action | Limit |
| --- | --- |
| Login | 10 per minute per IP |
| Sign-up | 5 per email per hour |
| Resend verification email | 5 per email per hour |
| Forgot password | 5 per email per 15 minutes |
| Google OAuth start and callback | 20 per minute each |

Rate-limited requests return an error carrying `retry_after_seconds`, so a client knows how long to
wait.

## Plan-based limits

| | Free | Pro | Enterprise |
| --- | --- | --- | --- |
| Members | 5 | 25 | Unlimited |
| Projects | 3 | 25 | Unlimited |
| Test cases | 500 | Unlimited | Unlimited |

See [Plans and quotas](../getting-started/plans-and-quotas) for which features each plan includes.
