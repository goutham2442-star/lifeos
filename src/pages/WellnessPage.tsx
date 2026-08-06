import { motion } from 'framer-motion';
import { Footprints, Droplet, Moon, TrendingUp, Trophy, Sparkles, Quote, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageTransition } from '@/components/ui/PageTransition';
import { useHabitsStore } from '@/store/habitsStore';
import { wellnessData } from '@/data/mockData';
import { getIcon } from '@/lib/icons';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from 'recharts';
import { cn } from '@/lib/utils';

export function WellnessPage() {
  const { habits, toggleHabit } = useHabitsStore();
  const completedHabits = habits.filter((h) => h.completedToday).length;

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Hero Score */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl gradient-hero p-6 lg:p-8 noise"
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0">
              <div className="relative w-32 h-32 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-white tracking-tight">{wellnessData.score}</p>
                  <p className="text-xs text-white/70 font-medium uppercase tracking-wide">Score</p>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white tracking-tight">You're doing great today</h1>
              <p className="text-white/70 text-sm mt-1">
                {completedHabits} of {habits.length} habits complete · {wellnessData.steps.current.toLocaleString()} steps
              </p>
              <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/15 text-white backdrop-blur-sm flex items-center gap-1">
                  <TrendingUp size={12} /> +5 from last week
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/15 text-white backdrop-blur-sm flex items-center gap-1">
                  <Target size={12} /> On track
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                    <Footprints size={20} className="text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-secondary">Steps</span>
                </div>
                <Badge variant="accent">{Math.round((wellnessData.steps.current / wellnessData.steps.goal) * 100)}%</Badge>
              </div>
              <p className="text-3xl font-bold text-primary tracking-tight">{wellnessData.steps.current.toLocaleString()}</p>
              <ProgressBar value={wellnessData.steps.current} max={wellnessData.steps.goal} color="#3b82f6" />
              <p className="text-xs text-tertiary font-medium">Goal: {wellnessData.steps.goal.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center">
                    <Droplet size={20} className="text-cyan-500" />
                  </div>
                  <span className="text-sm font-medium text-secondary">Water</span>
                </div>
                <Badge variant="accent">{wellnessData.water.current}/{wellnessData.water.goal}</Badge>
              </div>
              <p className="text-3xl font-bold text-primary tracking-tight">{wellnessData.water.current}<span className="text-lg text-tertiary font-medium"> {wellnessData.water.unit}</span></p>
              <div className="flex gap-1.5">
                {Array.from({ length: wellnessData.water.goal }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05, type: 'spring', damping: 15 }}
                    className={cn('flex-1 h-8 rounded-lg transition-colors', i < wellnessData.water.current ? 'bg-cyan-400' : 'bg-subtle')}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center">
                    <Moon size={20} className="text-violet-500" />
                  </div>
                  <span className="text-sm font-medium text-secondary">Sleep</span>
                </div>
                <Badge variant="accent">{wellnessData.sleep.current}h</Badge>
              </div>
              <p className="text-3xl font-bold text-primary tracking-tight">{wellnessData.sleep.current}<span className="text-lg text-tertiary font-medium"> / {wellnessData.sleep.goal}h</span></p>
              <ProgressBar value={wellnessData.sleep.current} max={wellnessData.sleep.goal} color="#8b5cf6" />
              <p className="text-xs text-tertiary font-medium">Last night · {Math.round((wellnessData.sleep.current / wellnessData.sleep.goal) * 100)}% of goal</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={wellnessData.weeklyChart}>
                    <defs>
                      <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                    <XAxis dataKey="day" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                      labelStyle={{ color: 'var(--text-primary)' }}
                    />
                    <Area type="monotone" dataKey="steps" stroke="var(--accent)" strokeWidth={2.5} fill="url(#stepsGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sleep Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={wellnessData.weeklyChart}>
                    <defs>
                      <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                    <XAxis dataKey="day" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                      cursor={{ fill: 'var(--bg-subtle)' }}
                    />
                    <Bar dataKey="sleep" fill="url(#sleepGradient)" radius={[8, 8, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Habit Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Habit Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {habits.map((habit, i) => {
              const Icon = getIcon(habit.icon);
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 rounded-2xl hover:bg-subtle transition-colors"
                >
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={cn(
                      'w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-90',
                      habit.completedToday ? 'accent-bg shadow-glow' : 'bg-subtle hover:bg-hover-clr'
                    )}
                  >
                    <Icon size={20} className={habit.completedToday ? 'text-white' : 'text-secondary'} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary">{habit.name}</p>
                    <p className="text-xs text-tertiary font-medium">{habit.current}/{habit.goal} {habit.unit} · {habit.streak} day streak</p>
                  </div>
                  <div className="hidden sm:flex gap-1">
                    {habit.history.map((v, j) => (
                      <div
                        key={j}
                        className={cn(
                          'w-6 h-9 rounded-lg transition-colors',
                          v >= habit.goal ? 'accent-bg opacity-80' : v > 0 ? 'accent-bg opacity-40' : 'bg-subtle'
                        )}
                        title={`${v} ${habit.unit}`}
                      />
                    ))}
                  </div>
                  <Badge variant={habit.completedToday ? 'success' : 'default'}>
                    {habit.completedToday ? 'Done' : 'Pending'}
                  </Badge>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy size={18} className="accent-text" /> Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {wellnessData.achievements.map((ach, i) => {
                const Icon = getIcon(ach.icon);
                return (
                  <motion.div
                    key={ach.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-2xl border transition-all',
                      ach.earned
                        ? 'border-default bg-subtle'
                        : 'border-default opacity-50'
                    )}
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
                      ach.earned ? 'accent-soft-bg' : 'bg-subtle'
                    )}>
                      <Icon size={22} className={ach.earned ? 'accent-text' : 'text-tertiary'} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-primary truncate">{ach.title}</p>
                      <p className="text-xs text-tertiary line-clamp-2">{ach.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Daily Motivation */}
        <Card className="accent-soft-bg border-transparent relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full accent-bg opacity-10 blur-2xl" />
          <CardContent className="flex items-start gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl accent-bg flex items-center justify-center shrink-0">
              <Quote className="text-white" size={20} />
            </div>
            <div>
              <p className="text-base font-medium text-primary leading-relaxed">
                "Take care of your body. It's the only place you have to live."
              </p>
              <p className="text-sm text-tertiary mt-2 font-medium">— Jim Rohn</p>
            </div>
            <Sparkles className="accent-text ml-auto shrink-0" size={20} />
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
