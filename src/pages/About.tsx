import { motion } from 'framer-motion';
import { Zap, Target, Users, Brain } from 'lucide-react';

const values = [
  { icon: Target, title: 'Mission', desc: 'To empower individuals and teams with intelligent tools that transform how they work, making productivity effortless and data-driven.' },
  { icon: Users, title: 'Who We Help', desc: 'Students, teachers, professionals, freelancers, and teams of all sizes who want to optimize their workflow and achieve more.' },
  { icon: Brain, title: 'AI-Powered Vision', desc: 'We believe AI should augment human potential. Our platform learns your patterns to provide personalized, actionable productivity insights.' },
];

export default function About() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm mb-6">
              <Zap className="h-4 w-4" /> About Flowductive
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Built for the Modern Productive Mind</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flowductive was created to bridge the gap between task management and intelligent productivity.
              We combine the best of project management, habit tracking, and AI to create a seamless experience.
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Why Flowductive?</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Traditional productivity tools track what you do. Flowductive understands how you work.
              By combining task management, focus tracking, daily logging, and AI analysis, we give you
              a complete picture of your productivity — and actionable steps to improve it. Think of it as
              Notion + Linear + GitHub + an AI assistant, unified in one beautiful platform.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
