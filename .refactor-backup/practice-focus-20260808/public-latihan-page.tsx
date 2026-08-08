import { PracticeArena } from "@/components/practice/practice-arena";

export default function PracticePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 md:px-6 lg:px-8 lg:pt-12">
        <header className="pb-12 lg:pb-14">
          <h1 className="font-heading text-[32px] font-bold leading-[1.15] tracking-[-0.025em] sm:text-4xl lg:text-[40px]">Latihan interaktif</h1>
        </header>
        <PracticeArena />
      </div>
    </main>
  );
}