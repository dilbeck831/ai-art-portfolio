export interface LabTool {
  slug: string;
  title: string;
  number: string;
  shortDescription: string;
  longDescription?: string;
  tech: string[];
  embedUrl?: string;
  hasInlineApp: boolean;
  order: number;
}

export const labTools: LabTool[] = [
  {
    slug: 'arpeggiator-drum-sequencer',
    title: 'Arpeggiator & Drum Sequencer',
    number: '001',
    shortDescription: 'Web Audio API–driven arp and step sequencer.',
    tech: ['Web Audio API'],
    hasInlineApp: true,
    order: 1,
  },
  {
    slug: 'sub-bass-reese-synth',
    title: 'Sub-Bass & Reese Synth',
    number: '002',
    shortDescription: 'MIDI and Web Audio bass and Reese-style patches.',
    tech: ['MIDI', 'Web Audio API'],
    hasInlineApp: true,
    order: 2,
  },
  {
    slug: 'sequential-pro-one',
    title: 'Sequential Pro-One Emulator',
    number: '003',
    shortDescription: 'Browser emulation of classic Pro-One style synthesis.',
    tech: ['Web Audio API'],
    hasInlineApp: true,
    order: 3,
  },
  {
    slug: 'audio-reactive-solar',
    title: 'Audio-Reactive Solar System',
    number: '004',
    shortDescription: 'Three.js solar system driven by audio input.',
    tech: ['Three.js', 'Web Audio API'],
    hasInlineApp: true,
    order: 4,
  },
  {
    slug: 'midjourney-prompt-studio',
    title: 'Midjourney Prompt Studio',
    number: '005',
    shortDescription: 'Structured prompt builder and tester with Claude API.',
    tech: ['Claude API'],
    hasInlineApp: true,
    order: 5,
  },
  {
    slug: 'fluxprompt',
    title: 'FLUXPROMPT — AI Video Prompt Generator',
    number: '006',
    shortDescription: 'Generate and refine video prompts via Grok API.',
    tech: ['Grok API'],
    hasInlineApp: true,
    order: 6,
  },
  {
    slug: 'merge-grotesque',
    title: 'Merge Grotesque',
    number: '007',
    shortDescription: 'Dark baroque merge game in the browser.',
    tech: ['Canvas', 'JavaScript'],
    hasInlineApp: true,
    order: 7,
  },
  {
    slug: 'v2-danger-case',
    title: 'V2 — Danger Case',
    number: '008',
    shortDescription: 'Experimental dark interface. Gold & black. Maximum movement.',
    longDescription: 'An experimental full-screen experience — gold dust particles, parallax geometry, 3D card tilt, drag-scroll reel, and glitch typography. The unreleased interface.',
    tech: ['GSAP', 'Canvas API', 'CSS'],
    hasInlineApp: false,
    order: 8,
  },
];

export function getLabToolBySlug(slug: string): LabTool | undefined {
  return labTools.find((t) => t.slug === slug);
}
