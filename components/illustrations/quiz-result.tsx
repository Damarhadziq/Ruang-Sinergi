import { Star } from "lucide-react";
import { JourneyBus } from "./bus";

export function QuizResultIllustration({ score, total }: { score: number; total: number }) {
  const ratio = total ? score / total : 0;
  const state = ratio >= 0.8 ? "high" : ratio >= 0.5 ? "medium" : "low";
  return (
    <div className={`quiz-result-illustration quiz-result-${state}`} role="img" aria-label={ratio >= 0.8 ? "Bus belajar mencapai checkpoint" : "Bus belajar melanjutkan perjalanan menuju checkpoint"}>
      <span className="quiz-result-road" />
      <JourneyBus />
      <span className="quiz-result-checkpoint"><b>✓</b></span>
      {[0, 1, 2].map((item) => <Star key={item} size={16 + item * 2} className={`quiz-result-star quiz-result-star-${item + 1}`} aria-hidden="true" />)}
    </div>
  );
}
