import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: string;
  height?: string;
}

export function ProgressBar({ value, max = 100, className, color = 'var(--accent)', height = 'h-2' }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className={cn('w-full bg-subtle rounded-full overflow-hidden', height, className)}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}
