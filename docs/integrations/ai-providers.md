---
sidebar_position: 6
title: AI providers
description: Configuring the LLM that powers AI Intelligence, and what data it receives.
---

# AI providers

AI Intelligence needs a large language model to run its analysis. You configure it once per
organisation, using your own API key with a provider of your choice.

:::note Requires a Pro or Enterprise plan
Configuring a provider is available on Pro and Enterprise. On Free the settings page is locked. See
[Plans and quotas](../getting-started/plans-and-quotas).
:::

## Supported providers

| Provider | What you need |
| --- | --- |
| **Anthropic (Claude)** | An Anthropic API key (`sk-ant-…`) |
| **OpenAI (GPT-4o)** | An OpenAI API key (`sk-…`) |
| **Custom / Self-hosted** | A base URL and an API key |
| **Hugging Face** | An API key and a model ID |

Only one provider is configured per organisation.

### Custom and self-hosted

The **custom** option works with any endpoint that speaks the OpenAI chat-completions API. You
supply a **base URL** (for example `https://your-llm-host/v1`) plus a key. This is the option for a
self-hosted model, an internal gateway, or a provider not listed above.

The base URL is validated when you save.

### Hugging Face

Hugging Face requires a **model ID** in addition to the key, for example:

```
deepseek-ai/DeepSeek-V4.1-Flash:novita
```

The optional `:provider` suffix routes the request through a specific inference provider on
Hugging Face's router.

## Configuring

An admin or owner configures this at **Org settings → AI**.

1. Choose the provider.
2. Paste the API key.
3. For custom or Hugging Face, fill in the extra fields.
4. Click **Save & Validate**.

### Save & Validate really does validate

Unlike most settings forms, saving makes a live call to the provider to confirm the key works:

- **Anthropic** — a minimal request against a small model. Note that an HTTP 400 still counts as a
  successful validation, because it proves authentication passed and the key was accepted.
- **OpenAI** — lists available models.
- **Custom / Hugging Face** — calls the configured endpoint.

If validation **times out** rather than failing, the key is still saved, with a warning:

> *"Key saved but validation timed out. The key will be tested when you run your first analysis."*

So a timeout is not a failure, but it is also not a confirmation. If your first analysis then fails,
suspect the key.

## Managing the key

| Action | Notes |
| --- | --- |
| **Rotate key** | Replaces the stored key with a new one |
| **Remove** | Deletes the configuration; AI Intelligence stops working for the organisation |

The stored key is shown only as a hint — the first ten characters followed by dots — so you can tell
two keys apart without exposing either. The full key is encrypted at rest and cannot be displayed.

### Validation state

The page shows when the key was last validated, or **"Not yet validated"** if it has never been
confirmed by a successful call.

## What data is sent to your provider

This is the disclosure shown in the product when you configure a provider. It is reproduced here
exactly, because it is a commitment:

> Your ticket titles and descriptions, and test case titles and descriptions are sent to your
> configured AI provider when running an analysis. No attachments, comments, or personal data are
> included.

| Sent | Not sent |
| --- | --- |
| Ticket titles and descriptions | Attachments |
| Test case titles and descriptions | Comments |
| | Personal data |

:::warning Your tickets may still contain personal data
The statement above describes what the application *sends*. It does not guarantee that the content
is free of personal data — if someone wrote a customer's name or email address into a ticket
description, that text is part of the description and **will** be sent.

If you work with personal data, review what your tickets typically contain before enabling this
feature, and satisfy yourself that sending them to your chosen provider is appropriate for your
obligations.
:::

Because the key is yours, the content goes to **your account** with that provider and is governed
by your agreement with them — including their retention and training practices. Choose accordingly.

## Choosing a provider

| Consideration | Notes |
| --- | --- |
| **Data residency** | Where the provider processes and stores data matters for regulated workloads |
| **Retention and training** | Check whether the provider retains submitted content or trains on it |
| **Model quality** | Matching ticket text to test case text is a reasoning task; stronger models give better matches |
| **Latency** | A slow provider risks hitting the analysis timeout on large releases |
| **Cost** | You pay the provider directly; a large release can be many tickets' worth of tokens |

For sensitive content, a **self-hosted** model behind the custom option keeps data inside your own
infrastructure, which is often the only viable choice under strict data-handling rules.

## Limits

| Limit | Value |
| --- | --- |
| Configurations per organisation | 1 |
| Standard provider request timeout | 30 seconds |
| Custom and Hugging Face request timeout | 120 seconds |
| Whole-analysis timeout | 300 seconds soft, 360 seconds hard |

The longer timeout for custom and Hugging Face reflects that self-hosted and routed inference is
usually slower.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| *"AI Intelligence requires a Pro or Enterprise plan."* | The plan does not include the feature |
| Analysis fails immediately | The key is invalid — re-run **Save & Validate** |
| *"Key saved but validation timed out"* | The provider was slow; the key may still be fine |
| Analysis times out | Too many tickets for the provider's speed — analyse a smaller subset |
| Admin cannot find the page | The role must be admin or owner |
