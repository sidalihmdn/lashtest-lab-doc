import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Lashtest Lab',
  tagline: 'Documentation for the test management workspace',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  // Deployed as its own app on a dedicated docs subdomain.
  // Set DOCS_URL at build time to override (e.g. https://docs.example.com).
  // `||` not `??` — an unset Docker build-arg arrives as an empty string.
  url: process.env.DOCS_URL || 'https://docs.lashtest.com',
  baseUrl: '/',

  organizationName: 'lashtest-lab',
  projectName: 'lashtest-lab-doc',

  // Fail the build on a broken internal link rather than shipping a dead one.
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Docs are the primary content; serve them at the site root.
          routeBasePath: '/',
          // No "edit this page" links until the docs live in a public repo.
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Lashtest Lab',
      logo: {
        alt: 'Lashtest Lab',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://lashtestlab.com',
          label: 'Go to app',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting started', to: '/getting-started/introduction'},
            {label: 'Core concepts', to: '/concepts/overview'},
            {label: 'CI integration', to: '/integrations/ci-overview'},
          ],
        },
        {
          title: 'Reference',
          items: [
            {label: 'Permissions', to: '/reference/permissions'},
            {label: 'Statuses & results', to: '/reference/statuses'},
            {label: 'API keys', to: '/integrations/api-keys'},
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Privacy policy', href: 'https://app.lashtest.com/privacy'},
            {label: 'Terms of service', href: 'https://app.lashtest.com/terms'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lashtest Lab.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'python', 'sql', 'diff'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
