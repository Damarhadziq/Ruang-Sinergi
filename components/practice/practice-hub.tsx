"use client";

import { lazy, Suspense, useEffect, useMemo, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DirectionArrowLeft, DirectionArrowRight } from "@/components/ui/direction-icon";
import CheckCircle from "@solar-icons/react/icons/ui/CheckCircle";
import ClockCircle from "@solar-icons/react/icons/time/ClockCircle";
import Magnifier from "@solar-icons/react/icons/search/Magnifier";
import Star from "@solar-icons/react/icons/like/Star";
import CupStar from "@solar-icons/react/icons/ui/CupStar";
import CloseCircle from "@solar-icons/react/icons/ui/CloseCircle";
import Bolt from "@solar-icons/react/icons/ui/Bolt";
import { cn } from "@/lib/utils";
import { DepartmentIcon } from "@/components/department-icon";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";

import {
  practiceDepartments,
  type PracticeDepartment,
  type PracticeExercise,
  type PracticeQuestion,
} from "@/data/practice-library";

const ManualPracticeAnimation = lazy(() => import("@/components/practice/manual-practice-animation").then((module) => ({ default: module.ManualPracticeAnimation })));

const STORAGE_KEY = "ruang-sinergi:latihan-selesai:v1";
const EXERCISES_PER_PAGE = 2;
function BrowseShell({ children }: { children: ReactNode }) {
  return <div className="practice-shell practice-browse-shell flex min-h-screen flex-col text-[#15315b]"><SiteHeader /><main className="mx-auto w-full max-w-7xl flex-1 px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-11">{children}</main><Footer /></div>;
}

function FocusShell({ children }: { children: ReactNode }) {
  return <main className="practice-shell practice-focus-shell min-h-screen px-4 py-6 text-[#15315b] sm:px-6 sm:py-8 lg:px-8 lg:py-10"><div className="mx-auto w-full max-w-5xl">{children}</div></main>;
}

function sameOrder(first: string[], second: string[]) {
  return first.length === second.length && first.every((item, index) => item === second[index]);
}

function isCorrectAnswer(question: PracticeQuestion, selected: number | null, order: string[]) {
  return question.kind === "sequence" ? sameOrder(order, question.answer) : selected === question.answer;
}

export function PracticeHub() {
  const reduceMotion = useReducedMotion();
  const [department, setDepartment] = useState<PracticeDepartment | null>(null);
  const [exercise, setExercise] = useState<PracticeExercise | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) setCompleted(stored.filter((item): item is string => typeof item === "string"));
    } catch {
      setCompleted([]);
    }
  }, []);

  function saveCompleted(slug: string) {
    setCompleted((current) => {
      const next = current.includes(slug) ? current : [...current, slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function resetQuestion() {
    setSelected(null);
    setOrder([]);
    setSubmitted(false);
  }

  function startExercise(nextExercise: PracticeExercise) {
    setExercise(nextExercise);
    setQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    resetQuestion();
  }

  function openDepartment(nextDepartment: PracticeDepartment) {
    setDepartment(nextDepartment);
    setExercise(null);
    setShowResult(false);
  }

  function returnToDepartments() {
    setDepartment(null);
    setExercise(null);
    setShowResult(false);
  }

  function returnToExercises() {
    setExercise(null);
    setShowResult(false);
    setQuestionIndex(0);
    resetQuestion();
  }

  if (!department) return <BrowseShell><DepartmentLanding completed={completed} onOpen={openDepartment} reduceMotion={Boolean(reduceMotion)} /></BrowseShell>;
  if (!exercise) return <BrowseShell><ExerciseLibrary department={department} completed={completed} onBack={returnToDepartments} onStart={startExercise} /></BrowseShell>;
  if (showResult) return <FocusShell><ResultScreen department={department} exercise={exercise} score={score} onReplay={() => startExercise(exercise)} onBack={returnToExercises} reduceMotion={Boolean(reduceMotion)} /></FocusShell>;

  const question = exercise.questions[questionIndex];
  const correct = isCorrectAnswer(question, selected, order);
  const ready = question.kind === "sequence" ? order.length === question.answer.length : selected !== null;

  function submitAnswer() {
    if (!ready || submitted) return;
    if (correct) setScore((value) => value + 1);
    setSubmitted(true);
  }

  function nextQuestion() {
    if (questionIndex === exercise.questions.length - 1) {
      saveCompleted(exercise.slug);
      setShowResult(true);
      return;
    }
    setQuestionIndex((value) => value + 1);
    resetQuestion();
  }

  return (
    <FocusShell><FocusedSession
      department={department}
      exercise={exercise}
      question={question}
      questionIndex={questionIndex}
      score={score}
      selected={selected}
      order={order}
      submitted={submitted}
      correct={correct}
      ready={ready}
      reduceMotion={Boolean(reduceMotion)}
      onSelect={setSelected}
      onOrder={setOrder}
      onSubmit={submitAnswer}
      onNext={nextQuestion}
      onExit={returnToExercises}
    /></FocusShell>
  );
}

function DepartmentLanding({ completed, onOpen, reduceMotion }: { completed: string[]; onOpen: (department: PracticeDepartment) => void; reduceMotion: boolean }) {
  const totalExercises = practiceDepartments.reduce((total, department) => total + department.exercises.length, 0);
  return (
    <div>

      <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
        <div className="py-4 sm:py-7 lg:py-10">
          <h1 className="text-page-title max-w-2xl text-[#15315b]">Pilih jurusan,<br />mulai tantangan.</h1>
          <p className="text-body-lg mt-5 max-w-prose text-[#58708f]">Setiap bidang memiliki latihan pendek dengan visual, skenario, dan susun langkah. Pilih bidangmu dan kumpulkan XP.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="practice-pill"><CupStar size={15} weight="BoldDuotone" />{completed.length} selesai</span>
            <span className="practice-pill"><Bolt size={15} weight="BoldDuotone" />{totalExercises} tantangan</span>
            <span className="practice-pill"><ClockCircle size={15} weight="BoldDuotone" />3–6 menit</span>
          </div>
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-[14px] bg-[#eaf4ff] lg:min-h-80">
          <div className="relative h-full min-h-72 w-full lg:min-h-80">
            <Suspense fallback={<div className="skeleton-shimmer h-full w-full" role="status" aria-label="Memuat animasi" />}><ManualPracticeAnimation /></Suspense>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6"><h2 className="text-section-title text-[#15315b]">Mau latihan bidang apa hari ini?</h2></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {practiceDepartments.map((department, index) => {
            const done = department.exercises.filter((exercise) => completed.includes(exercise.slug)).length;
            return (
              <motion.article
                key={department.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.045 }}
                className="practice-card action-button-card flex min-h-60 flex-col rounded-[20px] border border-[#ececec] bg-white p-5 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <DepartmentIcon slug={department.slug} className="h-12 w-12" />
                  <span className="text-badge rounded-full bg-[#f1f6fc] px-2.5 py-1 text-[#66809f]">{done}/{department.exercises.length} selesai</span>
                </div>
                <h3 className="text-card-title mt-5 text-[#15315b]">{department.shortName}</h3>
                <p className="text-body mt-2 line-clamp-2 flex-1 text-[#687e99]">{department.summary}</p>
                <PrimaryButton className="ml-auto mt-5 h-9 w-fit px-3.5" onClick={() => onOpen(department)}>Lihat latihan <DirectionArrowRight size={14} /></PrimaryButton>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ExerciseLibrary({ department, completed, onBack, onStart }: { department: PracticeDepartment; completed: string[]; onBack: () => void; onStart: (exercise: PracticeExercise) => void }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => department.exercises.filter((exercise) => (exercise.title + " " + exercise.description).toLowerCase().includes(query.toLowerCase())), [department.exercises, query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / EXERCISES_PER_PAGE));
  const visibleExercises = filtered.slice((page - 1) * EXERCISES_PER_PAGE, page * EXERCISES_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [department.slug, query]);
  const completedCount = department.exercises.filter((exercise) => completed.includes(exercise.slug)).length;

  return (
    <div>
      <div className="mb-8">
        <SoftButton className="h-10 w-10 px-0" onClick={onBack} aria-label="Kembali ke semua jurusan" title="Kembali ke semua jurusan"><DirectionArrowLeft size={17} /></SoftButton>
      </div>

      <section className="practice-card overflow-hidden rounded-[24px] border border-[#cfe0f7] bg-white">
        <div className="grid md:grid-cols-[210px_1fr]">
          <img loading="lazy" decoding="async" src={department.image} alt="" className="h-full min-h-44 w-full object-cover" />
          <div className="p-6 sm:p-8">
            
            <h1 className="text-section-title text-[#15315b]">Pilih latihanmu</h1>
            <div className="text-meta mt-4 flex flex-wrap items-center gap-3 text-[#66809f]"><span>{completedCount} dari {department.exercises.length} selesai</span><span aria-hidden="true">·</span><span>Kumpulkan XP setiap selesai</span></div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5eef9]" role="progressbar" aria-label="Progres latihan jurusan" aria-valuemin={0} aria-valuemax={department.exercises.length} aria-valuenow={completedCount}><div className="h-full rounded-full bg-[#2476f3] transition-[width]" style={{ width: (completedCount / department.exercises.length) * 100 + "%" }} /></div>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-section-title text-[#15315b]">Daftar latihan</h2>
        <label className="relative block w-full sm:max-w-xs"><span className="sr-only">Cari latihan</span><Magnifier size={16} weight="BoldDuotone" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7390b2]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari latihan" className="text-control practice-control h-11 w-full rounded-[10px] border border-[#cbdcf1] bg-white pl-10 pr-3 text-[#15315b] outline-none placeholder:text-[#8aa0ba]" /></label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {visibleExercises.map((exercise, index) => {
          const done = completed.includes(exercise.slug);
          return (
            <article key={exercise.slug} className="practice-card flex min-h-64 flex-col rounded-[20px] border border-[#d6e4f6] bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4"><span className="text-badge shiny-chip rounded-full border border-[#ececec] bg-[#eff6ff] px-2.5 py-1 text-[#286fd1]">Latihan {(page - 1) * EXERCISES_PER_PAGE + index + 1}</span>{done && <span className="text-badge shiny-chip inline-flex items-center gap-1.5 rounded-full border border-[#ececec] bg-[#e7f8ef] px-2.5 py-1 text-[#287451]"><CheckCircle size={14} weight="BoldDuotone" />Selesai</span>}</div>
              <h3 className="text-card-title mt-5 text-[#15315b]">{exercise.title}</h3>
              <p className="text-body mt-2 line-clamp-2 flex-1 text-[#687e99]">{exercise.description}</p>
              <div className="text-meta mt-5 flex flex-wrap gap-2 text-[#66809f]"><span className="practice-mini-pill">{exercise.questions.length} soal</span><span className="practice-mini-pill">{exercise.duration} menit</span><span className="practice-mini-pill">+{exercise.xp} XP</span></div>
              <p className="text-meta mt-4 text-[#7690ae]">{exercise.format}</p>
              <PrimaryButton className="ml-auto mt-5 h-9 w-fit px-3.5" onClick={() => onStart(exercise)}>{done ? "Main lagi" : "Mulai latihan"}<DirectionArrowRight size={16} /></PrimaryButton>
            </article>
          );
        })}
      </div>
      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

type SessionProps = {
  department: PracticeDepartment;
  exercise: PracticeExercise;
  question: PracticeQuestion;
  questionIndex: number;
  score: number;
  selected: number | null;
  order: string[];
  submitted: boolean;
  correct: boolean;
  ready: boolean;
  reduceMotion: boolean;
  onSelect: (value: number) => void;
  onOrder: (value: string[]) => void;
  onSubmit: () => void;
  onNext: () => void;
  onExit: () => void;
};

function FocusedSession(props: SessionProps) {
  const { department, exercise, question, questionIndex, score, selected, order, submitted, correct, ready, reduceMotion, onSelect, onOrder, onSubmit, onNext, onExit } = props;
  const progress = ((questionIndex + (submitted ? 1 : 0)) / exercise.questions.length) * 100;
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between gap-3"><SoftButton className="h-10 w-10 px-0" onClick={onExit} aria-label="Kembali ke daftar latihan" title="Kembali ke daftar latihan"><DirectionArrowLeft size={17} /></SoftButton><div className="flex gap-2"><span className="practice-pill">Skor {score}</span><span className="practice-pill">+{exercise.xp} XP</span></div></div>
      <div className="mb-5"><div className="text-meta mb-2 flex justify-between text-[#66809f]"><span>{department.shortName} · {exercise.title}</span><span>{questionIndex + 1}/{exercise.questions.length}</span></div><div className="h-3 overflow-hidden rounded-full border border-[#c9dcf3] bg-[#e5eef9] p-0.5"><motion.div className="h-full rounded-full bg-[#2476f3]" animate={{ width: progress + "%" }} transition={{ duration: reduceMotion ? 0 : 0.35 }} /></div></div>

      <AnimatePresence mode="wait">
        <motion.section key={question.id} initial={reduceMotion ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }} className="practice-card overflow-hidden rounded-[24px] border border-[#cfe0f7] bg-white">
          {question.kind === "visual" && question.image && <img loading="lazy" decoding="async" src={question.image} alt="Petunjuk visual untuk soal" className="aspect-[16/6] w-full object-cover" />}
          <div className="p-5 sm:p-8">
            
            <h1 className="text-section-title max-w-3xl text-[#15315b]">{question.prompt}</h1>
            {question.kind === "sequence" ? <SequenceQuestion question={question} order={order} onOrder={onOrder} submitted={submitted} correct={correct} /> : <ChoiceQuestion question={question} selected={selected} onSelect={onSelect} submitted={submitted} />}

            <AnimatePresence initial={false}>{submitted && <motion.div role="status" aria-live="polite" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn("mt-5 flex items-start gap-3 rounded-2xl border p-4", correct ? "border-[#a8d7bf] bg-[#effaf4]" : "border-[#efbbb5] bg-[#fff5f3]")}>{correct ? <CheckCircle size={21} weight="BoldDuotone" className="mt-0.5 shrink-0 text-[#2d825a]" /> : <CloseCircle size={21} weight="BoldDuotone" className="mt-0.5 shrink-0 text-[#b44f43]" />}<div><p className="text-label text-[#15315b]">{correct ? "Hebat, jawabanmu tepat!" : "Belum tepat, tapi tetap lanjut!"}</p><p className="text-small mt-1 text-[#617895]">{question.explanation}</p></div></motion.div>}</AnimatePresence>

            <div className="mt-7 flex justify-end">{submitted ? <PrimaryButton onClick={onNext}>{questionIndex === exercise.questions.length - 1 ? "Lihat hasil" : "Lanjut"}<DirectionArrowRight size={16} /></PrimaryButton> : <PrimaryButton disabled={!ready} onClick={onSubmit}>Periksa jawaban</PrimaryButton>}</div>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

function ChoiceQuestion({ question, selected, onSelect, submitted }: { question: Exclude<PracticeQuestion, { kind: "sequence" }>; selected: number | null; onSelect: (value: number) => void; submitted: boolean }) {
  return <div className="mt-7 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Pilihan jawaban">{question.options.map((option, index) => { const chosen = selected === index; const correct = submitted && index === question.answer; const wrong = submitted && chosen && index !== question.answer; return <motion.button whileTap={submitted ? undefined : { y: 2 }} key={option} type="button" role="radio" aria-checked={chosen} disabled={submitted} onClick={() => onSelect(index)} className={cn("practice-choice min-h-16 rounded-2xl border border-[#cbdcf1] bg-white px-4 py-3 text-left text-label text-[#294563]", chosen && !submitted && "border-[#6da7f3] bg-[#edf5ff]", correct && "border-[#84c7a5] bg-[#effaf4] text-[#286c4c]", wrong && "border-[#e8a7a0] bg-[#fff5f3] text-[#9d493f]")}><span className="flex items-center gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-current text-xs">{String.fromCharCode(65 + index)}</span>{option}</span></motion.button>; })}</div>;
}

function SequenceQuestion({ question, order, onOrder, submitted, correct }: { question: Extract<PracticeQuestion, { kind: "sequence" }>; order: string[]; onOrder: (value: string[]) => void; submitted: boolean; correct: boolean }) {
  const remaining = question.items.filter((item) => !order.includes(item));
  return <div className="mt-7"><p className="text-meta mb-2 text-[#66809f]">Jawabanmu · klik untuk membatalkan</p><div className={cn("practice-control min-h-24 rounded-2xl border border-dashed border-[#bed3ec] bg-[#f8fbff] p-3", submitted && (correct ? "border-[#84c7a5]" : "border-[#e8a7a0]"))}>{order.length === 0 ? <p className="grid min-h-16 place-items-center text-center text-label text-[#8aa0ba]">Pilih langkah dari daftar di bawah</p> : <div className="grid gap-2">{order.map((item, index) => <motion.button layout type="button" disabled={submitted} key={item} onClick={() => onOrder(order.filter((entry) => entry !== item))} className="practice-choice flex items-center gap-3 rounded-[10px] border border-[#cbdcf1] bg-white px-3 py-2.5 text-left text-label text-[#294563]"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#2476f3] text-xs text-white">{index + 1}</span>{item}</motion.button>)}</div>}</div>{!submitted && remaining.length > 0 && <div className="mt-3 grid gap-2 sm:grid-cols-2">{remaining.map((item) => <motion.button layout whileTap={{ y: 2 }} type="button" key={item} onClick={() => onOrder([...order, item])} className="practice-soft-btn rounded-[10px] border border-[#cbdcf1] bg-[#eef6ff] px-3 py-3 text-left text-label text-[#245a9c]">{item}</motion.button>)}</div>}</div>;
}

function ResultScreen({ department, exercise, score, onReplay, onBack, reduceMotion }: { department: PracticeDepartment; exercise: PracticeExercise; score: number; onReplay: () => void; onBack: () => void; reduceMotion: boolean }) {
  const ratio = score / exercise.questions.length;
  const stars = ratio === 1 ? 3 : ratio >= 0.66 ? 2 : 1;
  return <div className="mx-auto max-w-3xl"><section className="practice-card overflow-hidden rounded-[26px] border border-[#cfe0f7] bg-white text-center"><div className="relative h-56 bg-[#eaf4ff]"><Suspense fallback={<div className="skeleton-shimmer h-full w-full" role="status" aria-label="Memuat animasi" />}><ManualPracticeAnimation /></Suspense></div><div className="p-6 sm:p-10"><div className="flex justify-center gap-2" aria-label={stars + " dari 3 bintang"}>{[0, 1, 2].map((index) => <motion.span key={index} initial={reduceMotion ? false : { scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.12, type: "spring" }}><Star size={30} weight="BoldDuotone" className={index < stars ? "fill-[#f4b83f] text-[#e4a72d]" : "fill-[#e7eef7] text-[#c7d5e6]"} /></motion.span>)}</div><h1 className="text-section-title mt-6 text-[#15315b]">{score} dari {exercise.questions.length} jawaban tepat</h1><p className="text-small mx-auto mt-3 max-w-prose text-[#617895]">Checklist latihan sudah tersimpan di perangkat ini. Kamu mendapatkan <strong className="text-[#15315b]">{Math.round(exercise.xp * ratio)} XP</strong>.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><PrimaryButton onClick={onReplay}>Main lagi</PrimaryButton><SoftButton onClick={onBack}>Kembali ke daftar</SoftButton></div></div></section></div>;
}


function PrimaryButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn("practice-primary-btn inline-flex h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-button text-white transition disabled:pointer-events-none disabled:opacity-45", className)} {...props}>{children}</button>;
}

function SoftButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn("practice-soft-btn inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border border-[#cbdcf1] bg-white px-3 text-button text-[#456481] transition", className)} {...props}>{children}</button>;
}
