import type { Task, DailyLogEntry, DocItem } from '@/types';

export const dashboardStats = {
  totalTasks: 47,
  completedTasks: 32,
  productivityScore: 85,
  focusHours: 6.5,
  habitConsistency: 78,
  activityStreak: 12,
};

export const weeklyProductivity = [
  { day: 'Mon', score: 72 },
  { day: 'Tue', score: 85 },
  { day: 'Wed', score: 68 },
  { day: 'Thu', score: 91 },
  { day: 'Fri', score: 78 },
  { day: 'Sat', score: 55 },
  { day: 'Sun', score: 42 },
];

export const taskDistribution = [
  { name: 'Development', value: 35 },
  { name: 'Design', value: 20 },
  { name: 'Research', value: 15 },
  { name: 'Meetings', value: 18 },
  { name: 'Planning', value: 12 },
];

export function generateHeatmapData() {
  const data: { date: string; count: number }[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    data.push({ date: d.toISOString().split('T')[0], count: Math.floor(Math.random() * 5) });
  }
  return data;
}

export const initialWorkflowTasks: Record<string, Task[]> = {
  backlog: [
    { id: '1', title: 'Research competitor analysis', priority: 'medium', tags: ['research'] },
    { id: '2', title: 'Design system audit', priority: 'low', tags: ['design'] },
  ],
  todo: [
    { id: '3', title: 'Implement user dashboard', priority: 'high', tags: ['dev'] },
    { id: '4', title: 'Write API documentation', priority: 'medium', tags: ['docs'] },
  ],
  inProgress: [
    { id: '5', title: 'Build authentication flow', priority: 'high', tags: ['dev'] },
  ],
  review: [
    { id: '6', title: 'Landing page redesign', priority: 'medium', tags: ['design'] },
  ],
  done: [
    { id: '7', title: 'Setup project scaffolding', priority: 'high', tags: ['dev'] },
    { id: '8', title: 'Create brand guidelines', priority: 'low', tags: ['design'] },
  ],
};

export const testimonials = [
  { name: 'Sarah Chen', role: 'Product Manager', company: 'TechFlow Inc.', content: 'Flowductive transformed how our team manages sprints. The AI assistant alone saved us 10+ hours per week.', avatar: 'SC' },
  { name: 'Marcus Johnson', role: 'Engineering Lead', company: 'DevScale', content: 'The heatmap and analytics features give me unprecedented visibility into team productivity patterns.', avatar: 'MJ' },
  { name: 'Priya Patel', role: 'Freelance Designer', company: 'Independent', content: 'As a freelancer, the focus timer and daily logs keep me accountable. Best productivity tool I\'ve used.', avatar: 'PP' },
];

export const initialDailyLogs: DailyLogEntry[] = [
  { id: '1', date: '2026-02-28', mood: 'great', productivity: 85, notes: 'Completed all sprint tasks ahead of schedule.' },
  { id: '2', date: '2026-02-27', mood: 'good', productivity: 72, notes: 'Productive morning, meetings in afternoon.' },
  { id: '3', date: '2026-02-26', mood: 'okay', productivity: 60, notes: 'Struggled with focus, but finished key deliverable.' },
];

export const initialDocuments: DocItem[] = [
  { id: '1', title: 'Project Roadmap', folder: 'Planning', content: '# Project Roadmap\n\n## Q1 Goals\n- Launch MVP\n- Onboard 100 beta users\n- Implement core features\n\n## Q2 Goals\n- Scale infrastructure\n- Add AI features\n- Enterprise features', updatedAt: '2026-02-28', versions: 5 },
  { id: '2', title: 'API Specification', folder: 'Technical', content: '# API Specification\n\n## Endpoints\n\n### Authentication\n- POST /api/auth/login\n- POST /api/auth/register\n\n### Tasks\n- GET /api/tasks\n- POST /api/tasks\n- PUT /api/tasks/:id', updatedAt: '2026-02-27', versions: 3 },
  { id: '3', title: 'Meeting Notes', folder: 'General', content: '# Meeting Notes - Feb 26\n\n## Attendees\n- Team Lead\n- Developers\n\n## Discussion Points\n- Sprint progress review\n- Feature prioritization', updatedAt: '2026-02-26', versions: 2 },
];

export const activityFeed = [
  { id: '1', action: 'Completed task', detail: 'Setup project scaffolding', time: '2 min ago' },
  { id: '2', action: 'Added document', detail: 'API Specification v3', time: '15 min ago' },
  { id: '3', action: 'Focus session', detail: '25 min completed', time: '1 hour ago' },
  { id: '4', action: 'AI insight', detail: 'Productivity up 12% this week', time: '2 hours ago' },
  { id: '5', action: 'Log entry', detail: 'Great mood, 85% productive', time: '3 hours ago' },
];

export const analyticsData = {
  monthlyProductivity: [
    { month: 'Sep', score: 65 },
    { month: 'Oct', score: 72 },
    { month: 'Nov', score: 68 },
    { month: 'Dec', score: 78 },
    { month: 'Jan', score: 82 },
    { month: 'Feb', score: 85 },
  ],
  completionRates: [
    { week: 'W1', rate: 72 },
    { week: 'W2', rate: 78 },
    { week: 'W3', rate: 85 },
    { week: 'W4', rate: 82 },
  ],
  focusTrend: [
    { day: 'Mon', hours: 5.2 },
    { day: 'Tue', hours: 6.8 },
    { day: 'Wed', hours: 4.5 },
    { day: 'Thu', hours: 7.1 },
    { day: 'Fri', hours: 6.3 },
    { day: 'Sat', hours: 3.2 },
    { day: 'Sun', hours: 2.1 },
  ],
  habitData: [
    { habit: 'Exercise', consistency: 85 },
    { habit: 'Reading', consistency: 72 },
    { habit: 'Meditation', consistency: 65 },
    { habit: 'Journaling', consistency: 90 },
    { habit: 'Deep Work', consistency: 78 },
  ],
  burnoutRisk: 32,
};
