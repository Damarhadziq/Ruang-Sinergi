"use client";

import { useState } from "react";
import { CheckCircle2, Circle, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuizBlock({ question, options, answer }: { question: string; options: string[]; answer: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === answer;

  function selectOption(index: number) {
    setSelected(index);
    setSubmitted(false);
  }

  function resetQuiz() {
    setSelected(null);
    setSubmitted(false);
  }

  return (
    <section className="block-surface bg-[#f6faf8]" aria-label={"Kuis: " + question}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold text-[#527264]">Cek pemahaman</p>
        <span className="text-[11px] font-medium text-[var(--muted-foreground)]">Latihan singkat · tidak memengaruhi nilai</span>
      </div>

      <h3 className="block-title mt-2">{question}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Pilih satu jawaban, lalu periksa hasilnya untuk mengetahui bagian yang perlu ditinjau kembali.</p>

      <div className="mt-5 grid gap-2" role="radiogroup" aria-label="Pilihan jawaban">
        {options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrectOption = submitted && index === answer;
          const isWrongSelection = submitted && isSelected && index !== answer;

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => selectOption(index)}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 text-left text-sm leading-5 transition-colors hover:bg-[#fafcfb]",
                isSelected && !submitted && "border-[var(--focus-border)] bg-[#f8faf9]",
                isCorrectOption && "border-[#bfd3c9] text-[#315c4c]",
                isWrongSelection && "border-[#e1c5bf] text-[#8f4338]",
              )}
            >
              {isCorrectOption ? <CheckCircle2 size={17} aria-hidden="true" /> : isWrongSelection ? <XCircle size={17} aria-hidden="true" /> : <Circle size={17} className={cn("shrink-0", isSelected && "fill-[#dfe9e4] text-[#759486]")} aria-hidden="true" />}
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <Button type="button" size="sm" className="mt-5" disabled={selected === null} onClick={() => setSubmitted(true)}>
          Periksa jawaban
        </Button>
      ) : (
        <div className={cn("mt-5 rounded-xl border bg-white p-4", isCorrect ? "border-[#cfe0d7]" : "border-[#ead4cf]")} role="status" aria-live="polite">
          <div className="flex items-start gap-3">
            {isCorrect ? <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#397456]" aria-hidden="true" /> : <XCircle size={19} className="mt-0.5 shrink-0 text-[#a95d51]" aria-hidden="true" />}
            <div>
              <p className="text-sm font-semibold">{isCorrect ? "Jawaban tepat" : "Belum tepat"}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                {isCorrect ? "Bagus, kamu sudah memahami konsep utama pada bagian ini." : "Tinjau kembali penjelasan di atas, lalu coba jawab sekali lagi."}
              </p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="sm" className="mt-2 px-0 text-xs" onClick={resetQuiz}>
            <RotateCcw size={14} /> Coba lagi
          </Button>
        </div>
      )}
    </section>
  );
}