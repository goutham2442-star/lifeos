import { motion } from 'framer-motion';
import { User, Palette, LayoutDashboard, Bell, Shield, Info, Check, Sun, Moon, Brain, HeartPulse, Home, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageTransition } from '@/components/ui/PageTransition';
import { useSettingsStore } from '@/store/settingsStore';
import { userProfile, accentColors, focusModes, widgets } from '@/data/mockData';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const focusModeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain, HeartPulse, Home, GraduationCap,
};

export function PersonalizationPage() {
  const { theme, setTheme, accent, setAccent } = useSettingsStore();
  const [enabledWidgets, setEnabledWidgets] = useState(
    Object.fromEntries(widgets.map((w) => [w.id, w.enabled]))
  );
  const [activeFocusMode, setActiveFocusMode] = useState('fm3');

  const toggleWidget = (id: string) => {
    setEnabledWidgets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight">Personalization</h1>
          <p className="text-sm text-secondary mt-1">Make LifeOS truly yours</p>
        </div>

        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={18} className="accent-text" /> Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl accent-bg flex items-center justify-center text-white text-xl font-bold">
                {userProfile.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-primary">{userProfile.name}</p>
                <p className="text-sm text-secondary">{userProfile.email}</p>
                <p className="text-xs text-tertiary mt-1">{userProfile.timezone} · Joined {userProfile.joinDate}</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <p className="text-sm text-secondary mt-4 pt-4 border-t border-default">{userProfile.bio}</p>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette size={18} className="accent-text" /> Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Theme */}
            <div>
              <label className="text-sm font-medium text-primary mb-3 block">Theme</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    'flex-1 flex items-center gap-3 p-3 rounded-xl border-2 transition-all',
                    theme === 'light' ? 'border-accent-500 accent-soft-bg' : 'border-default'
                  )}
                >
                  <Sun size={18} className="text-amber-500" />
                  <span className="text-sm font-medium text-primary">Light</span>
                  {theme === 'light' && <Check size={16} className="accent-text ml-auto" />}
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'flex-1 flex items-center gap-3 p-3 rounded-xl border-2 transition-all',
                    theme === 'dark' ? 'border-accent-500 accent-soft-bg' : 'border-default'
                  )}
                >
                  <Moon size={18} className="text-violet-500" />
                  <span className="text-sm font-medium text-primary">Dark</span>
                  {theme === 'dark' && <Check size={16} className="accent-text ml-auto" />}
                </button>
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <label className="text-sm font-medium text-primary mb-3 block">Accent Color</label>
              <div className="flex gap-3 flex-wrap">
                {accentColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setAccent(c.name)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all',
                      accent === c.name ? 'border-accent-500' : 'border-default'
                    )}
                  >
                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: c.value }} />
                    <span className="text-sm font-medium text-primary">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Customization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard size={18} className="accent-text" /> Dashboard Widgets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {widgets.map((widget) => (
              <div key={widget.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-subtle transition-colors">
                <span className="text-sm font-medium text-primary">{widget.name}</span>
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className={cn(
                    'relative w-11 h-6 rounded-full transition-colors',
                    enabledWidgets[widget.id] ? 'accent-bg' : 'bg-subtle'
                  )}
                >
                  <motion.div
                    layout
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                    animate={{ left: enabledWidgets[widget.id] ? '22px' : '2px' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Focus Modes */}
        <Card>
          <CardHeader>
            <CardTitle>Focus Modes</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {focusModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveFocusMode(mode.id)}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
                  activeFocusMode === mode.id ? 'border-accent-500 accent-soft-bg' : 'border-default hover:bg-subtle'
                )}
              >
                <div className="w-9 h-9 rounded-xl bg-subtle flex items-center justify-center shrink-0">
                  {(() => {
                    const Icon = focusModeIcons[mode.icon];
                    return Icon ? <Icon size={16} className="accent-text" /> : null;
                  })()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-primary">{mode.name}</p>
                  <p className="text-xs text-tertiary">{mode.description}</p>
                </div>
                {activeFocusMode === mode.id && <Check size={16} className="accent-text" />}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={18} className="accent-text" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: 'Task reminders', enabled: true },
              { label: 'Event alerts', enabled: true },
              { label: 'Habit nudges', enabled: true },
              { label: 'Daily summary', enabled: false },
              { label: 'Weekly review', enabled: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-subtle transition-colors">
                <span className="text-sm font-medium text-primary">{item.label}</span>
                <div className={cn('relative w-11 h-6 rounded-full transition-colors', item.enabled ? 'accent-bg' : 'bg-subtle')}>
                  <div className={cn('absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all', item.enabled ? 'left-[22px]' : 'left-0.5')} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={18} className="accent-text" /> Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              'Local data storage only',
              'No tracking or analytics',
              'No cloud sync (prototype mode)',
              'No third-party data sharing',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <Check size={16} className="accent-text" />
                <span className="text-sm text-secondary">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info size={18} className="accent-text" /> About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-secondary">
              <div className="flex justify-between">
                <span>Version</span>
                <span className="text-primary font-medium">1.0.0 (Prototype)</span>
              </div>
              <div className="flex justify-between">
                <span>Build</span>
                <span className="text-primary font-medium">2026.08.06</span>
              </div>
              <div className="flex justify-between">
                <span>Mode</span>
                <Badge variant="success">Frontend Only</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
