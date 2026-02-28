import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Productivity?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join thousands of professionals who use Flowductive to work smarter, not harder.
          </p>
          <Link to="/register">
            <Button variant="glow" size="xl" className="gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
