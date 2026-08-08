"use client";
import Pause from "@solar-icons/react/icons/video/Pause";
import Play from "@solar-icons/react/icons/video/Play";
import Restart from "@solar-icons/react/icons/arrows/Restart";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export function TimerBlock({ minutes, label }: { minutes: number; label: string }) { const total = minutes * 60; const [left, setLeft] = useState(total); const [running, setRunning] = useState(false); useEffect(() => { if (!running || left <= 0) return; const timer = setInterval(() => setLeft((v) => v - 1), 1000); return () => clearInterval(timer); }, [running, left]); const mm = Math.floor(left / 60).toString().padStart(2, "0"); const ss = (left % 60).toString().padStart(2, "0"); return <div className="block-surface text-center"><p className="text-label text-[#666862]">{label}</p><p className="my-4 font-heading text-5xl font-semibold leading-[1.1] tracking-[-0.025em] tabular-nums">{mm}:{ss}</p><div className="flex justify-center gap-2"><Button onClick={() => setRunning(!running)}>{running ? <Pause size={17} weight="BoldDuotone" /> : <Play size={17} weight="BoldDuotone" />} {running ? "Jeda" : "Mulai"}</Button><Button variant="outline" onClick={() => { setRunning(false); setLeft(total); }}><Restart size={17} weight="BoldDuotone" /> Ulangi</Button></div></div>; }

