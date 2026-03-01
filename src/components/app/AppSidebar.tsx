import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Kanban, Calendar, FileText, Timer, MessageSquare,
  BarChart3, Code2, LogOut, Zap, ChevronLeft, AlertTriangle
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/workflow', label: 'Workflow', icon: Kanban },
  { path: '/daily-log', label: 'Daily Log', icon: Calendar },
  { path: '/docs', label: 'Documents', icon: FileText },
  { path: '/focus-timer', label: 'Focus Timer', icon: Timer },
  { path: '/ai-chat', label: 'AI Chat', icon: MessageSquare },
  { path: '/burnout-risk', label: 'Burnout Risk', icon: AlertTriangle },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/architecture', label: 'Architecture', icon: Code2 },
];

export function AppSidebar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={onToggle} />}

      <aside className={`fixed top-0 left-0 z-50 h-full bg-card border-r border-border transition-all duration-300 flex flex-col
        ${open ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'}
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <Zap className="h-6 w-6 text-primary shrink-0" />
            {open && <span className="font-bold text-lg whitespace-nowrap">Flowductive</span>}
          </div>
          {open && (
            <button onClick={onToggle} className="hidden md:flex text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => window.innerWidth < 768 && onToggle()}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
                  <item.icon className="h-5 w-5 shrink-0" />
                  {open && <span className="text-sm whitespace-nowrap">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {open && (
          <div className="p-4 border-t border-border shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.role || 'Member'}</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={logout}>
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
