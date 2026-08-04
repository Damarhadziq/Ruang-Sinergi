"use client";
import { Bookmark, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export function MaterialActions({ slug }: { slug: string }) { const [saved, setSaved] = useState(false); useEffect(() => setSaved(localStorage.getItem(`saved-${slug}`) === "yes"), [slug]); return <div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => navigator.share?.({ title: document.title, url: location.href })}><Share2 size={15} /> Bagikan</Button><Button variant={saved ? "secondary" : "outline"} size="sm" onClick={() => { const next = !saved; setSaved(next); localStorage.setItem(`saved-${slug}`, next ? "yes" : "no"); }}><Bookmark size={15} fill={saved ? "currentColor" : "none"} /> {saved ? "Tersimpan" : "Simpan"}</Button></div>; }

