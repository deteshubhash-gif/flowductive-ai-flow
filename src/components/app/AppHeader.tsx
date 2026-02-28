import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from 'next-themes';

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/workflow': 'Workflow Board',
  '/daily-log': 'Daily Log',
  '/docs': 'Documentation',
  '/focus-timer': 'Focus Timer',
  '/ai-chat': 'AI Assistant',
  '/analytics': 'Analytics',
  '/architecture': 'System Architecture',
};

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const title = titles[location.pathname] || 'Flowductive';

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl flex items-center px-4 gap-4 sticky top-0 z-30">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
