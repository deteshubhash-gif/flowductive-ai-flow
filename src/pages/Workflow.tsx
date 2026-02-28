import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { initialWorkflowTasks } from '@/services/mockData';
import { Plus, ArrowRight, GripVertical } from 'lucide-react';
import type { Task } from '@/types';

const columns = [
  { id: 'backlog', title: 'Backlog', color: 'bg-muted-foreground' },
  { id: 'todo', title: 'To Do', color: 'bg-chart-4' },
  { id: 'inProgress', title: 'In Progress', color: 'bg-chart-2' },
  { id: 'review', title: 'Review', color: 'bg-chart-3' },
  { id: 'done', title: 'Done', color: 'bg-primary' },
];

const priorityColors: Record<string, string> = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-chart-4/10 text-chart-4 border-chart-4/20',
  low: 'bg-primary/10 text-primary border-primary/20',
};

export default function Workflow() {
  const [tasks, setTasks] = useState<Record<string, Task[]>>(initialWorkflowTasks);
  const [newTitle, setNewTitle] = useState('');
  const [newCol, setNewCol] = useState('todo');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dialogOpen, setDialogOpen] = useState(false);

  const addTask = () => {
    if (!newTitle.trim()) return;
    const task: Task = { id: Date.now().toString(), title: newTitle, priority: newPriority, tags: [] };
    setTasks(prev => ({ ...prev, [newCol]: [...prev[newCol], task] }));
    setNewTitle('');
    setDialogOpen(false);
  };

  const moveTask = (taskId: string, from: string, to: string) => {
    const task = tasks[from].find(t => t.id === taskId);
    if (!task) return;
    setTasks(prev => ({
      ...prev,
      [from]: prev[from].filter(t => t.id !== taskId),
      [to]: [...prev[to], task],
    }));
  };

  const deleteTask = (taskId: string, col: string) => {
    setTasks(prev => ({ ...prev, [col]: prev[col].filter(t => t.id !== taskId) }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflow Board</h1>
          <p className="text-muted-foreground">Manage your tasks across stages</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="glow" className="gap-2"><Plus className="h-4 w-4" /> Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Task</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Task title" />
              <Select value={newCol} onValueChange={setNewCol}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{columns.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={newPriority} onValueChange={v => setNewPriority(v as 'low' | 'medium' | 'high')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="glow" onClick={addTask} className="w-full">Add Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto">
        {columns.map(col => (
          <div key={col.id} className="min-w-[240px]">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
              <span className="text-sm font-semibold">{col.title}</span>
              <span className="text-xs text-muted-foreground ml-auto">{tasks[col.id]?.length || 0}</span>
            </div>
            <div className="space-y-2">
              {tasks[col.id]?.map(task => (
                <Card key={task.id} className="hover:border-primary/20 transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium mb-2">{task.title}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={`text-xs ${priorityColors[task.priority]}`}>{task.priority}</Badge>
                          {task.tags.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                        </div>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {columns.filter(c => c.id !== col.id).map(c => (
                            <button key={c.id} onClick={() => moveTask(task.id, col.id, c.id)}
                              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-0.5 transition-colors">
                              <ArrowRight className="h-3 w-3" />{c.title}
                            </button>
                          ))}
                          <button onClick={() => deleteTask(task.id, col.id)} className="text-xs text-destructive hover:text-destructive/80 ml-auto">Delete</button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
