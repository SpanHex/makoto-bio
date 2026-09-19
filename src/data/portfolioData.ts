import { DistrictConfig, ExperienceItem, ProjectItem, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'SPANDAN UPAMANYU',
  japaneseName: 'スパンダン',
  handle: '@SpanHex',
  title: 'CREATIVE FRONTEND & 3D WEB DEVELOPER',
  japaneseTitle: 'クリエイティブ・フロントエンド・開発者',
  location: 'Assam, India',
  japaneseLocation: 'アッサム州、インド',
  coordinates: "26.2006° N, 92.9376° E",
  email: 'rumis3744@gmail.com',
  github: 'https://github.com/SpanHex',
  instagram: 'https://instagram.com/nocturnalmakoto',
  tagline: 'Designing web experiences that feel alive, immersive, and visually uncompromising.',
  bio: "I'm Spandan, a creative web developer from Assam, India. I combine frontend engineering, creative coding, real-time 3D, and atmospheric UI/UX to transform websites into memorable places rather than standard templates. Currently crafting modern React/Three.js web systems with deep visual quality and high frame rate performance.",
  status: 'SYSTEM ONLINE // NEURAL LINK STABLE',
  japaneseStatus: '電脳網接続完了 // 正常稼働中'
};

export const DISTRICTS: DistrictConfig[] = [
  {
    id: 'about',
    sectorCode: 'SEC-01',
    name: 'NEURAL CORE',
    simpleName: 'About',
    subtitle: 'IDENTITY // PHILOSOPHY & VISION',
    japaneseName: 'ニューラル・コア',
    japaneseSubtitle: '自己同一性 // 開発哲学・信条',
    primaryColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.45)',
    meshNames: ['Object_10', 'Object_11', 'Object_15', 'Object_16'],
    // 3D camera focus coordinates (calibrated for the centered model)
    targetOffset: [0.0, 1.2, 0.0],
    cameraOffset: [0.0, 3.8, 6.5],
    beaconPos: [0.0, 3.4, 0.0],
    summary: 'Central identity mainframe housing developer background, philosophy, creative ethos, and core architecture.',
    statusText: 'OPERATIONAL'
  },
  {
    id: 'projects',
    sectorCode: 'SEC-02',
    name: 'QUANTUM LAB',
    simpleName: 'Portfolio',
    subtitle: 'SELECTED WORLDS // DIGITAL ARTIFACTS',
    japaneseName: '量子研究所',
    japaneseSubtitle: '選択世界 // 電脳作品群',
    primaryColor: '#ff007f',
    glowColor: 'rgba(255, 0, 127, 0.45)',
    meshNames: ['Object_13', 'Object_14', 'Object_18', 'Object_19'],
    targetOffset: [2.0, 0.9, -1.0],
    cameraOffset: [3.8, 3.2, 3.5],
    beaconPos: [2.0, 2.8, -1.0],
    summary: 'Experimental laboratory showcasing 6 production web environments with live deployments and code repositories.',
    statusText: '6 WORLDS ACTIVE'
  },
  {
    id: 'skills',
    sectorCode: 'SEC-03',
    name: 'TECH FORGE',
    simpleName: 'Skills',
    subtitle: 'ARSENAL // STACK & ARCHITECTURE',
    japaneseName: '技術鍛冶場',
    japaneseSubtitle: '開発兵装 // 技術スタック基盤',
    primaryColor: '#ffb800',
    glowColor: 'rgba(255, 184, 0, 0.45)',
    meshNames: ['Object_21', 'Object_26', 'Object_30'],
    targetOffset: [-2.2, 0.8, -0.6],
    cameraOffset: [-4.2, 3.0, 3.8],
    beaconPos: [-2.2, 2.6, -0.6],
    summary: 'High-density processing foundry detailing frontend mastery, 3D WebGL systems, animation frameworks, and developer tooling.',
    statusText: 'CAPACITY 100%'
  },
  {
    id: 'experience',
    sectorCode: 'SEC-04',
    name: 'TIMELINE ARCHIVE',
    simpleName: 'Experience',
    subtitle: 'CHRONOLOGY // JOURNEY & MILESTONES',
    japaneseName: '時系列記録',
    japaneseSubtitle: '開発年表 // 実績軌跡',
    primaryColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    meshNames: ['Object_22', 'Object_24', 'Object_27', 'Object_28', 'Object_29'],
    targetOffset: [1.2, 1.4, -2.2],
    cameraOffset: [2.2, 4.0, 2.5],
    beaconPos: [1.2, 3.5, -2.2],
    summary: 'Historical database tracking educational milestones, creative technology practice, and real-world project releases.',
    statusText: 'RECORDED'
  },
  {
    id: 'contact',
    sectorCode: 'SEC-05',
    name: 'SIGNAL RELAY',
    simpleName: 'Contact',
    subtitle: 'TRANSMISSION // NEURAL UPLINK',
    japaneseName: '通信中継局',
    japaneseSubtitle: '信号伝送 // 神経回線接続',
    primaryColor: '#00ff66',
    glowColor: 'rgba(0, 255, 102, 0.45)',
    meshNames: ['Object_31', 'Object_32', 'Object_4', 'Object_33'],
    targetOffset: [-1.8, 1.0, 2.2],
    cameraOffset: [-2.8, 3.2, 6.2],
    beaconPos: [-1.8, 2.7, 2.2],
    summary: 'Direct telecommunications terminal for incoming inquiries, collaboration requests, and network synchronization.',
    statusText: 'RECEIVING SIGNALS'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'unipath',
    index: '01',
    title: 'UNIPATH',
    tagline: 'Structured Education-Oriented System',
    category: 'SYSTEM / EDUCATION',
    tech: ['TypeScript', 'React', 'Vite', 'Tailwind', 'Motion'],
    liveUrl: 'https://unipath-1-psi.vercel.app/',
    githubUrl: 'https://github.com/SpanHex',
    accent: '#d8bf8c',
    description: 'A clear, structured web world focused on helping students and learners navigate educational paths with clarity, progression tracking, and intuitive information architecture.',
    highlights: [
      'Comprehensive educational pathway visualization',
      'Intuitive hierarchy designed to minimize cognitive friction',
      'High-performance client-side routing and animated transitions'
    ],
    featured: true
  },
  {
    id: 'roxima-b',
    index: '02',
    title: 'ROXIMA B',
    tagline: 'Atmospheric Sci-Fi Experimental Web Experience',
    category: 'EXPERIMENTAL WEB',
    tech: ['Creative Frontend', 'WebGL', 'GSAP', 'Interaction Design'],
    liveUrl: 'https://roxima-b.pages.dev/',
    githubUrl: 'https://github.com/SpanHex',
    accent: '#9ab4a4',
    description: 'A compact digital experiment exploring environmental atmosphere, interface rhythm, dynamic composition, and responsive spatial navigation.',
    highlights: [
      'Layered cinematic depth and interactive parallax',
      'Custom spatial sound integration and ambient dynamics',
      'Micro-interactions tuned for high tactile engagement'
    ],
    featured: true
  },
  {
    id: 'bl-beauty-alpha',
    index: '03',
    title: 'BL BEAUTY ALPHA',
    tagline: 'High-End Branded Editorial Interface',
    category: 'BRANDED EXPERIENCE',
    tech: ['React', 'Visual Design', 'CSS Architecture', 'Editorial'],
    liveUrl: 'https://blbeautyalpha.pages.dev/',
    githubUrl: 'https://github.com/SpanHex',
    accent: '#d6a2a3',
    description: 'A luxury beauty-focused interface engineered with a delicate visual register, strong typographic point of view, and refined aesthetic restraint.',
    highlights: [
      'Editorial magazine layout with seamless responsive grids',
      'Subtle motion typography and image reveal sequences',
      'Optimized asset delivery and zero layout shift'
    ]
  },
  {
    id: 'zillie-birthday',
    index: '04',
    title: 'ZILLIE BIRTHDAY',
    tagline: 'Whimsical Personal Creative Interactive Piece',
    category: 'PERSONAL EXPERIENCE',
    tech: ['Creative Frontend', 'Motion', 'Interactive Canvas'],
    liveUrl: 'https://zillie-birthday.vercel.app/',
    githubUrl: 'https://github.com/SpanHex',
    accent: '#d6bf72',
    description: 'A joyful, playful interactive experience created to make a personal celebratory moment deeply memorable, proving web experiences can be both intimate and technically polished.',
    highlights: [
      'Interactive particle celebratory physics and confetti',
      'Delightful interactive audio-visual cues',
      'Custom hand-crafted animations with spring physics'
    ]
  },
  {
    id: 'tesseth-archive',
    index: '05',
    title: 'TESSETH ARCHIVE',
    tagline: 'Story-Forward Fragment & Lore Repository',
    category: 'ARCHIVE / STORY',
    tech: ['Frontend', 'Typography', 'Pacing', 'Design Systems'],
    liveUrl: 'https://tesseth-archive.vercel.app/',
    githubUrl: 'https://github.com/SpanHex',
    accent: '#a7a1c4',
    description: 'A narrative-driven digital archive designed for collecting fragments, references, and dark atmosphere. Treats web navigation as an exploration of physical spaces.',
    highlights: [
      'Atmospheric layout designed around contemplative pacing',
      'Rich typography system evoking ancient/cybernetic lore',
      'Dynamic search and categorical filtering'
    ]
  },
  {
    id: 'tesseth-levelling',
    index: '06',
    title: 'TESSETH LEVELLING',
    tagline: 'Progression-Led Interactive Interface System',
    category: 'INTERACTIVE SYSTEM',
    tech: ['Interactive UI', 'State Flow', 'Motion Systems'],
    liveUrl: 'https://tesseth-levelling.vercel.app/',
    githubUrl: 'https://github.com/SpanHex',
    accent: '#8db4cb',
    description: 'An interactive system driven by a sense of advancement, sequence, and unlockable discovery where mechanics form part of the narrative content.',
    highlights: [
      'Real-time progression mechanics with sound feedback',
      'State-driven dynamic interface states',
      'Gamified HUD elements embedded directly into web components'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'FRONTEND ARCHITECTURE',
    code: 'CORE-FE',
    skills: [
      { name: 'TypeScript & JavaScript (ESNext)', level: 95, category: 'Language', iconText: 'TS', details: 'Type-safe scalable architectures, modern asynchronous patterns, clean abstraction layers.' },
      { name: 'React & Next.js', level: 92, category: 'Framework', iconText: 'RC', details: 'Component lifecycle mastery, server/client patterns, performance memoization, custom hooks.' },
      { name: 'HTML5 Semantic & Modern CSS', level: 96, category: 'Markup', iconText: 'CSS', details: 'Vanilla CSS architecture, CSS Grid/Flexbox, custom properties, responsive ergonomics.' },
      { name: 'Vite & Modern Tooling', level: 90, category: 'Tooling', iconText: 'VT', details: 'Blazing fast bundle optimization, HMR workflows, plugin configuration, static asset pipelines.' },
      { name: 'Tailwind CSS', level: 88, category: 'Utility', iconText: 'TW', details: 'Rapid prototyping, custom design token config, atomic stylesheet optimization.' }
    ]
  },
  {
    title: '3D & CREATIVE ENGINEERING',
    code: '3D-GFX',
    skills: [
      { name: 'Three.js & WebGL', level: 88, category: '3D Engine', iconText: '3JS', details: 'PBR materials, GLTF/GLB pipelines, post-processing bloom, raycasting, custom geometry.' },
      { name: 'React Three Fiber (R3F)', level: 85, category: '3D Framework', iconText: 'R3F', details: 'Declarative 3D scene graphs, canvas optimization, reactive camera systems.' },
      { name: 'GSAP & Motion Systems', level: 90, category: 'Animation', iconText: 'GS', details: 'Complex timeline orchestration, camera swoops, lerp physics, scroll triggers.' },
      { name: 'Blender 3D Modeling', level: 78, category: 'Asset Creation', iconText: 'BL', details: 'Mesh cleanup, material setup, coordinate conversion, GLTF export optimization.' },
      { name: 'Web Audio API', level: 82, category: 'Audio Synthesis', iconText: 'AUD', details: 'Procedural sound synthesis, custom oscillators, gain envelopes, audio-reactive feedback.' }
    ]
  },
  {
    title: 'SYSTEMS & METHODOLOGY',
    code: 'SYS-OPS',
    skills: [
      { name: 'Responsive UI/UX Design', level: 94, category: 'Design', iconText: 'UX', details: 'Human-centric digital interfaces, mobile-first responsiveness, tactile feedback.' },
      { name: 'Performance Profiling', level: 86, category: 'Engineering', iconText: 'PRF', details: '60+ FPS frame budgets, WebGL draw call reduction, memory leak disposal, Core Web Vitals.' },
      { name: 'Git & Version Control', level: 90, category: 'DevOps', iconText: 'GIT', details: 'Branching strategies, collaborative workflows, continuous deployment via Vercel & Cloudflare.' }
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    period: '2024 — PRESENT',
    role: 'Creative Web Developer & 3D Specialist',
    organization: 'Independent Creative Engineering Practice',
    location: 'Assam, India',
    badge: 'ACTIVE FOCUS',
    summary: 'Dedicated to designing and building next-generation digital experiences, combining React, Three.js, WebGL, and custom interaction mechanics.',
    deliverables: [
      'Built and deployed 6+ interactive web worlds with global edge hosting on Vercel & Cloudflare.',
      'Specialized in spatial 3D navigation, cybernetic HUD designs, and procedural Web Audio interactions.',
      'Achieved 60+ FPS WebGL rendering with optimized draw calls and custom post-processing pipelines.'
    ]
  },
  {
    period: '2023 — 2024',
    role: 'Frontend Development & UI Design Foundations',
    organization: 'Project-Based Practice & Systems Research',
    location: 'Assam, India',
    badge: 'FOUNDATION',
    summary: 'Intensive deep dive into modern TypeScript, component architecture, CSS layout engines, and interactive web standards.',
    deliverables: [
      'Mastered responsive layout systems, CSS Grid, and custom property design tokens.',
      'Developed reusable component libraries with strict TypeScript type-checking.',
      'Transitioned into creative coding with Canvas 2D and Three.js fundamentals.'
    ]
  },
  {
    period: '2022 — 2023',
    role: 'Secondary Education & Independent Computing',
    organization: 'SEBA (Board of Secondary Education, Assam)',
    location: 'Assam, India',
    badge: 'ACADEMIC',
    summary: 'Completed secondary education with focused independent exploration into computer science, creative technology, and digital design.',
    deliverables: [
      'Built early web projects and studied software architecture principles.',
      'Self-taught programming logic, algorithm design, and visual arts.'
    ]
  }
];
