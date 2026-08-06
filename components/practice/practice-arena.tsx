"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ImageIcon,
  ListChecks,
  RotateCcw,
  Sparkles,
  Star,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { practiceSets, type PracticeQuestion, type PracticeSet } from "@/data/practice-data";

const icons = { zap: Zap, image: ImageIcon, list: ListChecks };
const confetti = [
  { x: -132, y: -38, color: "#6657c7", rotate: 18 },
  { x: -102, y: 42, color: "#e6a532", rotate: 52 },
  { x: -66, y: -70, color: "#2f879b", rotate: 90 },
  { x: -34, y: 58, color: "#d16f64", rotate: 130 },
  { x: 34, y: -68, color: "#397456", rotate: 24 },
  { x: 72, y: 54, color: "#6657c7", rotate: 72 },
  { x: 106, y: -26, color: "#e6a532", rotate: 112 },
  { x: 136, y: 36, color: "#2f879b", rotate: 156 },
];

function arraysEqual(first: string[], second: string[]) {
  return first.length === second.length && first.every((item, index) => item === second[index]);
}

function answerIsCorrect(question: PracticeQuestion, selected: number | null, order: string[]) {
  return question.kind === "sequence" ? arraysEqual(order, question.answer) : selected === question.answer;
}

export function PracticeArena() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  const activeSet = useMemo(() => practiceSets.find((set) => set.id === activeId) ?? null, [activeId]);
  const question = activeSet?.questions[questionIndex];

  function resetQuestionState() {
    setSelected(null);
    setOrder([]);
    setSubmitted(false);
  }

  function start(set: PracticeSet) {
    setActiveId(set.id);
    setQuestionIndex(0);
    setScore(0);
    setComplete(false);
    resetQuestionState();
  }

  function leave() {
    setActiveId(null);
    setComplete(false);
    setQuestionIndex(0);
    setScore(0);
    resetQuestionState();
  }

  function submit() {
    if (!question) return;
    const ready = question.kind === "sequence" ? order.length === question.answer.length : selected !== null;
    if (!ready || submitted) return;
    const correct = answerIsCorrect(question, selected, order);
    if (correct) setScore((value) => value + 1);
    setSubmitted(true);
  }

  function next() {
    if (!activeSet) return;
    if (questionIndex === activeSet.questions.length - 1) {
      setComplete(true);
      return;
    }
    setQuestionIndex((value) => value + 1);
    resetQuestionState();
  }

  if (!activeSet || !question) return <PracticePicker onStart={start} />;
  if (complete) return <PracticeComplete set={activeSet} score={score} onReplay={() => start(activeSet)} onLeave={leave} reduceMotion={Boolean(reduceMotion)} />;

  const correct = answerIsCorrect(question, selected, order);
  const canSubmit = question.kind === "sequence" ? order.length === question.answer.length : selected !== null;
  const progress = ((questionIndex + (submitted ? 1 : 0)) / activeSet.questions.length) * 100;

  return (
    <section aria-label={"Sesi latihan " + activeSet.title}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="ghost" size="sm" className="-ml-3 text-xs" onClick={leave}><ArrowLeft size={15} />Ganti mode</Button>
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)]">
          <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">Skor {score}</span>
          <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5">+{activeSet.xp} XP</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium text-[var(--muted-foreground)]">
          <span>Soal {questionIndex + 1} dari {activeSet.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#eeefed]" role="progressbar" aria-label="Progres latihan" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
          <motion.div className="h-full rounded-full" style={{ backgroundColor: activeSet.accent }} animate={{ width: progress + "%" }} transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white"
        >
          {question.kind === "visual" && question.image && <img src={question.image} alt="Petunjuk visual untuk soal" className="aspect-[16/6] w-full object-cover sm:aspect-[16/5]" />}

          <div className="p-5 sm:p-7">
            <Badge className="mb-4" style={{ backgroundColor: activeSet.soft, color: activeSet.accent }}>{question.eyebrow}</Badge>
            <h2 className="max-w-3xl font-heading text-[22px] font-bold leading-[1.3] tracking-[-0.02em] sm:text-[26px]">{question.prompt}</h2>

            {question.kind === "sequence" ? (
              <SequenceAnswer question={question} order={order} setOrder={setOrder} submitted={submitted} correct={correct} accent={activeSet.accent} soft={activeSet.soft} />
            ) : (
              <ChoiceAnswer question={question} selected={selected} setSelected={setSelected} submitted={submitted} accent={activeSet.accent} soft={activeSet.soft} />
            )}

            <AnimatePresence initial={false}>
              {submitted && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  aria-live="polite"
                  className={cn("mt-5 flex items-start gap-3 rounded-xl border p-4", correct ? "border-[#cfe0d7] bg-[#f7fbf8]" : "border-[#ead4cf] bg-[#fdf9f8]")}
                >
                  {correct ? <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#397456]" /> : <XCircle size={20} className="mt-0.5 shrink-0 text-[#a95d51]" />}
                  <div><p className="text-sm font-semibold">{correct ? "Mantap, jawabanmu tepat!" : "Belum tepat, tetap lanjutkan."}</p><p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">{question.explanation}</p></div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex justify-end">
              {!submitted ? (
                <Button type="button" disabled={!canSubmit} onClick={submit} style={{ backgroundColor: activeSet.accent }}>Periksa jawaban</Button>
              ) : (
                <Button type="button" onClick={next} style={{ backgroundColor: activeSet.accent }}>{questionIndex === activeSet.questions.length - 1 ? "Lihat hasil" : "Soal berikutnya"}<ArrowRight size={16} /></Button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function PracticePicker({ onStart }: { onStart: (set: PracticeSet) => void }) {
  const featured = practiceSets[0];
  return (
    <section>
      <div className="grid overflow-hidden rounded-2xl border border-[#dfdaf8] bg-[#f8f7ff] lg:grid-cols-[1fr_280px]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6657c7]"><Sparkles size={16} />Misi pilihan hari ini</div>
          <h2 className="mt-4 max-w-xl font-heading text-2xl font-bold tracking-[-0.02em] sm:text-[30px]">{featured.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted-foreground)]">{featured.description}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dfdaf8] bg-white px-3 py-1.5"><ListChecks size={14} />{featured.questions.length} soal</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dfdaf8] bg-white px-3 py-1.5"><Clock3 size={14} />{featured.duration} menit</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dfdaf8] bg-white px-3 py-1.5"><Zap size={14} />+{featured.xp} XP</span>
          </div>
          <Button type="button" className="mt-6 bg-[#6657c7] hover:bg-[#5849b6]" onClick={() => onStart(featured)}>Mulai misi<ArrowRight size={16} /></Button>
        </div>
        <div className="relative grid min-h-52 place-items-center overflow-hidden border-t border-[#dfdaf8] bg-[#eeeafd] lg:border-l lg:border-t-0" aria-hidden="true">
          <div className="absolute left-8 top-8 h-8 w-8 rotate-12 rounded-lg bg-[#e8aa42]" />
          <div className="absolute bottom-8 right-8 h-6 w-6 rounded-full bg-[#54a69a]" />
          <div className="absolute right-12 top-10 h-4 w-12 -rotate-12 rounded-full bg-[#d77b70]" />
          <div className="grid h-28 w-28 place-items-center rounded-[28px] border border-[#d8d0fa] bg-white text-[#6657c7]"><Trophy size={48} strokeWidth={1.8} /></div>
        </div>
      </div>

      <div className="mb-5 mt-12 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold text-[var(--primary)]">Pilih tantangan</p><h2 className="mt-2 font-heading text-2xl font-bold">Mode latihan</h2></div><span className="hidden text-xs text-[var(--muted-foreground)] sm:block">Progres tersimpan selama sesi berlangsung</span></div>
      <div className="grid gap-5 md:grid-cols-2">
        {practiceSets.map((set) => {
          const Icon = icons[set.icon];
          return (
            <article key={set.id} className="flex min-h-64 flex-col rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ backgroundColor: set.soft, color: set.accent }}><Icon size={21} /></span>
                <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-semibold text-[var(--muted-foreground)]">+{set.xp} XP</span>
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold">{set.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted-foreground)]">{set.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                <span className="text-xs text-[var(--muted-foreground)]">{set.questions.length} soal · {set.duration} menit</span>
                <Button type="button" variant="ghost" size="sm" className="-mr-2" onClick={() => onStart(set)}>Mainkan<ArrowRight size={15} /></Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ChoiceAnswer({ question, selected, setSelected, submitted, accent, soft }: { question: Exclude<PracticeQuestion, { kind: "sequence" }>; selected: number | null; setSelected: (value: number) => void; submitted: boolean; accent: string; soft: string }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Pilihan jawaban">
      {question.options.map((option, index) => {
        const chosen = selected === index;
        const correctOption = submitted && index === question.answer;
        const wrongOption = submitted && chosen && index !== question.answer;
        return (
          <motion.button
            whileTap={submitted ? undefined : { scale: 0.985 }}
            key={option}
            type="button"
            role="radio"
            aria-checked={chosen}
            disabled={submitted}
            onClick={() => setSelected(index)}
            className={cn("min-h-14 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-left text-sm font-medium leading-5 transition-colors", !submitted && "hover:bg-[#fafbfa]", correctOption && "border-[#a9c8b8] bg-[#f5faf7] text-[#315c4c]", wrongOption && "border-[#dfbbb4] bg-[#fdf8f7] text-[#91483e]")}
            style={chosen && !submitted ? { borderColor: accent, backgroundColor: soft } : undefined}
          >
            <span className="flex items-center gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-[11px] font-bold">{String.fromCharCode(65 + index)}</span>{option}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function SequenceAnswer({ question, order, setOrder, submitted, correct, accent, soft }: { question: Extract<PracticeQuestion, { kind: "sequence" }>; order: string[]; setOrder: (value: string[]) => void; submitted: boolean; correct: boolean; accent: string; soft: string }) {
  const remaining = question.items.filter((item) => !order.includes(item));
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs font-semibold text-[var(--muted-foreground)]">Jawabanmu · klik langkah untuk membatalkan</p>
      <div className={cn("min-h-24 rounded-xl border border-dashed border-[var(--border)] bg-[#fafbfa] p-3", submitted && (correct ? "border-[#a9c8b8]" : "border-[#dfbbb4]"))}>
        {order.length === 0 ? <p className="grid min-h-16 place-items-center text-center text-sm text-[#989b95]">Pilih langkah dari daftar di bawah</p> : <div className="grid gap-2">{order.map((item, index) => <motion.button layout type="button" disabled={submitted} key={item} onClick={() => setOrder(order.filter((entry) => entry !== item))} className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-left text-sm"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: accent }}>{index + 1}</span>{item}</motion.button>)}</div>}
      </div>
      {!submitted && remaining.length > 0 && <div className="mt-3 grid gap-2 sm:grid-cols-2">{remaining.map((item) => <motion.button layout whileTap={{ scale: 0.985 }} type="button" key={item} onClick={() => setOrder([...order, item])} className="rounded-xl border border-[var(--border)] px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#fafbfa]" style={{ backgroundColor: soft }}>{item}</motion.button>)}</div>}
    </div>
  );
}

function PracticeComplete({ set, score, onReplay, onLeave, reduceMotion }: { set: PracticeSet; score: number; onReplay: () => void; onLeave: () => void; reduceMotion: boolean }) {
  const ratio = score / set.questions.length;
  const stars = ratio === 1 ? 3 : ratio >= 0.6 ? 2 : 1;
  const earnedXp = Math.round(set.xp * ratio);
  return (
    <motion.section initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white px-5 py-12 text-center sm:px-8 sm:py-16">
      <div className="relative mx-auto w-fit">
        {!reduceMotion && confetti.map((piece, index) => <motion.span key={index} className="absolute left-1/2 top-1/2 h-2 w-3 rounded-sm" style={{ backgroundColor: piece.color }} initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }} animate={{ x: piece.x, y: piece.y, opacity: [0, 1, 1], rotate: piece.rotate }} transition={{ delay: 0.15 + index * 0.035, duration: 0.55, ease: "easeOut" }} />)}
        <div className="relative grid h-24 w-24 place-items-center rounded-[26px] border" style={{ borderColor: set.accent, backgroundColor: set.soft, color: set.accent }}><Trophy size={42} /></div>
      </div>
      <div className="mt-6 flex justify-center gap-1.5" aria-label={stars + " dari 3 bintang"}>{[0, 1, 2].map((index) => <Star key={index} size={24} className={index < stars ? "fill-[#e7a936] text-[#e7a936]" : "text-[#d9dbd7]"} />)}</div>
      <p className="mt-5 text-xs font-semibold" style={{ color: set.accent }}>Misi selesai</p>
      <h2 className="mt-2 font-heading text-3xl font-bold tracking-[-0.03em]">{score} dari {set.questions.length} jawaban tepat</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted-foreground)]">Kamu mendapatkan <strong className="text-[var(--foreground)]">{earnedXp} XP</strong>. Ulangi latihan untuk memperbaiki skor atau pilih tantangan lain.</p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button type="button" onClick={onReplay} style={{ backgroundColor: set.accent }}><RotateCcw size={16} />Main lagi</Button><Button type="button" variant="outline" onClick={onLeave}>Pilih mode lain</Button></div>
    </motion.section>
  );
}
