import { useMemo } from 'react';

interface HeatmapGridProps {
  data: { date: string; count: number }[];
}

const LEVELS = [
  'bg-muted',
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/60',
  'bg-primary/80',
];

export function HeatmapGrid({ data }: HeatmapGridProps) {
  const weeks = useMemo(() => {
    const result: { date: string; count: number }[][] = [];
    let week: { date: string; count: number }[] = [];
    data.forEach((d, i) => {
      week.push(d);
      if ((i + 1) % 7 === 0 || i === data.length - 1) {
        result.push(week);
        week = [];
      }
    });
    return result;
  }, [data]);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px] min-w-[700px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={di}
                className={`h-3 w-3 rounded-sm ${LEVELS[Math.min(day.count, 4)]} transition-colors`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        {LEVELS.map((l, i) => <div key={i} className={`h-3 w-3 rounded-sm ${l}`} />)}
        <span>More</span>
      </div>
    </div>
  );
}
