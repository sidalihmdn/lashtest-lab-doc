---
sidebar_position: 4
title: Error codes
description: Machine-readable error codes returned by the API, grouped by area.
---

# Error codes

Errors carry a machine-readable `code` alongside a human-readable message. Use the code for logic
— it is stable — and the message for display. The message text is written for end users and may
change.

## Authentication

| Code | Meaning |
| --- | --- |
| `INVALID_CREDENTIALS` | Wrong email or password |
| `EMAIL_NOT_VERIFIED` | The account has not verified its email |
| `MISSING_TOKEN` | No session token was supplied |
| `INVALID_TOKEN` | The token is malformed |
| `ACCOUNT_INACTIVE` | The account is suspended |

## Session refresh

| Code | Meaning |
| --- | --- |
| `REFRESH_TOKEN_INVALID` | The refresh token is not recognised |
| `REFRESH_TOKEN_EXPIRED` | Past its lifetime |
| `REFRESH_TOKEN_REUSED` | An already-used token was presented — treated as a theft signal |

## Email verification and password reset

| Code | Meaning |
| --- | --- |
| `VERIFICATION_TOKEN_EXPIRED` | The verification link has expired |
| `RESET_TOKEN_EXPIRED` | The reset link has expired |
| `RESET_TOKEN_ALREADY_USED` | Reset links are single-use |

## Identity

| Code | Meaning |
| --- | --- |
| `EMAIL_ALREADY_EXISTS` | That email is already registered |
| `EMAIL_TAKEN` | Email conflict on update |

## Organisation and members

| Code | Meaning |
| --- | --- |
| `ORG_FORBIDDEN` | Your role does not permit this |
| `SLUG_EXHAUSTED` | No unique slug could be generated from the name |
| `PLAN_FORBIDDEN` | Only the owner can change the plan |
| `MEMBER_FORBIDDEN` | You cannot modify this membership |
| `INVITE_FORBIDDEN` | You cannot manage invitations |
| `ALREADY_MEMBER` | Already a member of this organisation |
| `INVITATION_NOT_PENDING` | Already accepted or cancelled |
| `INVITATION_EXPIRED` | Past the 7-day window |
| `INVITATION_ORG_LIMIT` | You belong to too many organisations |

## Projects

| Code | Meaning |
| --- | --- |
| `PROJECT_FORBIDDEN` | Your role does not permit this |
| `PROJECT_SLUG_TAKEN` | That slug is used in this organisation |
| `PROJECT_ALREADY_MEMBER` | Already a project member |

## API keys

| Code | Meaning |
| --- | --- |
| `INVALID_API_KEY` | The key is invalid or revoked |
| `MISSING_API_KEY` | No `X-API-Key` header was sent |
| `API_KEY_PROJECT_MISMATCH` | The key belongs to a different project |
| `API_KEY_NAME_TAKEN` | A key with that name exists in the project |
| `API_KEY_FORBIDDEN` | Your role does not permit managing keys |
| `API_KEY_LIMIT` | Key limit reached |

## Test runs

| Code | Meaning |
| --- | --- |
| `RUN_FORBIDDEN` | Your role does not permit this |
| `CASE_ALREADY_IN_RUN` | That case is already in this run |
| `RUN_ALREADY_CLOSED` | The run is closed and cannot be modified |
| `RUN_NOT_ACTIVE` | The operation requires an active run |
| `ASSIGNEE_INELIGIBLE` | Assignee must be an active owner, admin, or tester |

## Comments and attachments

| Code | Meaning |
| --- | --- |
| `COMMENT_FORBIDDEN` | You can only delete your own comment |
| `ATTACHMENT_FORBIDDEN` | You can only delete your own attachment |

## CI

| Code | Meaning |
| --- | --- |
| `CI_FORBIDDEN` | Your role does not permit this |
| `CI_JOB_NOT_CANCELLABLE` | The job already finished |

## Plans and quotas

| Code | Meaning |
| --- | --- |
| `PLAN_LIMIT_MEMBERS` | Member limit reached |
| `PLAN_LIMIT_PROJECTS` | Project limit reached |
| `PLAN_LIMIT_TEST_CASES` | Test case limit reached |
| `PLAN_FEATURE_UNAVAILABLE` | That feature is not in your plan |

## AI

| Code | Meaning |
| --- | --- |
| `AI_FEATURE_GATED` | AI requires Pro or Enterprise |
| `AI_PROVIDER_FORBIDDEN` | Your role does not permit configuring the provider |
| `AI_KEY_VALIDATION_FAILED` | The provider rejected the key |

## Webhooks

| Code | Meaning |
| --- | --- |
| `WEBHOOK_LIMIT_REACHED` | Maximum 20 endpoints per project |

## Generic

| Code | Meaning |
| --- | --- |
| `NOT_FOUND` | The resource does not exist, or you cannot see it |
| `RATE_LIMITED` | Too many requests; honour `retry_after_seconds` |

## Handling errors in a client

1. **Branch on `code`, not on the message.** Messages are user-facing and may be reworded.
2. **Handle `RATE_LIMITED`** by waiting `retry_after_seconds` before retrying.
3. **Treat `NOT_FOUND` carefully.** A resource you lack permission to see may also return
   `NOT_FOUND`, deliberately, so that the API does not reveal what exists.
4. **Re-authenticate on the refresh codes.** `REFRESH_TOKEN_REUSED` in particular means the session
   should be considered compromised — clear it and prompt for login rather than retrying.
