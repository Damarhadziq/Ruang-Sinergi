import { BookOpen, MapPin, Signpost, Star } from "lucide-react";
import { DepartmentIcon } from "@/components/department-icon";
import { JourneyBus } from "./bus";

export function LearningJourney({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "learning-journey learning-journey-compact" : "learning-journey"} role="img" aria-label="Ilustrasi perjalanan belajar lintas bidang">
      <span className="journey-cloud journey-cloud-one" aria-hidden="true" />
      <span className="journey-cloud journey-cloud-two" aria-hidden="true" />
      <Star className="journey-star journey-star-one" size={20} aria-hidden="true" />
      <Star className="journey-star journey-star-two" size={14} aria-hidden="true" />
      <div className="journey-sign" aria-hidden="true"><Signpost size={24} /><span>Ruang Sinergi</span></div>
      <div className="journey-checkpoints" aria-hidden="true">
        <DepartmentIcon slug="informatika" className="h-11 w-11" />
        <span><BookOpen size={19} /></span>
        <DepartmentIcon slug="teknik-otomotif" className="h-11 w-11" />
        <span><MapPin size={18} /></span>
      </div>
      <div className="journey-road"><span /></div>
      <JourneyBus />
    </div>
  );
}
