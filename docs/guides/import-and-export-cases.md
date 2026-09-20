---
sidebar_position: 2
title: Importing and exporting cases
description: CSV import format, the steps delimiter, and exporting a project's cases.
---

# Importing and exporting cases

You can bring an existing case library in from CSV, and export your cases back out — either as a
single file or as one file per suite.

## Importing from CSV

Import requires an **admin** or **owner** role.

### Required column

The only mandatory column is **`title`**. A CSV without it is rejected.

### Recognised columns

| Column | Notes |
| --- | --- |
| `title` | **Required** |
| `status` | `draft`, `active`, or `deprecated` |
| `priority` | `low`, `medium`, `high`, or `critical` |
| `tags` | Multiple tags — see the delimiter rule below |
| `preconditions` | Multiple lines — see the delimiter rule below |
| `description` | Free text |
| `steps` | Actions — see the delimiter rule below |
| `expected_results` | Expected outcomes — **note the plural** |
| `id` | Accepted so exports round-trip, but **ignored on import** — see below |

Any other column is ignored, so you can import a spreadsheet that has extra columns without
cleaning it first.

### The delimiter — use `||`

Three columns hold **multiple values in one cell**, and all three split on a double pipe:

| Column | Splits into |
| --- | --- |
| `steps` | A list of actions |
| `expected_results` | A list of outcomes, parallel to `steps` |
| `tags` | One tag per entry |
| `preconditions` | Multiple lines |

```
||
```

A single `|` is **not** a delimiter. This is the most common import mistake: a `steps` cell
containing `Open the page | Click login` is treated as **one** step, not two.

For a case with two steps and two expected results, the cells look like:

```csv
steps,expected_results
Open the checkout page||Enter a valid card number||Click Pay,The cart shows one item||The card is accepted||Payment succeeds
```

Tags use the same delimiter:

```csv
tags
smoke||regression||checkout
```

The two step lists must have the **same number of entries**. Because they are parallel, entry 3 in
`steps` pairs with entry 3 in `expected_results`.

:::warning Mismatched step counts skip the row
If the two lists differ in length, that row is **skipped** and reported as an error with its row
number. The import continues with the remaining rows — it does not fail outright.
:::

### Invalid values fall back rather than failing

An unrecognised `status` or `priority` does not reject the row. The value is reported as an error
and the row is imported using the default — `draft` for status, `medium` for priority. So always
read the error list: a row can import "successfully" while quietly losing the value you intended.


### Choosing a destination suite

Optionally pick a suite to import into. Without one, imported cases land in **Unsorted** and can be
triaged afterwards with bulk Move.

### Reading the result

The import reports:

- **Imported count** — rows that became cases
- **Skipped count** — rows that could not be imported
- **Errors** — a list naming the row number and the problem

Every error names its row, so you can fix the source file and re-import just the failures.

### Plan limits during import

If the import would exceed your plan's test case limit, it **stops at the limit** and tells you how
many rows were imported before stopping. The remaining rows are skipped rather than the whole
import failing.

On the Free plan (500 cases), a 600-row import into an empty project imports 500 and reports the
rest as skipped.

### Preparing a file

A minimal working import:

```csv
title,priority,status,steps,expected_results,tags
User can log in,high,active,Open the login page||Enter valid credentials||Submit,The form appears||The fields accept input||The dashboard loads,smoke
User cannot log in with a bad password,critical,active,Open the login page||Enter an invalid password||Submit,The form appears||The fields accept input||An error is shown,
```

Note the second row has no tags — that is fine, the column can be empty.

### Import does not update existing cases

This is the most important thing to know before using export → edit → import as a bulk-edit
workflow.

The `id` column is accepted by the importer so that an exported file imports without complaint,
but its value is **not read**. There is no matching of imported rows to existing cases, by `id` or
by title. **Every imported row creates a new test case.**

So re-importing an edited export gives you duplicate cases, not updated ones. There is no
upsert-on-import.

To bulk-edit safely, either:

- Delete the originals before re-importing, or
- Edit the cases in the application using the bulk operations, or
- Import into a fresh project and move what you need.

## Exporting

### Export one suite

Export a subset of cases as a single CSV, optionally scoped to one suite.

### Export everything

Export all of a project's cases as a **ZIP** containing one CSV per suite, plus `unsorted.csv` for
cases without a suite. The files are named after their suites, so the archive mirrors your tree.

### Exported columns

Exports include the case identifier alongside its content, so a round-trip export → edit → import
keeps the same records together:

```
id, title, description, preconditions, steps, expected_results, priority, status, tags
```

This makes export a practical way to get data **out** for analysis or archiving. Treat import as
a way to create cases, not to synchronise them — see the warning below.

### Also available as PDF

Run results, trends, and flakiness reports each export to CSV and PDF from the
[reports](./reports-and-insights) page. Case-level export is CSV only.
