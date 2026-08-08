"use client";

import { useState } from "react";
import CheckCircle from "@solar-icons/react/icons/ui/CheckCircle";
import RecordCircle from "@solar-icons/react/icons/call/RecordCircle";
import Restart from "@solar-icons/react/icons/arrows/Restart";
import CloseCircle from "@solar-icons/react/icons/ui/CloseCircle";
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
        <p className="text-meta text-[#527264]">Cek pemahaman</p>
        <span className="text-meta text-[var(--muted-foreground)]">Latihan singkat · tidak memengaruhi nilai</span>
      </div>

      <h3 className="block-title">{question}</h3>
      <p className="text-small mt-2 max-w-prose text-[var(--muted-foreground)]">Pilih satu jawaban, lalu periksa hasilnya untuk mengetahui bagian yang perlu ditinjau kembali.</p>

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
                "flex min-h-11 items-center gap-3 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 text-left text-label transition-colors hover:bg-[#fafcfb]",
                isSelected && !submitted && "border-[var(--focus-border)] bg-[#f8faf9]",
                isCorrectOption && "border-[#bfd3c9] text-[#315c4c]",
                isWrongSelection && "border-[#e1c5bf] text-[#8f4338]",
              )}
            >
              {isCorrectOption ? <CheckCircle size={18} weight="BoldDuotone" aria-hidden="true" /> : isWrongSelection ? <CloseCircle size={18} weight="BoldDuotone" aria-hidden="true" /> : <RecordCircle size={18} weight="BoldDuotone" className={cn("shrink-0", isSelected && "fill-[#dfe9e4] text-[#759486]")} aria-hidden="true" />}
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
            {isCorrect ? <CheckCircle size={20} weight="BoldDuotone" className="mt-0.5 shrink-0 text-[#397456]" aria-hidden="true" /> : <CloseCircle size={20} weight="BoldDuotone" className="mt-0.5 shrink-0 text-[#a95d51]" aria-hidden="true" />}
            <div>
              <p className="text-label">{isCorrect ? "Jawaban tepat" : "Belum tepat"}</p>
              <p className="text-small mt-1 max-w-prose text-[var(--muted-foreground)]">
                {isCorrect ? "Bagus, kamu sudah memahami konsep utama pada bagian ini." : "Tinjau kembali penjelasan di atas, lalu coba jawab sekali lagi."}
              </p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="sm" className="mt-2 px-0 text-xs" onClick={resetQuiz}>
            <Restart size={15} weight="BoldDuotone" /> Coba lagi
          </Button>
        </div>
      )}
    </section>
  );
}