---
sidebar_position: 2
title: Quickstart
description: From sign-up to your first completed test run in about ten minutes.
---

# Quickstart

This walks you through the shortest path from a new account to a completed test run with a
result you can look at.

:::tip Before you start
You need an email address. If your organisation already uses Lashtest Lab, ask an admin for an
invitation instead of creating a new organisation — see
[Join an existing organisation](#join-an-existing-organisation).
:::

## 1. Create your account

Go to the sign-up page and fill in:

| Field | Notes |
| --- | --- |
| Full name | 1–255 characters |
| Organisation name | 1–255 characters. Your organisation is created at the same time, and you become its **owner** |
| Email | Must not already be registered |
| Password | 8–128 characters, with at least one uppercase letter, one lowercase letter, and one digit |

You will land on a **check your inbox** screen. Open the verification email and click the link
to activate the account. If it does not arrive, use **Try again** — resends are limited to one
per hour.

If you would rather not use a password, choose **Continue with Google** on the sign-up or login
page. Google accounts skip email verification, because Google has already verified the address.

## 2. Create a project

After verifying, you will be prompted to create your first project. A **project** is the
container for one body of testing work — one product, service, or team.

Give it a name and a slug. The slug appears in URLs and must be unique within your
organisation.

## 3. Add a test case

Open your project, then go to the **test explorer** and create a case. The only required field
is the **title**. For a first case, fill in:

- **Title** — what the test verifies, e.g. `User can reset a forgotten password`
- **Priority** — `low`, `medium`, `high`, or `critical`
- **Format** — `steps` for a numbered list, or `gherkin` for Given/When/Then
- **Steps** — one action per row
- **Expected result** — what should happen

New cases are created with status `draft`. That is fine for now — a case does not need to be
`active` to be added to a run.

## 4. Create a run and execute it

1. Go to **Runs** and create a run. Give it a name that identifies the scope, e.g.
   `Checkout smoke — 1 Oct`.
2. Add your test case using **Add Test Cases**.
3. Click **Start Run**. The status moves from `DRAFT` to `IN PROGRESS`, and closing it
   afterwards becomes possible.
4. In the execution view, set a result for each case. Use the keyboard: `p` for pass, `f` for
   fail, `b` for blocked, `s` for skipped, `i` for in progress, `o` for obsolete. Press `j`
   and `k` to move between cases.
5. When you are done, click **Close Run**. A closed run becomes read-only.

## 5. Look at the results

Open **Reports** and choose the **Trends** tab. With a single run the charts will not say much
yet — trends need several runs to be meaningful. The run detail page already shows the
pass/fail breakdown for the run you just closed.

## Join an existing organisation

If a colleague has invited you, the invitation email links to an accept page. It shows the
organisation, the role you are being given, and the expiry date before you commit.

- **You already have an account** — the invitation is accepted and you are added.
- **You do not** — the page asks for your full name and a password, creates the account, and
  marks your email as verified in the same step. No separate verification email is needed.

Invitations expire **7 days** after they are sent. If yours has expired, ask an admin to resend
it.

## Where to go next

- Read [Core concepts](/concepts/overview) to understand how projects, suites, cases, and runs
  fit together.
- Set up [CI integration](/integrations/ci-overview) if you have automated tests.
- Connect a [ticket tracker](/integrations/ticket-integrations) to see Jira or Linear status
  next to your cases.
