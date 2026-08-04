"use client";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
export function QuizBlock({ question, options, answer }: { question: string; options: string[]; answer: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  return <div className="block-surface border-[#dbe7e1] bg-[#f6faf8]"><p className="mb-2 text-xs font-bold text-[#527264]">Cek pemahaman</p><h3 className="block-title">{question}</h3><div className="mt-4 grid gap-2">{options.map((option, index) => <button key={option} onClick={() => setSelected(index)} className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm transition ${selected === index ? index === answer ? "border-[#6f9b85] bg-white text-[#315c4c]" : "border-[#c98679] bg-white text-[#8f4338]" : "border-[#dde5e0] bg-white hover:border-[#a9beb3]"}`}>{selected === index ? <CheckCircle2 size={18} /> : <Circle size={18} />} {option}</button>)}</div>{selected !== null && <p className="mt-3 text-sm font-medium">{selected === answer ? "Tepat! Kamu sudah memahami konsep utamanya." : "Belum tepat. Coba tinjau materi di atas sekali lagi."}</p>}</div>;
}

