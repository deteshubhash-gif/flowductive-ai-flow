import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { User, Mail, Briefcase, MapPin, Calendar, Shield, Bell, Moon, Globe } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState('Passionate about productivity and building better workflows.');
  const [location, setLocation] = useState('San Francisco, CA');
  const [notifications, setNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary/20 text-primary text-3xl font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
              <p className="text-muted-foreground">{user?.email || 'user@example.com'}</p>
              <div className="flex gap-2 justify-center sm:justify-start">
                <Badge variant="secondary">{user?.role || 'Professional'}</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">Pro Plan</Badge>
              </div>
            </div>
            <div className="sm:ml-auto text-center sm:text-right text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Joined Jan 2025</p>
              <p className="flex items-center gap-1.5 mt-1"><Shield className="h-3.5 w-3.5" /> Account verified</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name"><User className="inline h-3.5 w-3.5 mr-1" />Full Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email"><Mail className="inline h-3.5 w-3.5 mr-1" />Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role"><Briefcase className="inline h-3.5 w-3.5 mr-1" />Role</Label>
              <Input id="role" value={user?.role || 'Professional'} disabled className="opacity-60" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location"><MapPin className="inline h-3.5 w-3.5 mr-1" />Location</Label>
              <Input id="location" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={bio} onChange={e => setBio(e.target.value)} rows={3} />
            </div>
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive alerts and reminders</p>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Weekly Report</p>
                    <p className="text-xs text-muted-foreground">Get productivity summaries</p>
                  </div>
                </div>
                <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Focus Mode</p>
                    <p className="text-xs text-muted-foreground">Silence non-critical alerts</p>
                  </div>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-xs text-muted-foreground">English (US)</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Tasks Done', value: '142' },
                  { label: 'Focus Hours', value: '86h' },
                  { label: 'Day Streak', value: '23' },
                  { label: 'AI Chats', value: '57' },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 rounded-xl bg-muted/50">
                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
