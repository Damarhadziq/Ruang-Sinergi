"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CheckCircle from "@solar-icons/react/icons/ui/CheckCircle";
import Copy from "@solar-icons/react/icons/ui/Copy";
import Play from "@solar-icons/react/icons/video/Play";
import Restart from "@solar-icons/react/icons/arrows/Restart";
import { Button } from "@/components/ui/button";

export function CodeBlock({ language, code }: { language: string; code: string }) {
  const [value, setValue] = useState(code);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");
  const reduceMotion = useReducedMotion();

  const runCode = () => {
    setRunning(true);
    setOutput("");
    window.setTimeout(() => {
      setOutput("siapkan gelas\ntuangkan air");
      setRunning(false);
    }, reduceMotion ? 0 : 460);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-[#1f2522] text-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
        <span className="text-xs font-medium text-white/60">{language}</span>
        <div className="flex flex-wrap gap-1">
          <Button variant="ghost" size="sm" className="text-white/75 hover:bg-white/10 hover:text-white" onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1200); }}>
            {copied ? <CheckCircle size={15} weight="BoldDuotone" /> : <Copy size={15} weight="BoldDuotone" />} {copied ? "Tersalin" : "Salin"}
          </Button>
          <Button variant="ghost" size="sm" className="text-white/75 hover:bg-white/10 hover:text-white" onClick={() => { setValue(code); setOutput(""); }}><Restart size={15} weight="BoldDuotone" /> Reset</Button>
          <Button size="sm" loading={running} onClick={runCode}><Play size={15} weight="BoldDuotone" /> Jalankan</Button>
        </div>
      </div>
      <textarea aria-label={`Editor kode ${language}`} spellCheck={false} value={value} onChange={(event) => setValue(event.target.value)} className="min-h-40 w-full resize-y bg-transparent p-5 font-mono text-sm leading-7 text-[#d8e8df] outline-none focus:bg-white/[0.025]" />
      <AnimatePresence initial={false}>
        {output && <motion.pre initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border-t border-white/10 bg-black/20 p-4 text-xs leading-6 text-[#a9d5bc]">Output:{"\n"}{output}</motion.pre>}
      </AnimatePresence>
    </div>
  );
}
