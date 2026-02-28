import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeatmapGrid } from '@/components/app/HeatmapGrid';
import { analyticsData, generateHeatmapData } from '@/services/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { TrendingUp, Target, Brain, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const tooltipStyle = {
  backgroundColor: 'hsl(224 24% 8%)',
  border: '1px solid hsl(224 15% 16%)',
  borderRadius: '8px',
  color: 'hsl(210 20% 95%)',
  fontSize: '12px',
};

export default function Analytics() {
  const heatmap = useMemo(() => generateHeatmapData(), []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Deep insights into your productivity patterns</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><TrendingUp className="h-5 w-5 text-primary" /></div>
              <div><p className="text-xs text-muted-foreground">Productivity Score</p><p className="text-2xl font-bold">85%</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-chart-2/10 flex items-center justify-center"><Target className="h-5 w-5 text-chart-2" /></div>
              <div><p className="text-xs text-muted-foreground">Completion Rate</p><p className="text-2xl font-bold">78%</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-chart-3/10 flex items-center justify-center"><Brain className="h-5 w-5 text-chart-3" /></div>
              <div><p className="text-xs text-muted-foreground">Focus Index</p><p className="text-2xl font-bold">7.2h</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-chart-4/10 flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-chart-4" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Burnout Risk</p>
                <p className="text-2xl font-bold">{analyticsData.burnoutRisk}%</p>
              </div>
            </div>
            <Progress value={analyticsData.burnoutRisk} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Monthly Productivity Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={analyticsData.monthlyProductivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(224 15% 16%)" />
                <XAxis dataKey="month" stroke="hsl(215 15% 55%)" fontSize={12} />
                <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="score" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Focus Hours by Day</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={analyticsData.focusTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(224 15% 16%)" />
                <XAxis dataKey="day" stroke="hsl(215 15% 55%)" fontSize={12} />
                <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Habit Consistency</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.habitData.map(h => (
              <div key={h.habit}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{h.habit}</span>
                  <span className="text-sm text-muted-foreground">{h.consistency}%</span>
                </div>
                <Progress value={h.consistency} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Contribution Heatmap</CardTitle></CardHeader>
          <CardContent><HeatmapGrid data={heatmap} /></CardContent>
        </Card>
      </div>
    </div>
  );
}
