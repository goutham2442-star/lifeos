import { motion } from 'framer-motion';
import { CheckCircle2, Brain, Flame, HeartPulse, CloudSun, Quote, ArrowRight, Plus, Clock, Zap, Calendar, TrendingUp, Sun, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageTransition } from '@/components/ui/PageTransition';
import { todayFocus, quickStats, weather, motivationalQuote, recentActivity, calendarEvents, tasks } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const statIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  CheckCircle2, Brain, Flame, HeartPulse,
};

const activityIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  task: CheckCircle2,
  note: Brain,
  event: Calendar,
  habit: Flame,
  ai: Zap,
};

const containerStagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const itemFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export function HomePage() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const progressPct = (completedTasks / totalTasks) * 100;
  const nextEvent = calendarEvents[1];

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl gradient-hero p-6 lg:p-8 noise"
        >
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm mb-1">{greeting}, Alex</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight max-w-lg">
                You're {progressPct.toFixed(0)}% through today's plan
              </h1>
              <p className="text-white/60 text-sm mt-2">
                {completedTasks} of {totalTasks} tasks done · {todayFocus.length} focus items remaining
              </p>
            </div>
            <Button
              onClick={() => navigate('/planner')}
              variant="secondary"
              size="md"
              className="bg-white/15 text-white border border-white/20 hover:bg-white/25 backdrop-blur-sm"
            >
              <Plus size={16} /> Add Task
            </Button>
          </div>
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-20 -bottom-16 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
        </motion.div>

        {/* Top Row: Focus + Progress */}
        <motion.div variants={containerStagger} initial="initial" animate="animate" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemFade} className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Today's Focus</CardTitle>
                <Badge variant="accent">{todayFocus.length} items</Badge>
              </CardHeader>
              <CardContent className="space-y-5">
                {todayFocus.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-primary font-medium">{item.label}</p>
                      <span className="text-xs text-tertiary font-medium">{item.progress}%</span>
                    </div>
                    <ProgressBar value={item.progress} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemFade}>
            <Card className="flex flex-col items-center justify-center h-full">
              <CardContent className="flex flex-col items-center w-full">
                <ProgressRing progress={progressPct} size={140} sublabel="Day Progress" />
                <p className="text-sm text-secondary mt-3 text-center">
                  {completedTasks} of {totalTasks} tasks complete
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={containerStagger} initial="initial" animate="animate" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat) => {
            const Icon = statIcons[stat.icon];
            return (
              <motion.div key={stat.id} variants={itemFade}>
                <Card className="h-full">
                  <CardContent className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-xl accent-soft-bg flex items-center justify-center">
                      {Icon && <Icon size={20} className="accent-text" />}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary tracking-tight">
                        {stat.value}
                        {stat.unit && <span className="text-base text-tertiary ml-0.5 font-medium">{stat.unit}</span>}
                      </p>
                      <p className="text-xs text-tertiary font-medium">{stat.label}</p>
                    </div>
                    {stat.total && (
                      <ProgressBar value={stat.value} max={stat.total} height="h-1" />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Middle Row: Weather + Upcoming Event */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudSun size={18} className="accent-text" /> Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center">
                  <Sun size={28} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary tracking-tight">{weather.temperature}°</p>
                  <p className="text-sm text-secondary">{weather.condition}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-tertiary font-medium">{weather.location}</p>
                  <p className="text-sm text-secondary mt-0.5">H: {weather.high}° L: {weather.low}°</p>
                </div>
              </div>
              <div className="flex justify-between gap-2 pt-2 border-t border-subtle">
                {weather.hourly.map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-xs text-tertiary font-medium">{h.time}</span>
                    <div className="w-9 h-9 rounded-xl bg-subtle flex items-center justify-center">
                      {i < 2 ? <Sun size={15} className="text-amber-400" /> : <Cloud size={15} className="text-slate-400" />}
                    </div>
                    <span className="text-xs font-semibold text-primary">{h.temp}°</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-20 accent-bg rounded-full shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-tertiary" />
                    <span className="text-xs text-tertiary font-medium">{nextEvent.time} — {nextEvent.endTime}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-primary tracking-tight">{nextEvent.title}</h4>
                  {nextEvent.location && (
                    <p className="text-sm text-secondary mt-0.5">{nextEvent.location}</p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="secondary" onClick={() => navigate('/planner')}>
                      View in Planner <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
                <Badge variant="accent" className="capitalize shrink-0">{nextEvent.category}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row: Recent Activity + Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentActivity.map((activity) => {
                const Icon = activityIcons[activity.type];
                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-subtle transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-subtle flex items-center justify-center shrink-0">
                      {Icon && <Icon size={15} className="text-secondary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary truncate">{activity.title}</p>
                      <p className="text-xs text-tertiary truncate">{activity.description}</p>
                    </div>
                    <span className="text-xs text-tertiary shrink-0 font-medium">{activity.timestamp}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full accent-soft-bg opacity-50 blur-2xl" />
            <CardContent className="flex flex-col justify-center h-full relative z-10">
              <Quote className="accent-text mb-3" size={28} />
              <p className="text-base font-medium text-primary leading-relaxed">
                "{motivationalQuote.text}"
              </p>
              <p className="text-sm text-tertiary mt-3 font-medium">— {motivationalQuote.author}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'New Task', icon: Plus, path: '/planner' },
                { label: 'Quick Note', icon: Brain, path: '/knowledge' },
                { label: 'Check Wellness', icon: HeartPulse, path: '/wellness' },
                { label: 'Ask Life AI', icon: Zap, path: '/ai' },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2.5 p-5 rounded-2xl border border-default hover:bg-subtle hover:border-[var(--text-tertiary)] transition-all group"
                >
                  <div className="w-11 h-11 rounded-2xl accent-soft-bg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <action.icon size={20} className="accent-text" />
                  </div>
                  <span className="text-sm font-medium text-primary">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
