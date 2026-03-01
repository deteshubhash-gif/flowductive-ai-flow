import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Heart, Brain, Battery, TrendingDown, TrendingUp, Shield, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const tooltipStyle = {
  backgroundColor: 'hsl(224 24% 8%)',
  border: '1px solid hsl(224 15% 16%)',
  borderRadius: '8px',
  color: 'hsl(210 20% 95%)',
  fontSize: '12px',
};

const burnoutFactors = [
  { factor: 'Workload', score: 65, icon: Activity, status: 'moderate' as const },
  { factor: 'Emotional Drain', score: 42, icon: Heart, status: 'low' as const },
  { factor: 'Mental Fatigue', score: 58, icon: Brain, status: 'moderate' as const },
  { factor: 'Energy Level', score: 72, icon: Battery, status: 'good' as const },
  { factor: 'Recovery Time', score: 35, icon: Shield, status: 'low' as const },
];

const weeklyTrend = [
  { day: 'Mon', risk: 28 },
  { day: 'Tue', risk: 35 },
  { day: 'Wed', risk: 42 },
  { day: 'Thu', risk: 38 },
  { day: 'Fri', risk: 55 },
  { day: 'Sat', risk: 22 },
  { day: 'Sun', risk: 18 },
];

const radarData = [
  { subject: 'Sleep', value: 75 },
  { subject: 'Exercise', value: 60 },
  { subject: 'Social', value: 45 },
  { subject: 'Focus', value: 80 },
  { subject: 'Breaks', value: 55 },
  { subject: 'Nutrition', value: 70 },
];

const recommendations = [
  { text: 'Take a 15-minute walk after lunch to reset your focus.', priority: 'high' },
  { text: 'Your Friday workload is spiking — consider redistributing tasks.', priority: 'high' },
  { text: 'Sleep quality has improved 12% this week. Keep it up!', priority: 'low' },
  { text: 'Schedule a no-meeting day mid-week to protect deep work time.', priority: 'medium' },
  { text: 'Your social interaction score is low. Try a casual team check-in.', priority: 'medium' },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'low': return 'text-green-400';
    case 'moderate': return 'text-yellow-400';
    case 'high': return 'text-red-400';
    case 'good': return 'text-green-400';
    default: return 'text-muted-foreground';
  }
};

const priorityVariant = (p: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (p) {
    case 'high': return 'destructive';
    case 'medium': return 'default';
    default: return 'secondary';
  }
};

export default function BurnoutRisk() {
  const [overallRisk, setOverallRisk] = useState(32);

  useEffect(() => {
    const interval = setInterval(() => {
      setOverallRisk(prev => Math.max(15, Math.min(85, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const riskLevel = overallRisk < 30 ? 'Low' : overallRisk < 60 ? 'Moderate' : 'High';
  const riskColor = overallRisk < 30 ? 'text-green-400' : overallRisk < 60 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Burnout Risk Monitor</h1>
        <p className="text-muted-foreground">Track and manage your well-being to stay productive sustainably</p>
      </div>

      {/* Overall Risk Score */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative h-32 w-32 shrink-0">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke={overallRisk < 30 ? '#4ade80' : overallRisk < 60 ? '#facc15' : '#f87171'} strokeWidth="8" strokeDasharray={`${overallRisk * 2.64} 264`} strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold ${riskColor}`}>{overallRisk}%</span>
                <span className="text-xs text-muted-foreground">Risk</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <AlertTriangle className={`h-5 w-5 ${riskColor}`} />
                <h2 className="text-xl font-semibold">Burnout Risk: <span className={riskColor}>{riskLevel}</span></h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-lg">
                Your current burnout risk is calculated based on workload patterns, focus session lengths, break frequency, mood trends, and recovery indicators. Keep an eye on rising risk and follow the recommendations below.
              </p>
              <div className="mt-3">
                <Progress value={overallRisk} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factor Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {burnoutFactors.map(f => (
          <Card key={f.factor} className="hover:border-primary/20 transition-colors">
            <CardContent className="p-4 text-center">
              <f.icon className={`h-6 w-6 mx-auto mb-2 ${statusColor(f.status)}`} />
              <p className="text-xs text-muted-foreground mb-1">{f.factor}</p>
              <p className="text-2xl font-bold">{f.score}%</p>
              <Badge variant="outline" className={`mt-1 text-[10px] ${statusColor(f.status)}`}>{f.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <Card>
          <CardHeader><CardTitle className="text-base">Weekly Risk Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(224 15% 16%)" />
                <XAxis dataKey="day" stroke="hsl(215 15% 55%)" fontSize={12} />
                <YAxis stroke="hsl(215 15% 55%)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="risk" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Wellness Radar */}
        <Card>
          <CardHeader><CardTitle className="text-base">Wellness Balance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(224 15% 16%)" />
                <PolarAngleAxis dataKey="subject" stroke="hsl(215 15% 55%)" fontSize={11} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-primary" /> AI Recommendations to Reduce Burnout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-accent/50">
                <TrendingUp className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm flex-1">{r.text}</p>
                <Badge variant={priorityVariant(r.priority)} className="text-[10px] shrink-0">{r.priority}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
