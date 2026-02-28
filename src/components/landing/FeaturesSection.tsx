import { CheckSquare, Kanban, Bot, BarChart3, Flame, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: CheckSquare, title: 'Task Management', desc: 'Organize, prioritize, and track all your tasks in one powerful interface.' },
  { icon: Kanban, title: 'Workflow Board', desc: 'Kanban-style boards to visualize your project pipeline from backlog to done.' },
  { icon: Bot, title: 'AI Assistant', desc: 'Get intelligent insights and recommendations powered by AI analysis.' },
  { icon: BarChart3, title: 'Analytics Engine', desc: 'Deep productivity analytics with charts, trends, and actionable metrics.' },
  { icon: Flame, title: 'Heatmap Tracking', desc: 'GitHub-style contribution heatmaps to visualize your consistency.' },
  { icon: FileText, title: 'Documentation', desc: 'Rich markdown workspace for notes, specs, and team documentation.' },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Stay Productive</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Powerful tools designed to help you focus, track progress, and achieve more every day.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
