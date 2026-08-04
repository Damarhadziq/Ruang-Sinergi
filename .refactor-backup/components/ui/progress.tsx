export function Progress({ value, color = "#315c4c" }: { value: number; color?: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-[#e8e9e4]" aria-label={`Progres ${value}%`}><div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} /></div>;
}

