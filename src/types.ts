export type DistrictId = 'about' | 'projects' | 'skills' | 'experience' | 'contact';

export interface DistrictConfig {
  id: DistrictId;
  sectorCode: string;
  name: string;
  simpleName: string;
  subtitle: string;
  japaneseName: string;
  japaneseSubtitle: string;
  primaryColor: string;
  glowColor: string;
  meshNames: string[];
  // Relative camera framing coordinates
  targetOffset: [number, number, number];
  cameraOffset: [number, number, number];
  beaconPos: [number, number, number];
  summary: string;
  statusText: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  tech: string[];
  liveUrl: string;
  githubUrl?: string;
  accent: string;
  description: string;
  highlights: string[];
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  code: string;
  skills: {
    name: string;
    level: number; // 0-100
    category: string;
    iconText: string;
    details: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  badge: string;
  summary: string;
  deliverables: string[];
}
