---
sidebar_position: 3
title: API keys
description: Creating project-scoped keys for CI pipelines and automation.
---

# API keys

API keys let a program — a CI pipeline, a script — authenticate with Lashtest Lab without a browser
session. They are scoped to a **single project**.

:::note Requires a paid plan
API keys are not available on the Free plan. See
[Plans and quotas](../getting-started/plans-and-quotas).
:::

## Creating a key

An admin or owner creates keys at **Project settings → API Keys**.

1. Click to create a key and give it a **name** (up to 100 characters). Name it after what will use
   it — `GitHub Actions — main`, not `key 2`.
2. Copy the key immediately.

:::danger The key is shown only once
> *"This key will not be shown again. Copy it now."*

The key is stored as a SHA-256 hash, so it cannot be displayed again. If you lose it, revoke it and
create a new one. There is no recovery.
:::

Store the key as a secret in your CI system — a masked environment variable, or your platform's
secret store. Never commit it to a repository.

## Using a key

Send the key in an `X-API-Key` header:

```bash
curl -X POST \
  -H "X-API-Key: $LASHTEST_API_KEY" \
  -F "file=@results.xml" \
  -F "run_id=$RUN_ID" \
  https://your-instance/api/v1/orgs/acme/projects/checkout/ci/results
```

## Keys are project-scoped

A key created for one project cannot be used against another. A mismatched key is rejected with:

> *"This API key does not have access to the requested project."*

This is intentional — it limits the blast radius if a key leaks. A key taken from one project's CI
config cannot be used to write results into another project.

It also means a common error is using the right key with the wrong project's URL. If you get this
error, check the `orgs/{org}/projects/{project}` path in your request.

## What a key can do

| Capability | Notes |
| --- | --- |
| Push CI test results | The primary use — see [CI integration](./ci-overview) |
| Look up a case by automation ID | For scripts that need to resolve an ID to a case |

Keys authenticate *programmatic* access. They are not a substitute for a user session, and they do
not carry a person's permissions — treat them as belonging to the automation that holds them.

## Revoking a key

Revoking takes effect immediately. Any pipeline still using the key starts failing with:

> *"The API key is invalid or has been revoked."*

Before revoking, find out what uses the key — the name helps, which is why naming it after the
consumer matters.

Rotating a key (creating a new one and revoking the old) is the safe way to replace a compromised
key: add the new key to your CI secrets, confirm results are arriving, then revoke the old one.

## Naming rules

| Rule | Detail |
| --- | --- |
| Name length | Up to 100 characters |
| Name uniqueness | A duplicate name in the same project is rejected |
| Maximum keys | Bounded by your plan |

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| *"The API key is invalid or has been revoked."* | The key was revoked, or the header is missing or malformed |
| *"This API key does not have access to the requested project."* | The key belongs to a different project |
| *"You need admin or owner role to manage API keys."* | You are a tester or viewer — ask an admin |
