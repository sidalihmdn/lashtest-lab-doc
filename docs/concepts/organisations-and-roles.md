---
sidebar_position: 2
title: Organisations and roles
description: The four organisation roles, what each can do, and how members and invitations work.
---

# Organisations and roles

An **organisation** is the top-level tenant. It owns the members, the projects, the plan, and all
integrations (CI, tickets, AI providers).

You can belong to more than one organisation with a different role in each. When you do, a
switcher appears on the dashboard.

## Roles

There are four roles.

| Role | Read | Write / execute | Admin | Manage organisation |
| --- | --- | --- | --- | --- |
| **viewer** | ✓ | — | — | — |
| **tester** | ✓ | ✓ | — | — |
| **admin** | ✓ | ✓ | ✓ | — |
| **owner** | ✓ | ✓ | ✓ | ✓ |

The three capability groups mean:

- **Write / execute** — create and edit test cases, set run results, comment, upload attachments.
- **Admin** — create and rename suites, delete cases in bulk, create and delete run templates,
  delete comments, and manage most configuration.
- **Manage organisation** — rename the organisation, change its plan, and delete it.

See the full [Permissions reference](../reference/permissions) for the capability-by-capability
breakdown, including which operations each role can perform on runs and plans.

## What each role is for

**Viewer** — for stakeholders who need to see progress without changing anything. A viewer
cannot be assigned a test run.

**Tester** — the everyday role. Testers execute runs, write cases, and comment.

**Admin** — for team leads. Admins configure the project: suites, run templates, API keys,
webhooks, CI, ticket integrations, and AI providers.

**Owner** — the account holder. There is exactly one owner per organisation, and only the owner
can change the plan or delete the organisation.

## Member management rules

Three restrictions apply to changing memberships:

- **You cannot change your own membership.** An admin cannot promote themselves to owner.
- **The owner cannot be modified.** The owner's role is not editable by anyone.
- **An admin cannot modify another admin.** Only the owner can change an admin's role.

These prevent privilege escalation through the member list.

## Invitations

Admins and owners invite people by email.

| Aspect | Behaviour |
| --- | --- |
| Roles you can invite as | `admin`, `tester`, or `viewer`. **Never `owner`** — the owner is fixed at organisation creation |
| Default role in the form | `tester` |
| Expiry | **7 days** from sending |
| Resending | Issues a fresh token and restarts the 7-day window |
| Seat usage | A pending invitation **counts against your member limit** |

The invitation email links to an accept page that shows the organisation, the role being offered,
and the expiry date before the recipient commits.

### Accepting an invitation

There are two paths:

- **Existing user** — the invitation is accepted and they are added to the organisation.
- **New user** — the page asks for a full name and password, creates the account, and **marks the
  email as verified** in the same step, so no verification email is needed.

### Failure cases

| Message | Cause |
| --- | --- |
| *"This invitation may have expired, been cancelled, or already been used."* | The token is no longer valid |
| *"Invalid invitation link. No token found."* | The link was truncated or altered |
| *"This person is already a member of this organisation."* | They are already in |
| *"Your plan allows up to `{n}` members. Upgrade to invite more."* | Member limit reached, counting pending invitations |

## Suspending a member

An admin can suspend a membership. Suspension is organisation-wide and blocks sign-in entirely:

> *"Your account has been suspended. Please contact your administrator."*

Unlike a deleted membership, a suspension does not remove the person's data.

## Creating another organisation

You can create additional organisations from the dashboard. The slug — the URL-friendly name — is
generated from the organisation name: accents are stripped, case is lowered, and non-alphanumeric
characters become hyphens. It is truncated to 50 characters.

If the slug is taken, a numeric suffix is added (`my-team-2`, `my-team-3`, and so on). If all
variants are exhausted, you are asked to choose a different name.

## Deleting an organisation

Only the **owner** can delete an organisation. You must type the organisation's exact name to
confirm.

Deletion is **soft**: the organisation moves to a `deleting` state and is purged after a
**30-day grace period**. During that window it is recoverable — contact support if you deleted one
by mistake. After it is purged, it is gone.
