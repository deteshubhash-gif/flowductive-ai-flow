import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Flowductive</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Home</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">About</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Contact</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link to="/signin"><Button variant="ghost">Sign In</Button></Link>
            <Link to="/register"><Button variant="glow">Get Started</Button></Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="px-4 py-4 space-y-3">
              <Link to="/" className="block py-2 text-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/about" className="block py-2 text-foreground" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/contact" className="block py-2 text-foreground" onClick={() => setMobileOpen(false)}>Contact</Link>
              <div className="pt-3 border-t border-border space-y-2">
                <Link to="/signin" onClick={() => setMobileOpen(false)}><Button variant="ghost" className="w-full">Sign In</Button></Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}><Button variant="glow" className="w-full">Get Started</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
