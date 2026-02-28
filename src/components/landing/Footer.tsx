import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">Flowductive</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">AI-powered productivity platform that helps you track, analyze, and optimize your workflow.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Product</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <Link to="/register" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Get Started</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Features</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Task Management</p>
              <p>AI Assistant</p>
              <p>Analytics</p>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2026 Flowductive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
