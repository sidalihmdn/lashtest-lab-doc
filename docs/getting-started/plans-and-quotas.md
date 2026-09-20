---
sidebar_position: 4
title: Plans and quotas
description: What each plan allows, how quotas are counted, and what happens when you reach a limit.
---

# Plans and quotas

Every organisation is on one of three plans. Your plan sets hard limits on members, projects,
and test cases, and decides which features are available.

## Plan comparison

| | Free | Pro | Enterprise |
| --- | --- | --- | --- |
| **Members** | 5 | 25 | Unlimited |
| **Projects** | 3 | 25 | Unlimited |
| **Test cases** | 500 | Unlimited | Unlimited |
| Webhooks | — | ✓ | ✓ |
| Test plans | — | ✓ | ✓ |
| API keys | — | ✓ | ✓ |
| Reports | — | ✓ | ✓ |
| Jira / Linear | — | ✓ | ✓ |
| CI integration | — | ✓ | ✓ |
| AI Intelligence | — | ✓ | ✓ |

"Unlimited" limits are stored internally as a sentinel value and shown as **∞** in the
interface.

:::note Free limits are enforced, not just displayed
Creating a 6th member, a 4th project, or a 501st test case on the Free plan is rejected with an
explicit error. Plan limits are checked whenever you create something, and during CSV import —
an import that would exceed the case limit stops at the limit and reports how many rows were
skipped.
:::

## How quotas are counted

| Quota | Counted as |
| --- | --- |
| Members | Active members **plus pending invitations**. An unaccepted invitation already occupies a seat |
| Projects | All projects in the organisation |
| Test cases | All test cases across all projects in the organisation |

Because pending invitations count toward the member limit, cancelling an invitation you no
longer need frees a seat immediately.

## Reading the quota bar

The billing page shows usage bars for each quota.

| Fill level | Meaning |
| --- | --- |
| Below 80% | Normal |
| **80% or more** | Warning — shown in amber |
| **100%** | At the limit — shown in red |

The bar caps at 100% width even if you are somehow over the limit.

## Reaching a limit

You will see one of these messages:

| Situation | Message |
| --- | --- |
| Member limit | *"Your plan allows up to `{n}` members. Upgrade to invite more."* |
| Project limit | *"Your plan allows a maximum of `{n}` project(s). Please upgrade your plan to create more projects."* |
| Test case limit | *"Your plan allows a maximum of `{n}` test case(s). Please upgrade your plan to create more test cases."* |
| Feature not in plan | *"The `{feature}` feature is not available on the `{plan}` plan. Upgrade to access it."* |
| AI on Free | *"AI Intelligence requires a Pro or Enterprise plan."* |

To get past a limit you can free capacity — delete unused projects or cases, cancel stale
invitations — or move to a higher plan.

## Changing plans

:::warning Plan changes are not self-service
There is no checkout or payment flow in the application. The Billing page is a read-only view of
your plan, usage, and available features. **Upgrade** opens an external pricing page.

The plan can only be changed by the **organisation owner**, and only through the API. If you
need a plan change, contact your account contact or support.
:::

If an organisation is on an unrecognised plan, it falls back to **Free** limits — a safe
default rather than accidental unlimited access.

## Moving to a lower plan

Limits are checked when you create something, not when the plan changes, so a downgrade does
not delete anything. Existing members, projects, and cases above the new limit stay in place
and remain readable — you simply cannot add more until you are back under the limit.

This matters most when moving onto Free: an organisation with 20 members keeps all 20, but
cannot invite anyone until it is down to 5.
