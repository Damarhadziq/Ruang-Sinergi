"use client";
import { useState } from "react";
import Download from "@solar-icons/react/icons/arrows-action/Download";
import LinkRoundAngle from "@solar-icons/react/icons/text-formatting/LinkRoundAngle";
import FileText from "@solar-icons/react/icons/files/FileText";
import Gallery from "@solar-icons/react/icons/video/Gallery";
import MusicNote from "@solar-icons/react/icons/video/MusicNote";
import Play from "@solar-icons/react/icons/video/Play";
import ShieldCheck from "@solar-icons/react/icons/security/ShieldCheck";
import type { ContentBlock } from "@/types";
import { Button } from "@/components/ui/button";
import { ChecklistBlock } from "./checklist-block";
import { ReflectionBlock } from "./reflection-block";
import { CodeBlock } from "./code-block";
import { TimerBlock } from "./timer-block";
import { ImageHotspotBlock } from "./image-hotspot-block";

function Steps({ title, steps }: { title: string; steps: string[] }) { return <div className="block-surface"><h3 className="block-title">{title}</h3><ol className="mt-5 grid gap-4">{steps.map((step, i) => <li key={step} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#315c4c] text-label text-white">{i + 1}</span><p className="text-small pt-1 text-[#565852]">{step}</p></li>)}</ol></div>; }

function VideoBlock({ title, duration }: { title: string; duration: string }) {
  const [playing, setPlaying] = useState(false);
  return <div className="relative grid aspect-video place-items-center overflow-hidden rounded-2xl bg-[#202622] text-white"><div className="absolute inset-0 bg-[#344039]" /><button type="button" onClick={() => setPlaying((value) => !value)} className="media-play-button relative grid h-16 w-16 place-items-center rounded-full bg-white text-[#315c4c]" aria-label={playing ? "Jeda video" : "Putar video"} aria-pressed={playing}><Play size={24} weight="BoldDuotone" /></button><div className="text-small absolute inset-x-4 bottom-4 flex justify-between gap-3"><span>{playing ? "Sedang diputar · " : ""}{title}</span><span className="rounded-full bg-black/25 px-2 py-0.5">{duration}</span></div></div>;
}

function AudioBlock({ title, duration }: { title: string; duration: string }) {
  const [playing, setPlaying] = useState(false);
  return <div className="block-surface flex items-center gap-4"><button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Jeda audio" : "Putar audio"} aria-pressed={playing} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#805a83] text-white"><Play size={18} weight="BoldDuotone" /></button><div className="min-w-0 flex-1"><p className="text-label">{title}</p><div className={`media-wave mt-2 h-8 rounded bg-[repeating-linear-gradient(90deg,#c7abc9_0_2px,transparent_2px_6px)] opacity-70${playing ? " is-playing" : ""}`} /></div><span className="text-meta text-[#777]">{duration}</span></div>;
}

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return <div className="grid gap-6">{blocks.map((block) => {
    switch (block.block_type) {
      case "text": return <section key={block.id} className="prose-copy max-w-[880px]"><h2>{block.heading}</h2><p>{block.body}</p></section>;
      case "image": return <figure key={block.id}><img loading="lazy" decoding="async" src={block.src} alt={block.alt} className="w-full rounded-2xl" /><figcaption className="text-meta mt-2 text-center text-[#777]">{block.caption}</figcaption></figure>;
      case "gallery": return <div key={block.id} className="grid grid-cols-2 gap-3">{block.images.map((image) => <div key={image.src} className="group overflow-hidden rounded-2xl"><img loading="lazy" decoding="async" src={image.src} alt={image.alt} className="aspect-square w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]" /></div>)}</div>;
      case "video": return <VideoBlock key={block.id} title={block.title} duration={block.duration} />;
      case "audio": return <AudioBlock key={block.id} title={block.title} duration={block.duration} />;
      case "document": return <div key={block.id} className="block-surface flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#f1eee9] text-[#76574b]"><FileText size={22} weight="BoldDuotone" /></span><div className="flex-1"><p className="text-label">{block.title}</p><p className="text-small text-[#777]">PDF · {block.pages} halaman</p></div><Button variant="outline" size="sm"><Download size={16} weight="BoldDuotone" /> Unduh</Button></div>;
      case "steps": return <Steps key={block.id} {...block} />;
      case "checklist": return <ChecklistBlock key={block.id} {...block} />;
      case "quiz": return null;
      case "reflection": return <ReflectionBlock key={block.id} {...block} />;
      case "code": return <CodeBlock key={block.id} {...block} />;
      case "flowchart": return <div key={block.id} className="block-surface"><h3 className="block-title">{block.title}</h3><div className="mt-5 flex flex-wrap items-center justify-center gap-2">{block.nodes.map((node, i) => <div key={node} className="flex items-center gap-2"><span className="rounded-xl border border-[var(--border)] bg-[#f3f8f5] px-4 py-2 text-label text-[#315c4c]">{node}</span>{i < block.nodes.length - 1 && <span className="text-[#8da297]">→</span>}</div>)}</div></div>;
      case "timer": return <TimerBlock key={block.id} {...block} />;
      case "embed": return <div key={block.id} className="block-surface text-center"><LinkRoundAngle size={22} weight="BoldDuotone" className="mx-auto text-[#315c4c]" /><h3 className="text-label mt-3">{block.title}</h3><Button className="mt-4" variant="outline">Buka simulasi</Button></div>;
      case "diagram": return <div key={block.id} className="block-surface"><div className="flex items-center gap-2 text-[#8a741f]"><ShieldCheck size={21} weight="BoldDuotone" /><h3 className="block-title">{block.title}</h3></div><div className="mt-4 grid min-h-40 place-items-center rounded-xl border border-dashed border-[var(--border)] bg-[#fffdf3] p-6 text-center text-small text-[#70662f]">{block.description}<br /><span className="mt-3 inline-block rounded-lg border border-[var(--border)] bg-white px-3 py-2">Baterai → Sakelar → Lampu → Baterai</span></div></div>;
      case "image-hotspot": return <ImageHotspotBlock key={block.id} {...block} />;
      default: return <div key={(block as ContentBlock).id} className="block-surface flex items-center gap-3"><Gallery size={21} weight="BoldDuotone" /><MusicNote size={21} weight="BoldDuotone" />Konten interaktif</div>;
    }
  })}</div>;
}
