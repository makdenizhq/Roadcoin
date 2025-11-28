export interface SlideItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface RoadmapItem {
  phase: string;
  title: string;
  items: string[];
  date: string;
}

export interface StatItem {
  label: string;
  value: string;
  prefix?: string;
}

export type Language = 'tr' | 'en';