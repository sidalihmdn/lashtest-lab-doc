---
sidebar_position: 4
title: Webhooks
description: Sending run and case events out to Slack, Teams, Discord, or your own endpoint.
---

# Webhooks

Webhooks notify an external service when something happens in a project — a run is created, a run
changes status, a case result is recorded.

Use them to keep a chat channel informed, or to trigger your own automation.

:::note Requires a paid plan
Webhooks are not available on the Free plan. See
[Plans and quotas](../getting-started/plans-and-quotas).
:::

## Events

| Event | Fires when |
| --- | --- |
| `run.created` | A test run is created |
| `run.status_changed` | A run moves between `draft`, `active`, and `closed` |
| `run.assigned` | A run is assigned to someone, or reassigned |
| `case.result_changed` | A case's result is set within a run |
| `case.comment_added` | A comment is posted on a case result |

Subscribe to just the events you need. `case.result_changed` is the noisiest — it fires once per
case, so a 200-case run generates 200 deliveries. On a Slack channel that is unusable; prefer
`run.status_changed` for channel notifications.

## Providers

Webhooks are configured per project at **Project settings → Webhooks**.

| Provider | Use |
| --- | --- |
| **Slack** | Post to a Slack channel |
| **Discord** | Post to a Discord channel |
| **Teams** | Post to a Microsoft Teams channel |
| **Custom** | POST to any HTTPS endpoint you control |

For Slack, Discord, and Teams you paste the incoming-webhook URL those services generate.

## Configuration

| Field | Rule |
| --- | --- |
| **URL** | Must start with **`https://`**. Plain HTTP is rejected |
| **Events** | At least one must be selected |
| **Secret** | 8–256 characters. **Required for `custom`**, ignored for Slack, Discord, and Teams |

### Why the secret is only for custom

Slack, Discord, and Teams verify the request through their own webhook URL — the URL itself is the
credential. A `custom` endpoint has no such mechanism, so a shared secret is required to let you
verify that a request genuinely came from Lashtest Lab.

## Verifying a custom webhook

Custom deliveries are signed so your endpoint can confirm authenticity. The signature is sent in a
header:

```
X-TestBase-Signature-256: sha256=<hex digest>
```

:::warning Header name uses the legacy product name
The header is `X-TestBase-Signature-256`, from before the product was renamed. It has been kept
stable as an integration identifier.

Some in-app help text refers to `X-Lashtest-Signature`, and the webhook panel shows a variant
containing a space — which is not a valid HTTP header name. These are documentation
inconsistencies, not additional headers.

**Verify against a real delivery from your own endpoint** rather than trusting the help text.
:::

Compute the HMAC of the request body using your secret and compare it to the header value. Reject
requests that do not match.

## The limits

| Limit | Value |
| --- | --- |
| Endpoints per project | **20** |
| URL scheme | HTTPS only |
| Secret length | 8–256 characters |

Exceeding the endpoint limit gives *"A project may have at most 20 webhook endpoints"*.

## Testing a webhook

Each endpoint has a **Test** button. It sends a test delivery and reports the result:

| Result | Meaning |
| --- | --- |
| **Delivered** | The endpoint accepted it |
| **Failed** | With the HTTP status and reason |

Always test after configuring. It catches a truncated Slack URL or an endpoint that rejects the
payload — problems that are otherwise invisible until an event fires.

## Delivery status

The endpoint list shows the last delivery outcome:

| Indicator | Meaning |
| --- | --- |
| Green | Last delivery succeeded |
| Red | Last delivery failed |
| Grey | Never delivered |

:::info There is no delivery history or retry
Only the **most recent** delivery outcome is stored. There is no log of past deliveries, and failed
deliveries are **not retried** — a failed webhook is lost.

For anything you cannot afford to miss, have Lashtest Lab write the data somewhere durable and
reconcile from there, rather than relying on the webhook alone. A CI results push or an API call
gives you a durable path; a webhook does not.
:::

## Practical tips

- **One endpoint per purpose.** A channel for release notifications and a separate one for
  automation is easier to manage than one endpoint subscribed to everything.
- **Start narrow.** Subscribe to `run.status_changed` first and confirm it works before adding
  noisier events.
- **Watch the failure indicator.** A red dot means events are being lost silently.
