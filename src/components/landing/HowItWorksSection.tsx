import { motion } from 'framer-motion';
import { Search, BarChart3, Settings, TrendingUp } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Track', desc: 'Log your tasks, habits, and focus sessions effortlessly.' },
  { icon: BarChart3, title: 'Analyze', desc: 'Get deep insights into your productivity patterns and trends.' },
  { icon: Settings, title: 'Optimize', desc: 'Receive AI-powered recommendations to improve your workflow.' },
  { icon: TrendingUp, title: 'Improve', desc: 'Watch your productivity compound over time with consistent habits.' },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">Four simple steps to transform your productivity.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="text-center">
              <div className="relative mx-auto mb-6">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <s.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
