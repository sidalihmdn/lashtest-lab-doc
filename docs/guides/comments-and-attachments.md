---
sidebar_position: 5
title: Comments and attachments
description: Discussing a result with @mentions and attaching evidence to a test case result.
---

# Comments and attachments

Comments and attachments hang off an individual **test case result** within a run, not off the run
as a whole. That keeps discussion attached to the specific thing being discussed.

## Comments

A comment thread belongs to one case in one run. Use it for:

- Recording what actually happened when a test failed.
- Discussing whether a failure is a real defect or a bad test.
- Handing context to the next person who runs the case.

### Writing a comment

Open a case in the run and add a comment. Press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to submit without
reaching for the mouse.

### Mentions

Type `@` to mention a colleague. An autocomplete list appears as you type; mentions resolve against
the members of your organisation.

Mentioning someone **sends them an email notification**. This is how you bring a failure to a
developer's attention without leaving the tool.

Mentions use the person's **full name** as it appears in the organisation. Mentioning yourself is
ignored — you do not get an email about your own comment.

:::note You cannot mention someone who is not in the organisation
The mention list only contains members. If the person who needs to know is not a member, invite
them first, or record their name as plain text — plain text does not notify anyone.
:::

### Deleting a comment

You can delete **your own** comments. Admins and owners can delete **anyone's**, which is useful
for removing comments that are inappropriate or were posted by mistake.

Deleted comments are removed; there is no undo.

## Attachments

Attach files as evidence for a result — a screenshot of the failure, a log file, a video capture, a
test data export.

### Limits

| Limit | Value |
| --- | --- |
| Maximum file size | **20 MB** per file |
| Maximum attachments | **10 per test case result** |

The 20 MB limit applies per file, and the 10-file limit applies to each case *within a run*. A run
with 50 cases can hold 500 attachments in total; each individual case is capped at 10.

### Allowed file types

Only these types are accepted:

| Category | Types |
| --- | --- |
| Images | `png`, `jpeg`, `gif`, `webp` |
| Documents | `pdf`, `text/plain`, `text/csv` |
| Data | `application/json`, `application/zip` |
| Video | `mp4` |

Anything else is rejected with *"File type `{type}` is not allowed."*

Note the list is by MIME type, so a renamed file is still rejected on its actual type. If you need
to attach something outside this list — a Word document, a spreadsheet — zip it first, since
`application/zip` is allowed.

### Downloading

Attachments download through a short-lived signed link, so access is checked at download time rather
than baked into a permanent URL.

### Deleting an attachment

The **uploader** can delete their own attachments. Admins and owners can delete any, which lets a
team clean up after a run is archived.

## A note on evidence and closed runs

Attachments and comments on a **closed** run behave like the rest of the run: the run's results are
frozen. Add evidence while the run is open — once it is closed, the record is final.
