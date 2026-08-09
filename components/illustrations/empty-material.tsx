import { BookOpen, SearchX } from "lucide-react";

export function EmptyMaterial() {
  return <div className="empty-illustration" aria-hidden="true"><span className="empty-illustration-book"><BookOpen size={34} /></span><span className="empty-illustration-search"><SearchX size={25} /></span><i /><i /><i /></div>;
}
