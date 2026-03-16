export interface CaseStudy {
  slug: string;
  title: string;
  client?: string;
  role?: string;
  summary: string;
  body: string;
  capabilities: string[];
  images?: { src: string; alt: string; caption?: string }[];
  year?: string;
  order: number;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'amd-global-nav',
    title: 'AMD Global Navigation IA Redesign',
    client: 'AMD',
    role: 'Lead IA',
    summary: 'Enterprise-scale navigation and information architecture for AMD.com and product hubs.',
    body: 'Full IA and navigation redesign for AMD’s global web presence. Defined structure, labels, and hierarchy across product, developer, and support channels. Delivered sitemaps, wireframes, and specs for implementation.',
    capabilities: ['ia', 'nav', 'design-systems'],
    year: '2024',
    order: 1,
  },
  {
    slug: 'amd-dark-data-table',
    title: 'AMD AI Developer Program Dark Data Table',
    client: 'AMD',
    role: 'UX / Front-End',
    summary: 'Dark-theme data table and filtering for the AI Developer Program resource library.',
    body: 'Designed and built an accessible, performant data table for model cards and resources. Dark theme aligned with AMD developer branding; filters, sort, and responsive behavior for internal and partner use.',
    capabilities: ['design-systems', 'a11y', 'front-end'],
    year: '2024',
    order: 2,
  },
  {
    slug: 'enterprise-design-system',
    title: 'Enterprise Design System Components',
    client: 'Fortune 100',
    role: 'Design Systems',
    summary: 'Component library and documentation for a Fortune 100 design system.',
    body: 'Contributed to a large-scale design system: component API design, accessibility patterns, and documentation. Components shipped across multiple product lines and internal tools.',
    capabilities: ['design-systems', 'a11y', 'front-end'],
    year: '2023',
    order: 3,
  },
  {
    slug: 'amd-seo-audit',
    title: 'AMD.com SEO Audit Tool',
    client: 'AMD',
    role: 'UX / Prototyping',
    summary: 'Internal tool for SEO audit and content discovery across AMD properties.',
    body: 'Prototyped and specified an internal SEO audit tool: crawl data, gap analysis, and reporting. Improved visibility and prioritization for content and IA improvements.',
    capabilities: ['ia', 'prototyping', 'ai-tooling'],
    year: '2024',
    order: 4,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
