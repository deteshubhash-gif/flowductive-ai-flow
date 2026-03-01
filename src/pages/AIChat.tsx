import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendMessageToAI } from '@/services/aiService';
import { Send, Bot, User, Code2, Heart, BarChart3, MessageSquare } from 'lucide-react';
import type { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';

type AIMode = 'assistant' | 'refactorization' | 'wellness' | 'habit-tracker';

const aiModes: { id: AIMode; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'assistant', label: 'AI Assistant', icon: MessageSquare, description: 'General productivity insights and task help' },
  { id: 'refactorization', label: 'AI Refactorization', icon: Code2, description: 'Code and workflow optimization suggestions' },
  { id: 'wellness', label: 'AI Wellness', icon: Heart, description: 'Mental health, breaks, and stress management' },
  { id: 'habit-tracker', label: 'AI Habit Tracker', icon: BarChart3, description: 'Build and maintain productive habits' },
];

const modeGreetings: Record<AIMode, string> = {
  assistant: "Hello! I'm your AI productivity assistant. Ask me anything about your tasks, focus habits, or productivity trends.",
  refactorization: "Hi! I'm your AI Refactorization engine. Ask me about optimizing your workflows, restructuring tasks, or improving code processes.",
  wellness: "Welcome! I'm your AI Wellness coach. Let's talk about managing stress, taking breaks, maintaining work-life balance, and staying healthy.",
  'habit-tracker': "Hey there! I'm your AI Habit Tracker. I can help you build consistent habits, track streaks, and suggest routines for peak performance.",
};

const modeMockResponses: Record<AIMode, string[]> = {
  assistant: [
    "Based on your productivity trends, I suggest focusing on deep work in the morning hours when your concentration peaks.",
    "Your completion rate has improved by 15% this week. Keep up the momentum!",
    "I notice you tend to be most productive on Thursdays. Consider scheduling important tasks for that day.",
  ],
  refactorization: [
    "Your workflow has 3 bottlenecks in the Review stage. Consider splitting code reviews into smaller chunks to improve throughput by ~25%.",
    "I recommend restructuring your task pipeline: batch similar tasks together to reduce context-switching overhead by 40%.",
    "Your current sprint velocity could increase by 18% if you move stand-ups to async updates and protect 2-hour deep work blocks.",
  ],
  wellness: [
    "You've been working for 3 hours straight. A 10-minute walk can restore focus and reduce cortisol levels by 15%.",
    "Your stress indicators are rising on Fridays. Consider ending Fridays with a reflection session instead of heavy coding.",
    "Great job taking breaks today! Your recovery metrics show 20% improvement. Keep prioritizing rest between focus sessions.",
  ],
  'habit-tracker': [
    "You've maintained your morning journaling habit for 8 days! Research shows 21 days builds a lasting habit — keep going!",
    "Your exercise habit dropped this week. Try linking it to an existing habit: exercise right after your morning coffee.",
    "Consistency tip: Your most successful habits are the ones you do at the same time daily. Try anchoring new habits to your 9 AM routine.",
  ],
};

export default function AIChat() {
  const [activeMode, setActiveMode] = useState<AIMode>('assistant');
  const [conversations, setConversations] = useState<Record<AIMode, ChatMessage[]>>(() => {
    const initial: Record<AIMode, ChatMessage[]> = {} as any;
    for (const mode of aiModes) {
      initial[mode.id] = [
        { id: `${mode.id}-0`, role: 'assistant', content: modeGreetings[mode.id], timestamp: new Date() },
      ];
    }
    return initial;
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = conversations[activeMode];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setConversations(prev => ({ ...prev, [activeMode]: [...prev[activeMode], userMsg] }));
    setInput('');
    setIsTyping(true);

    // Use mode-specific mock responses or fallback to aiService
    const delay = 1000 + Math.random() * 1500;
    await new Promise(r => setTimeout(r, delay));

    const modeResponses = modeMockResponses[activeMode];
    const lower = input.toLowerCase();
    let response: string;

    if (activeMode !== 'assistant') {
      // Pick a contextual mock response for specialized modes
      response = modeResponses[Math.floor(Math.random() * modeResponses.length)];
    } else {
      response = await sendMessageToAI(input);
    }

    setIsTyping(false);
    setConversations(prev => ({
      ...prev,
      [activeMode]: [...prev[activeMode], { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() }],
    }));
  };

  const activeModeInfo = aiModes.find(m => m.id === activeMode)!;

  return (
    <div className="space-y-4 h-[calc(100vh-10rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">Get intelligent productivity insights</p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {aiModes.map(mode => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200",
              activeMode === mode.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card hover:border-primary/30 text-muted-foreground hover:text-foreground"
            )}
          >
            <mode.icon className="h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{mode.label}</p>
              <p className="text-[11px] opacity-70 truncate hidden md:block">{mode.description}</p>
            </div>
          </button>
        ))}
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <activeModeInfo.icon className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent'
              }`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <activeModeInfo.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-accent rounded-2xl px-4 py-3 text-sm">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </CardContent>

        <div className="border-t border-border p-4">
          <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder={`Ask ${activeModeInfo.label}...`} className="flex-1" disabled={isTyping} />
            <Button variant="glow" type="submit" size="icon" disabled={isTyping || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
