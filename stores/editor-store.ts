"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export type EditorBlock = { id: string; type: string; title: string; collapsed?: boolean };
type EditorState = { blocks: EditorBlock[]; addBlock: () => void; removeBlock: (id: string) => void; duplicateBlock: (id: string) => void; toggleBlock: (id: string) => void; setBlocks: (blocks: EditorBlock[]) => void };
export const useEditorStore = create<EditorState>()(persist((set) => ({
  blocks: [{ id: "intro", type: "text", title: "Pengantar materi" }, { id: "steps", type: "steps", title: "Langkah praktik" }, { id: "quiz", type: "quiz", title: "Cek pemahaman" }],
  addBlock: () => set((state) => ({ blocks: [...state.blocks, { id: crypto.randomUUID(), type: "text", title: "Block baru" }] })),
  removeBlock: (id) => set((state) => ({ blocks: state.blocks.filter((b) => b.id !== id) })),
  duplicateBlock: (id) => set((state) => { const target = state.blocks.find((b) => b.id === id); return { blocks: target ? [...state.blocks, { ...target, id: crypto.randomUUID(), title: `${target.title} (salinan)` }] : state.blocks }; }),
  toggleBlock: (id) => set((state) => ({ blocks: state.blocks.map((b) => b.id === id ? { ...b, collapsed: !b.collapsed } : b) })),
  setBlocks: (blocks) => set({ blocks }),
}), { name: "ruang-sinergi-editor" }));

