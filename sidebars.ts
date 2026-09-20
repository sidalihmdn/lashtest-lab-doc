import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Documentation sidebar.
 *
 * Ordered as a reading path: understand the product, then the concepts that
 * everything else builds on, then task-oriented guides, then integrations and
 * reference material.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      link: {type: 'doc', id: 'getting-started/introduction'},
      items: [
        'getting-started/introduction',
        'getting-started/quickstart',
        'getting-started/account-and-sign-in',
        'getting-started/plans-and-quotas',
      ],
    },
    {
      type: 'category',
      label: 'Core concepts',
      collapsed: false,
      link: {type: 'doc', id: 'concepts/overview'},
      items: [
        'concepts/overview',
        'concepts/organisations-and-roles',
        'concepts/projects-and-suites',
        'concepts/test-cases',
        'concepts/test-runs',
        'concepts/test-plans',
        'concepts/pass-rate',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/manage-test-cases',
        'guides/import-and-export-cases',
        'guides/execute-a-run',
        'guides/run-templates',
        'guides/comments-and-attachments',
        'guides/tickets-and-linked-issues',
        'guides/reports-and-insights',
        'guides/ai-intelligence',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      link: {type: 'doc', id: 'integrations/ci-overview'},
      items: [
        'integrations/ci-overview',
        'integrations/automated-test-ids',
        'integrations/api-keys',
        'integrations/webhooks',
        'integrations/ticket-integrations',
        'integrations/ai-providers',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/permissions',
        'reference/statuses',
        'reference/limits',
        'reference/error-codes',
        'reference/api',
      ],
    },
  ],
};

export default sidebars;
