import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/app/StatCard';
import { HeatmapGrid } from '@/components/app/HeatmapGrid';
import { dashboardStats, weeklyProductivity, taskDistribution, activityFeed, generateHeatmapData } from '@/services/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle2, Target, Clock, Flame, TrendingUp, Zap } from 'lucide-react';
import { useMemo } from 'react';

const COLORS = ['#2dd4bf', '#3b82f6', '#8b5cf6', '#f59e0b', '#f43f5e'];

const tooltipStyle = {
  backgroundColor: 'hsl(224 24% 8%)',
  border: '1px solid hsl(224 15% 16%)',
  borderRadius: '8px',
  color: 'hsl(210 20% 95%)',
  fontSize: '12px',
};

export default function Dashboard() {
  const [stats, setStats] = useState(dashboardStats);
  const heatmap = useMemo(() => generateHeatmapData(), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        productivityScore: Math.max(70, Math.min(100, prev.productivityScore + (Math.random() > 0.5 ? 1 : -1))),
        focusHours: +(prev.focusHours + 0.01).toFixed(2),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your productivity at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Tasks" value={stats.totalTasks} icon={Target} />
        <StatCard title="Completed" value={stats.completedTasks} icon={CheckCircle2} />
        <StatCard title="Productivity" value={`${stats.productivityScore}%`} icon={TrendingUp} trend="+5%" />
        <StatCard title="Focus Hours" value={stats.focusHours} icon={Clock} />
        <StatCard title="Consistency" value={`${stats.habitConsistency}%`} icon={Zap} />
        <StatCard title="Streak" value={`${stats.activityStreak}d`} icon={Flame} trend="🔥" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Weekly Productivity</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={weeklyProductivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(224 15% 16%)" />
                <XAxis dataKey="day" stroke="hsl(215 15% 55%)" fontSize={12} />
                <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="score" stroke="#2dd4bf" strokeWidth={2} dot={{ fill: '#2dd4bf', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Task Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={taskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {taskDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Activity Heatmap</CardTitle></CardHeader>
          <CardContent><HeatmapGrid data={heatmap} /></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityFeed.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{item.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
