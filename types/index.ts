export type Difficulty = "Dasar" | "Menengah" | "Lanjutan";
export type MediaType = "Artikel" | "Video" | "Audio" | "Infografis" | "Dokumen" | "Aktivitas" | "Simulasi" | "Kuis";

export type ContentBlock =
  | { id: string; block_type: "text"; heading?: string; body: string }
  | { id: string; block_type: "image"; src: string; alt: string; caption?: string }
  | { id: string; block_type: "gallery"; images: { src: string; alt: string }[] }
  | { id: string; block_type: "video"; title: string; duration: string; src?: string }
  | { id: string; block_type: "audio"; title: string; duration: string }
  | { id: string; block_type: "document"; title: string; pages: number }
  | { id: string; block_type: "steps"; title: string; steps: string[] }
  | { id: string; block_type: "checklist"; title: string; items: string[] }
  | { id: string; block_type: "quiz"; question: string; options: string[]; answer: number }
  | { id: string; block_type: "reflection"; prompt: string }
  | { id: string; block_type: "code"; language: string; code: string }
  | { id: string; block_type: "flowchart"; title: string; nodes: string[] }
  | { id: string; block_type: "timer"; minutes: number; label: string }
  | { id: string; block_type: "embed"; title: string; url: string }
  | { id: string; block_type: "diagram"; title: string; description: string }
  | { id: string; block_type: "image-hotspot"; image: string; points: { x: number; y: number; name: string; description: string }[] };

export interface Department {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  soft: string;
  icon: string;
  stats: { materials: number; contributors: number };
}

export interface Material {
  slug: string;
  title: string;
  summary: string;
  department: string;
  type: MediaType;
  difficulty: Difficulty;
  duration: number;
  author: string;
  date: string;
  popularity: number;
  featured?: boolean;
  image: string;
  objectives: string[];
  blocks: ContentBlock[];
}

export interface Program {
  slug: string;
  title: string;
  description: string;
  departments: string[];
  progress: number;
  image: string;
  materialSlugs: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  student: string;
  department: string;
  type: "Karya digital" | "Pertunjukan" | "Proyek" | "Dokumentasi";
  year: number;
  description: string;
  image: string;
}

