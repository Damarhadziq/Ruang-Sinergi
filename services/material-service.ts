import { materials } from "@/data/mock-data";
import type { Material } from "@/types";

export type MaterialInput = Omit<Material, "slug" | "popularity" | "date">;

export interface MaterialService {
  getMaterials(): Promise<Material[]>;
  getMaterialBySlug(slug: string): Promise<Material | null>;
  createMaterial(data: MaterialInput): Promise<Material>;
}

export class MockMaterialService implements MaterialService {
  async getMaterials() { return [...materials]; }
  async getMaterialBySlug(slug: string) { return materials.find((item) => item.slug === slug) ?? null; }
  async createMaterial(data: MaterialInput) {
    return { ...data, slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"), popularity: 0, date: new Date().toISOString().slice(0, 10) };
  }
}

export const materialService: MaterialService = new MockMaterialService();
