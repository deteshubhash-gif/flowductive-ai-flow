import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Code2, Database, Brain, Globe, Server, Shield, Layers, Workflow } from 'lucide-react';

const sections = [
  {
    icon: Globe,
    title: 'Frontend Architecture',
    badges: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    content: 'Built with React 18 and TypeScript for type safety. Vite provides blazing-fast HMR. Tailwind CSS with a custom design system ensures consistent, responsive UI. Component architecture follows atomic design principles with reusable, composable pieces.',
  },
  {
    icon: Server,
    title: 'Planned Backend Architecture',
    badges: ['Node.js', 'Express', 'REST API', 'WebSocket'],
    content: 'The backend will be built with Node.js and Express, providing RESTful APIs for all CRUD operations. WebSocket support will enable real-time collaboration features. The service layer is already structured in the frontend for seamless API integration.',
  },
  {
    icon: Database,
    title: 'Planned Database (MongoDB)',
    badges: ['MongoDB', 'Mongoose', 'Atlas'],
    content: 'MongoDB will store user data, tasks, logs, documents, and analytics. Collections are designed for efficient querying with proper indexing. MongoDB Atlas will provide managed cloud hosting with automatic scaling.',
  },
  {
    icon: Brain,
    title: 'Planned AI Integration (OpenAI)',
    badges: ['OpenAI GPT', 'Embeddings', 'Context-Aware'],
    content: 'The AI assistant will use OpenAI\'s GPT API for intelligent productivity insights. User data will be embedded and used as context for personalized recommendations. The mock service layer (aiService.ts) is ready for direct API replacement.',
  },
  {
    icon: Shield,
    title: 'Authentication & Security',
    badges: ['JWT', 'bcrypt', 'RBAC'],
    content: 'Production auth will use JWT tokens with refresh rotation. Passwords will be hashed with bcrypt. Role-based access control (RBAC) supports different user types: Student, Teacher, Professional, Freelancer.',
  },
  {
    icon: Layers,
    title: 'Modular Structure',
    badges: ['Context API', 'Custom Hooks', 'Service Layer'],
    content: 'Clean separation of concerns with Context for state management, custom hooks for reusable logic, and a service layer for API calls. Every mock service can be swapped with real API calls without touching components.',
  },
];

export default function Architecture() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Architecture</h1>
        <p className="text-muted-foreground">Technical overview and planned infrastructure</p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Workflow className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">What is Flowductive?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Flowductive is an AI-powered productivity platform that combines task management, workflow boards,
                focus tracking, daily logging, documentation, and intelligent analytics into a unified experience.
                It helps students, teachers, professionals, and freelancers optimize their workflow through
                data-driven insights and personalized AI recommendations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Card className="h-full hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                </div>
                <div className="flex gap-2 flex-wrap pt-2">
                  {s.badges.map(b => <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Code2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Real-World Impact</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Flowductive is designed to be portfolio-ready and production-deployable. The modular architecture
            ensures that each component can be developed, tested, and deployed independently. The frontend
            is fully functional with mock data, and every service layer is structured so that replacing mocks
            with real API endpoints requires minimal code changes. This project demonstrates professional-grade
            software engineering practices including type safety, clean architecture, responsive design, and
            accessibility.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
