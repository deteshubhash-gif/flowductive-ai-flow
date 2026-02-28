import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';
import { toast } from 'sonner';

export default function FocusTimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setSessions(prev => prev + 1);
      toast.success('🎉 Focus session completed! Great work!');
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const toggle = () => setIsRunning(!isRunning);
  const reset = () => { setIsRunning(false); setTimeLeft(25 * 60); };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Focus Timer</h1>
        <p className="text-muted-foreground">Stay focused with the Pomodoro technique</p>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 flex flex-col items-center">
            <div className="relative h-64 w-64 mb-8">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold tabular-nums">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
                <span className="text-sm text-muted-foreground mt-1">{isRunning ? 'Focus time' : 'Ready'}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="glow" size="lg" onClick={toggle} className="gap-2">
                {isRunning ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start</>}
              </Button>
              <Button variant="outline" size="lg" onClick={reset} className="gap-2">
                <RotateCcw className="h-4 w-4" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /> Sessions Completed</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-primary">{sessions}</span>
              <span className="text-muted-foreground">focus sessions today</span>
            </div>
            <div className="flex gap-2 mt-4">
              {Array.from({ length: Math.min(sessions, 8) }).map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-primary" />
              ))}
              {Array.from({ length: Math.max(0, 8 - sessions) }).map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-muted" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
