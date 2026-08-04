"use client";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export function TimerBlock({ minutes, label }: { minutes: number; label: string }) { const total = minutes * 60; const [left, setLeft] = useState(total); const [running, setRunning] = useState(false); useEffect(() => { if (!running || left <= 0) return; const timer = setInterval(() => setLeft((v) => v - 1), 1000); return () => clearInterval(timer); }, [running, left]); const mm = Math.floor(left / 60).toString().padStart(2, "0"); const ss = (left % 60).toString().padStart(2, "0"); return <div className="block-surface text-center"><p className="text-sm font-semibold text-[#666862]">{label}</p><p className="my-4 font-heading text-5xl font-bold tabular-nums">{mm}:{ss}</p><div className="flex justify-center gap-2"><Button onClick={() => setRunning(!running)}>{running ? <Pause size={16} /> : <Play size={16} />} {running ? "Jeda" : "Mulai"}</Button><Button variant="outline" onClick={() => { setRunning(false); setLeft(total); }}><RotateCcw size={16} /> Ulangi</Button></div></div>; }

