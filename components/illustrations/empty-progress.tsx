import { Check, MapPin } from "lucide-react";
import { JourneyBus } from "./bus";

export function EmptyProgress() {
  return <div className="empty-progress-illustration" aria-hidden="true"><JourneyBus /><span className="empty-progress-road" /><span className="empty-progress-pin"><MapPin size={20} /></span><span className="empty-progress-check"><Check size={16} /></span></div>;
}
