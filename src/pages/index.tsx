import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type Card = {title: string; desc: string; to: string};

const SECTIONS: Card[] = [
  {
    title: 'Getting started',
    desc: 'Create an account, run your first test run, understand what your plan allows.',
    to: '/getting-started/introduction',
  },
  {
    title: 'Core concepts',
    desc: 'How organisations, projects, suites, cases, runs, and plans fit together.',
    to: '/concepts/overview',
  },
  {
    title: 'Guides',
    desc: 'Step-by-step walkthroughs for everyday tasks, from importing cases to AI analysis.',
    to: '/guides/manage-test-cases',
  },
  {
    title: 'CI integration',
    desc: 'Push automated test results from GitHub, GitLab, Jenkins, or a custom endpoint.',
    to: '/integrations/ci-overview',
  },
  {
    title: 'AI Intelligence',
    desc: 'Analyse a release’s tickets to find coverage gaps and propose missing tests.',
    to: '/guides/ai-intelligence',
  },
  {
    title: 'Reference',
    desc: 'Permissions, status values, limits, error codes, and the HTTP API.',
    to: '/reference/permissions',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className={clsx('button button--primary button--lg', styles.cta)} to="/getting-started/introduction">
            Start reading
          </Link>
          <Link className="button button--outline button--lg" to="/getting-started/quickstart">
            Quickstart
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="Documentation for Lashtest Lab — test cases, runs, plans, CI integration, and AI analysis.">
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <div className="ll-cards">
          {SECTIONS.map((s) => (
            <Link key={s.to} className="ll-card" to={s.to}>
              <span className="ll-card__title">{s.title}</span>
              <span className="ll-card__desc">{s.desc}</span>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
