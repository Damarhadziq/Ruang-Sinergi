import { cn } from "@/lib/utils";

export function JourneyBus({ className }: { className?: string }) {
  return (
    <div className={cn("journey-bus", className)} aria-hidden="true">
      <div className="journey-bus-body"><span /><span /><b>RS</b><i /></div>
      <div className="journey-wheel journey-wheel-left" />
      <div className="journey-wheel journey-wheel-right" />
    </div>
  );
}
