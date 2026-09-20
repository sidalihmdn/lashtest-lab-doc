---
sidebar_position: 3
title: Account and sign-in
description: Creating an account, verifying your email, signing in, and recovering access.
---

# Account and sign-in

## Signing up

The sign-up form creates your **account and your organisation in one step**, and makes you the
owner of that organisation. There is no separate "create organisation" step at sign-up, though
you can create additional organisations later.

| Field | Rule |
| --- | --- |
| Full name | 1–255 characters |
| Organisation name | 1–255 characters |
| Email | Must be a valid address, at most 254 characters, and not already registered |
| Password | 8–128 characters, containing at least one uppercase letter, one lowercase letter, and one digit |

Email addresses are treated **case-insensitively** for uniqueness. `Alex@example.com` and
`alex@example.com` are the same account.

Sign-up attempts are limited to **5 per email address per hour**.

### Email verification

After signing up you must verify your email before you can sign in. Unverified sign-in attempts
are rejected.

- The verification link is sent immediately.
- **Resend** is available, but limited to 5 per hour, with a **1-hour cooldown** between sends.
- Verification links expire.

If a link stops working, request a new one rather than reusing the old email.

## Continue with Google

Both the login and sign-up pages offer **Continue with Google**.

- Signing up with Google **skips email verification**, because Google has already verified the
  address.
- If an account already exists for that Google identity, you are signed in.
- **Accounts are matched on the Google identity, never on the email address.** This is
  deliberate: it prevents someone from taking over an account by creating a Google account with
  the same address.
- If your Google email differs from an existing Lashtest Lab account's email, you get a new
  account rather than access to the old one. Link the identity from your profile instead.

Google sign-in is rate-limited to 20 attempts per minute.

:::note No token in URLs
The OAuth callback sets your session as an HttpOnly cookie and redirects with only a status
flag. No credential ever appears in the browser's address bar or history.
:::

## Signing in

Sign-in accepts an email and password, or Google.

- Sessions use HttpOnly cookies that page scripts cannot read, so an XSS flaw in the app cannot
  steal your session token.
- Login is limited to **10 attempts per minute** per IP address.
- Your session is refreshed automatically in the background. If refresh fails, you are returned
  to the login page.

### If your account is suspended

If an organisation administrator suspends your membership, sign-in is blocked with the message
*"Your account has been suspended. Please contact your administrator."* Contact an admin in your
organisation to restore access.

## Forgotten password

1. Choose **Forgot password?** on the login page.
2. Enter your email. The response is always the same neutral message, whether or not the address
   is registered — this prevents anyone from using the form to discover which addresses have
   accounts.
3. Open the reset email and set a new password. The new password must meet the same rule as
   sign-up: 8–128 characters with an uppercase letter, a lowercase letter, and a digit.

Reset links are **single-use**. Using one a second time fails; request a fresh link instead.
Requests are limited to 5 per 15 minutes per email address.

## Your profile

The profile page lets you change:

- **Avatar** — pick a preset or upload a photo. Uploads are limited to **5 MB**.
- **Full name**.
- **Password** — requires your current password.
- **Connected accounts** — link or unlink a GitHub identity to your account.

Your email address is displayed but cannot be changed from this page.

## Organisations

You can belong to more than one organisation. When you do, a switcher appears on the dashboard
to move between them.

Each organisation has its own members, projects, integrations, and plan. Your role is
**per organisation** — you might be an admin in one and a viewer in another.

For what each role can do, see [Permissions](../reference/permissions).
