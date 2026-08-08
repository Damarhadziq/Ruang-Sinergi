"use client";
import Bookmark from "@solar-icons/react/icons/school/Bookmark";
import Share from "@solar-icons/react/icons/ui/Share";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export function MaterialActions({ slug }: { slug: string }) { const [saved, setSaved] = useState(false); useEffect(() => setSaved(localStorage.getItem(`saved-${slug}`) === "yes"), [slug]); return <div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => navigator.share?.({ title: document.title, url: location.href })}><Share size={16} weight="BoldDuotone" /> Bagikan</Button><Button variant={saved ? "secondary" : "outline"} size="sm" onClick={() => { const next = !saved; setSaved(next); localStorage.setItem(`saved-${slug}`, next ? "yes" : "no"); }}><Bookmark size={16} weight={saved ? "Bold" : "BoldDuotone"} /> {saved ? "Tersimpan" : "Simpan"}</Button></div>; }

