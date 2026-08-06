"use client";
import { Download, ExternalLink, FileText, ImageIcon, Music2, Play, ShieldCheck } from "lucide-react";
import type { ContentBlock } from "@/types";
import { Button } from "@/components/ui/button";
import { ChecklistBlock } from "./checklist-block";
import { ReflectionBlock } from "./reflection-block";
import { CodeBlock } from "./code-block";
import { TimerBlock } from "./timer-block";
import { ImageHotspotBlock } from "./image-hotspot-block";

function Steps({ title, steps }: { title: string; steps: string[] }) { return <div className="block-surface"><h3 className="block-title">{title}</h3><ol className="mt-5 grid gap-4">{steps.map((step, i) => <li key={step} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#315c4c] text-sm font-bold text-white">{i + 1}</span><p className="pt-1 text-sm leading-6 text-[#565852]">{step}</p></li>)}</ol></div>; }

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return <div className="grid gap-6">{blocks.map((block) => {
    switch (block.block_type) {
      case "text": return <section key={block.id} className="prose-copy max-w-[880px]"><h2>{block.heading}</h2><p>{block.body}</p></section>;
      case "image": return <figure key={block.id}><img src={block.src} alt={block.alt} className="w-full rounded-2xl" /><figcaption className="mt-2 text-center text-xs text-[#777]">{block.caption}</figcaption></figure>;
      case "gallery": return <div key={block.id} className="grid grid-cols-2 gap-3">{block.images.map((image) => <img key={image.src} src={image.src} alt={image.alt} className="aspect-square rounded-2xl object-cover" />)}</div>;
      case "video": return <div key={block.id} className="relative grid aspect-video place-items-center overflow-hidden rounded-2xl bg-[#202622] text-white"><div className="absolute inset-0 bg-[#344039]" /><button className="relative grid h-16 w-16 place-items-center rounded-full bg-white text-[#315c4c]" aria-label="Putar video"><Play fill="currentColor" /></button><div className="absolute inset-x-4 bottom-4 flex justify-between text-sm"><span>{block.title}</span><span>{block.duration}</span></div></div>;
      case "audio": return <div key={block.id} className="block-surface flex items-center gap-4"><button className="grid h-12 w-12 place-items-center rounded-full bg-[#805a83] text-white"><Play fill="currentColor" size={17} /></button><div className="min-w-0 flex-1"><p className="font-semibold">{block.title}</p><div className="mt-2 h-8 rounded bg-[repeating-linear-gradient(90deg,#c7abc9_0_2px,transparent_2px_6px)] opacity-70" /></div><span className="text-xs text-[#777]">{block.duration}</span></div>;
      case "document": return <div key={block.id} className="block-surface flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#f1eee9] text-[#76574b]"><FileText /></span><div className="flex-1"><p className="font-semibold">{block.title}</p><p className="text-sm text-[#777]">PDF · {block.pages} halaman</p></div><Button variant="outline" size="sm"><Download size={15} /> Unduh</Button></div>;
      case "steps": return <Steps key={block.id} {...block} />;
      case "checklist": return <ChecklistBlock key={block.id} {...block} />;
      case "quiz": return null;
      case "reflection": return <ReflectionBlock key={block.id} {...block} />;
      case "code": return <CodeBlock key={block.id} {...block} />;
      case "flowchart": return <div key={block.id} className="block-surface"><h3 className="block-title">{block.title}</h3><div className="mt-5 flex flex-wrap items-center justify-center gap-2">{block.nodes.map((node, i) => <div key={node} className="flex items-center gap-2"><span className="rounded-xl border border-[var(--border)] bg-[#f3f8f5] px-4 py-2 text-sm font-semibold text-[#315c4c]">{node}</span>{i < block.nodes.length - 1 && <span className="text-[#8da297]">→</span>}</div>)}</div></div>;
      case "timer": return <TimerBlock key={block.id} {...block} />;
      case "embed": return <div key={block.id} className="block-surface text-center"><ExternalLink className="mx-auto text-[#315c4c]" /><h3 className="mt-3 font-semibold">{block.title}</h3><Button className="mt-4" variant="outline">Buka simulasi</Button></div>;
      case "diagram": return <div key={block.id} className="block-surface"><div className="flex items-center gap-2 text-[#8a741f]"><ShieldCheck size={20} /><h3 className="block-title">{block.title}</h3></div><div className="mt-4 grid min-h-40 place-items-center rounded-xl border border-dashed border-[var(--border)] bg-[#fffdf3] p-6 text-center text-sm leading-6 text-[#70662f]">{block.description}<br /><span className="mt-3 inline-block rounded-lg border border-[var(--border)] bg-white px-3 py-2">Baterai → Sakelar → Lampu → Baterai</span></div></div>;
      case "image-hotspot": return <ImageHotspotBlock key={block.id} {...block} />;
      default: return <div key={(block as ContentBlock).id} className="block-surface flex items-center gap-3"><ImageIcon /><Music2 />Konten interaktif</div>;
    }
  })}</div>;
}
