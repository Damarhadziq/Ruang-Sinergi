"use client";
import CheckCircle from "@solar-icons/react/icons/ui/CheckCircle";
import Copy from "@solar-icons/react/icons/ui/Copy";
import Play from "@solar-icons/react/icons/video/Play";
import Restart from "@solar-icons/react/icons/arrows/Restart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export function CodeBlock({ language, code }: { language: string; code: string }) {
  const [value, setValue] = useState(code); const [copied, setCopied] = useState(false); const [output, setOutput] = useState("");
  return <div className="overflow-hidden rounded-2xl bg-[#1f2522] text-white"><div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><span className="text-xs font-semibold text-white/60">{language}</span><div className="flex gap-1"><Button variant="ghost" size="sm" className="text-white/75 hover:bg-white/10 hover:text-white" onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); }}>{copied ? <CheckCircle size={15} weight="BoldDuotone" /> : <Copy size={15} weight="BoldDuotone" />} Salin</Button><Button variant="ghost" size="sm" className="text-white/75 hover:bg-white/10 hover:text-white" onClick={() => { setValue(code); setOutput(""); }}><Restart size={15} weight="BoldDuotone" /> Reset</Button><Button size="sm" className="bg-[#78a98e] text-[#17241d] hover:bg-[#8fbea4]" onClick={() => setOutput("siapkan gelas\ntuangkan air")}><Play size={15} weight="BoldDuotone" /> Jalankan</Button></div></div><textarea spellCheck={false} value={value} onChange={(e) => setValue(e.target.value)} className="min-h-40 w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-[#d8e8df] outline-none" />{output && <pre className="border-t border-white/10 bg-black/20 p-4 text-xs leading-6 text-[#a9d5bc]">Output:{"\n"}{output}</pre>}</div>;
}

