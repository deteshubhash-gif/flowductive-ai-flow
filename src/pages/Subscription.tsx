import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Check, Crown, Zap, X } from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['5 Tasks', 'Basic Timer', 'Daily Log', 'Limited AI Chat'],
    current: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    features: ['Unlimited Tasks', 'Workflow Board', 'Full AI Assistant', 'Analytics Dashboard', 'Burnout Detection', 'Priority Support'],
    current: true,
    popular: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    features: ['Everything in Pro', 'Team Collaboration', 'Admin Dashboard', 'Custom Integrations', 'API Access', 'Dedicated Support'],
    current: false,
  },
];

export default function Subscription() {
  const [currentPlan, setCurrentPlan] = useState('Pro');
  const [cancelled, setCancelled] = useState(false);

  const handleCancel = () => {
    setCancelled(true);
    toast.success('Subscription cancelled. You\'ll have access until the end of your billing period.');
  };

  const handleUpgrade = (plan: string) => {
    setCurrentPlan(plan);
    setCancelled(false);
    toast.success(`Upgraded to ${plan} plan!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="text-muted-foreground">Manage your plan and billing</p>
      </div>

      {/* Current Plan Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{currentPlan} Plan</h3>
                  {cancelled ? (
                    <Badge variant="destructive">Cancelling</Badge>
                  ) : (
                    <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {cancelled ? 'Access until Mar 31, 2026' : 'Next billing date: Apr 1, 2026'}
                </p>
              </div>
            </div>
            {!cancelled ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                    Cancel Subscription
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel your subscription?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You'll lose access to premium features at the end of your current billing period. You can resubscribe anytime.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Yes, Cancel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button size="sm" onClick={() => { setCancelled(false); toast.success('Subscription reactivated!'); }}>
                Reactivate
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map(plan => (
          <Card key={plan.name} className={`relative ${plan.name === currentPlan ? 'border-primary shadow-[0_0_20px_hsl(var(--primary)/0.15)]' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground"><Zap className="h-3 w-3 mr-1" /> Popular</Badge>
              </div>
            )}
            <CardHeader className="text-center pt-6">
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {plan.name === currentPlan ? (
                <Button variant="outline" className="w-full" disabled>Current Plan</Button>
              ) : (
                <Button className="w-full" variant={plan.popular ? 'glow' : 'outline'} onClick={() => handleUpgrade(plan.name)}>
                  {plan.price === '$0' ? 'Downgrade' : 'Upgrade'}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Billing History</CardTitle>
          <CardDescription>Your recent invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'Mar 1, 2026', amount: '$12.00', status: 'Paid' },
              { date: 'Feb 1, 2026', amount: '$12.00', status: 'Paid' },
              { date: 'Jan 1, 2026', amount: '$12.00', status: 'Paid' },
            ].map((inv, i) => (
              <div key={i}>
                {i > 0 && <Separator className="mb-3" />}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Pro Plan - Monthly</p>
                    <p className="text-xs text-muted-foreground">{inv.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{inv.amount}</span>
                    <Badge variant="secondary" className="text-xs">{inv.status}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}