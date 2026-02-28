import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { initialDailyLogs } from '@/services/mockData';
import { Plus, Smile, Meh, Frown, Heart } from 'lucide-react';
import type { DailyLogEntry } from '@/types';
import { toast } from 'sonner';

const moodIcons: Record<string, typeof Smile> = { great: Heart, good: Smile, okay: Meh, bad: Frown };
const moodColors: Record<string, string> = { great: 'text-primary', good: 'text-chart-2', okay: 'text-chart-4', bad: 'text-destructive' };

export default function DailyLog() {
  const [logs, setLogs] = useState<DailyLogEntry[]>(initialDailyLogs);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newLog, setNewLog] = useState({ date: new Date().toISOString().split('T')[0], mood: 'good' as DailyLogEntry['mood'], productivity: 70, notes: '' });

  const addLog = () => {
    if (!newLog.notes.trim()) { toast.error('Please add some notes'); return; }
    setLogs(prev => [{ id: Date.now().toString(), ...newLog }, ...prev]);
    setNewLog({ date: new Date().toISOString().split('T')[0], mood: 'good', productivity: 70, notes: '' });
    setDialogOpen(false);
    toast.success('Log entry added!');
  };

  // Simple calendar for current month
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const logDates = new Set(logs.map(l => l.date));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Daily Log</h1>
          <p className="text-muted-foreground">Track your mood and productivity daily</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button variant="glow" className="gap-2"><Plus className="h-4 w-4" /> Add Entry</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Log Entry</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label>Date</Label><Input type="date" value={newLog.date} onChange={e => setNewLog({ ...newLog, date: e.target.value })} /></div>
              <div>
                <Label>Mood</Label>
                <Select value={newLog.mood} onValueChange={v => setNewLog({ ...newLog, mood: v as DailyLogEntry['mood'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="great">😊 Great</SelectItem>
                    <SelectItem value="good">🙂 Good</SelectItem>
                    <SelectItem value="okay">😐 Okay</SelectItem>
                    <SelectItem value="bad">😞 Bad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Productivity ({newLog.productivity}%)</Label>
                <Slider value={[newLog.productivity]} onValueChange={v => setNewLog({ ...newLog, productivity: v[0] })} max={100} step={5} className="mt-2" />
              </div>
              <div><Label>Notes</Label><Textarea value={newLog.notes} onChange={e => setNewLog({ ...newLog, notes: e.target.value })} placeholder="How was your day?" rows={3} /></div>
              <Button variant="glow" onClick={addLog} className="w-full">Save Entry</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">{now.toLocaleString('default', { month: 'long', year: 'numeric' })}</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-muted-foreground font-medium py-1">{d}</div>)}
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const hasLog = logDates.has(dateStr);
                const isToday = day === now.getDate();
                return (
                  <div key={day} className={`py-1.5 rounded-lg text-xs transition-colors cursor-default ${isToday ? 'bg-primary text-primary-foreground font-bold' : hasLog ? 'bg-primary/20 text-primary' : 'hover:bg-accent'}`}>
                    {day}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Log Entries</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {logs.map(log => {
                const MoodIcon = moodIcons[log.mood] || Smile;
                return (
                  <div key={log.id} className="flex items-start gap-4 p-3 rounded-xl bg-accent/50">
                    <MoodIcon className={`h-6 w-6 mt-0.5 shrink-0 ${moodColors[log.mood]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-medium">{log.date}</span>
                        <Badge variant="outline" className="text-xs">{log.mood}</Badge>
                        <Badge variant="secondary" className="text-xs">{log.productivity}% productive</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.notes}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
