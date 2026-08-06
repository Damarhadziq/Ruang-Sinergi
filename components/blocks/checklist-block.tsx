"use client";
import { Check } from "lucide-react";
import { useState } from "react";
export function ChecklistBlock({ title, items }: { title: string; items: string[] }) {
  const [checked, setChecked] = useState<number[]>([]);
  return <div className="block-surface"><h3 className="block-title">{title}</h3><div className="mt-4 grid gap-2">{items.map((item, index) => { const active = checked.includes(index); return <button key={item} onClick={() => setChecked(active ? checked.filter((i) => i !== index) : [...checked, index])} className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white p-3 text-left text-sm hover:bg-[#fafaf7]"><span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${active ? "border-[#315c4c] bg-[#315c4c] text-white" : "border-[var(--border)]"}`}>{active && <Check size={13} />}</span><span className={active ? "text-[#777] line-through" : ""}>{item}</span></button>; })}</div></div>;
}

