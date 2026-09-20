---
sidebar_position: 1
title: Permissions
description: The complete capability matrix for each organisation role.
---

# Permissions

There are four organisation roles: `owner`, `admin`, `tester`, `viewer`. This page lists what each
can do.

## Summary

| Role | Read | Write / execute | Admin | Manage organisation |
| --- | --- | --- | --- | --- |
| `viewer` | ✓ | — | — | — |
| `tester` | ✓ | ✓ | — | — |
| `admin` | ✓ | ✓ | ✓ | — |
| `owner` | ✓ | ✓ | ✓ | ✓ |

## Capabilities by feature

### Organisation

| Capability | viewer | tester | admin | owner |
| --- | --- | --- | --- | --- |
| View organisation and its projects | ✓ | ✓ | ✓ | ✓ |
| Rename organisation | — | — | ✓ | ✓ |
| Manage members and invitations | — | — | ✓ | ✓ |
| Configure integrations (CI, tickets, AI) | — | — | ✓ | ✓ |
| View billing and usage | ✓ | ✓ | ✓ | ✓ |
| **Change the plan** | — | — | — | ✓ |
| **Delete the organisation** | — | — | — | ✓ |

### Test cases and suites

| Capability | viewer | tester | admin | owner |
| --- | --- | --- | --- | --- |
| View cases, suites, and history | ✓ | ✓ | ✓ | ✓ |
| Create and edit test cases | — | ✓ | ✓ | ✓ |
| Clone a case | — | ✓ | ✓ | ✓ |
| Import cases from CSV | — | ✓ | ✓ | ✓ |
| Export cases | ✓ | ✓ | ✓ | ✓ |
| **Create, rename, delete suites** | — | — | ✓ | ✓ |
| **Reorder suites** | — | — | ✓ | ✓ |
| **Bulk-delete cases** | — | — | ✓ | ✓ |

### Test runs

| Capability | viewer | tester | admin | owner |
| --- | --- | --- | --- | --- |
| View runs and results | ✓ | ✓ | ✓ | ✓ |
| Record and change results | — | ✓ | ✓ | ✓ |
| Add notes to a case result | — | ✓ | ✓ | ✓ |
| **Create a run** | — | — | ✓ | ✓ |
| **Delete a run** | — | — | ✓ | ✓ |
| Assign a run | — | — | ✓ | ✓ |

### Comments and attachments

| Capability | viewer | tester | admin | owner |
| --- | --- | --- | --- | --- |
| Read comments and attachments | ✓ | ✓ | ✓ | ✓ |
| Add a comment | — | ✓ | ✓ | ✓ |
| Upload an attachment | — | ✓ | ✓ | ✓ |
| Delete **your own** comment or attachment | — | ✓ | ✓ | ✓ |
| **Delete anyone's comment or attachment** | — | — | ✓ | ✓ |

### Test plans

| Capability | viewer | tester | admin | owner |
| --- | --- | --- | --- | --- |
| View plans and summaries | ✓ | ✓ | ✓ | ✓ |
| **Create, edit, delete plans** | — | — | ✓ | ✓ |
| Attach and detach runs | — | ✓ | ✓ | ✓ |

### Reports

| Capability | viewer | tester | admin | owner |
| --- | --- | --- | --- | --- |
| **View and export reports** | — | ✓ | ✓ | ✓ |

Reports require the `reports` plan feature as well as a role of tester or above.

### Project configuration

| Capability | viewer | tester | admin | owner |
| --- | --- | --- | --- | --- |
| View configuration | ✓ | ✓ | ✓ | ✓ |
| Edit project details and defaults | — | — | ✓ | ✓ |
| Manage run templates | — | — | ✓ | ✓ |
| **Manage API keys** | — | — | ✓ | ✓ |
| **Manage webhooks** | — | — | ✓ | ✓ |
| Manage project members | — | — | ✓ | ✓ |

### AI Intelligence

| Capability | viewer | tester | admin | owner |
| --- | --- | --- | --- | --- |
| Run an analysis | — | — | ✓ | ✓ |
| Accept or reject proposals | — | — | ✓ | ✓ |
| Configure the AI provider | — | — | ✓ | ✓ |

## Roles that can be assigned

| Context | Allowed roles |
| --- | --- |
| Invitations | `admin`, `tester`, `viewer` — **never `owner`** |
| Changing a member's role | `admin`, `tester`, `viewer` |
| Assigning a test run | `owner`, `admin`, `tester` — **not `viewer`** |

## Membership guard rails

These prevent privilege escalation through the member list:

| Rule | Effect |
| --- | --- |
| You cannot modify your own membership | An admin cannot promote themselves |
| The owner cannot be modified | Only the owner's own account controls the owner role |
| An admin cannot modify another admin | Only the owner can change an admin's role |

## Project-level roles

Beyond organisation roles, a project has its own member list which restricts who appears in
project-specific pickers. Adding or removing project members requires an org **admin** or **owner**.

Project membership does not grant capabilities beyond the member's organisation role — an org
`viewer` added to a project is still a viewer.
