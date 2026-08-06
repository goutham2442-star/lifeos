import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Flag, CheckCircle2, Circle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Dialog } from '@/components/ui/Dialog';
import { PageTransition } from '@/components/ui/PageTransition';
import { useTasksStore } from '@/store/tasksStore';
import { calendarEvents } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';

const priorityConfig: Record<string, { color: string; bg: string; dot: string }> = {
  high: { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/50', dot: 'bg-red-500' },
  medium: { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/50', dot: 'bg-amber-500' },
  low: { color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/50', dot: 'bg-emerald-500' },
};

const categoryColors: Record<string, string> = {
  work: 'bg-blue-500',
  personal: 'bg-emerald-500',
  health: 'bg-rose-500',
  social: 'bg-amber-500',
};

export function PlannerPage() {
  const { tasks, toggleTask, addTask, filter, setFilter } = useTasksStore();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [weekOffset, setWeekOffset] = useState(0);

  const today = new Date();
  const weekStart = startOfWeek(addDays(today, weekOffset * 7), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'today') return !t.completed;
    if (filter === 'high') return t.priority === 'high' && !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const completionRate = Math.round((completedCount / totalCount) * 100);

  const handleAdd = () => {
    if (!newTaskTitle.trim()) return;
    addTask({
      id: crypto.randomUUID(),
      title: newTaskTitle,
      priority: newTaskPriority,
      category: 'Personal',
      completed: false,
      dueDate: new Date().toISOString(),
      estimatedMinutes: 30,
    });
    setNewTaskTitle('');
    setQuickAddOpen(false);
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with progress */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight">Planner</h1>
            <p className="text-sm text-secondary mt-1">{completedCount} of {totalCount} tasks completed · {completionRate}% done</p>
          </div>
          <Button onClick={() => setQuickAddOpen(true)}>
            <Plus size={16} /> Quick Add
          </Button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-subtle rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full gradient-hero rounded-full"
            />
          </div>
          <span className="text-sm font-semibold text-primary tabular-nums">{completionRate}%</span>
        </div>

        {/* Weekly Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{format(weekStart, 'MMMM yyyy')}</CardTitle>
              <div className="flex items-center gap-1">
                <button onClick={() => setWeekOffset(w => w - 1)} className="p-1.5 rounded-lg hover:bg-subtle transition-colors">
                  <ChevronLeft size={16} className="text-secondary" />
                </button>
                <button onClick={() => setWeekOffset(0)} className="px-3 py-1 text-xs font-medium rounded-lg hover:bg-subtle transition-colors text-secondary">
                  Today
                </button>
                <button onClick={() => setWeekOffset(w => w + 1)} className="p-1.5 rounded-lg hover:bg-subtle transition-colors">
                  <ChevronRight size={16} className="text-secondary" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {weekDays.map((day, i) => {
                const isTodayDate = isToday(day);
                const dayEvents = i === 2 ? calendarEvents : i === 4 ? calendarEvents.slice(0, 2) : [];
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex flex-col items-center gap-1 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer',
                      isTodayDate ? 'accent-soft-bg ring-1 ring-[var(--accent)]' : 'hover:bg-subtle'
                    )}
                  >
                    <span className="text-[10px] sm:text-xs text-tertiary font-medium uppercase tracking-wide">{format(day, 'EEE')}</span>
                    <span className={cn(
                      'text-base sm:text-lg font-bold tracking-tight',
                      isTodayDate ? 'accent-text' : 'text-primary'
                    )}>{format(day, 'd')}</span>
                    <div className="flex gap-0.5 h-1.5">
                      {dayEvents.slice(0, 3).map((e, j) => (
                        <div key={j} className={cn('w-1.5 h-1.5 rounded-full', categoryColors[e.category])} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Timeline */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Today's Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {calendarEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3"
                >
                  <div className="flex flex-col items-center pt-1">
                    <div className={cn('w-3 h-3 rounded-full', categoryColors[event.category])} />
                    {i < calendarEvents.length - 1 && <div className="w-0.5 flex-1 bg-border-default mt-1 mb-2" />}
                  </div>
                  <div className="pb-4 flex-1">
                    <p className="text-xs text-tertiary font-medium tabular-nums">{event.time} — {event.endTime}</p>
                    <p className="text-sm font-semibold text-primary mt-0.5">{event.title}</p>
                    {event.location && <p className="text-xs text-tertiary mt-0.5">{event.location}</p>}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tasks</CardTitle>
                <div className="flex gap-1 p-1 bg-subtle rounded-xl overflow-x-auto -mx-1 px-1">
                  {(['all', 'today', 'high', 'completed'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={cn(
                        'px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap',
                        filter === f ? 'bg-surface accent-text shadow-sm' : 'text-tertiary hover:text-secondary'
                      )}
                    >
                      {f === 'today' ? 'Active' : f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {filteredTasks.map((task, i) => {
                const prio = priorityConfig[task.priority];
                return (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-subtle transition-colors group"
                  >
                    <button onClick={() => toggleTask(task.id)} className="shrink-0">
                      {task.completed ? (
                        <CheckCircle2 size={22} className="accent-text" />
                      ) : (
                        <Circle size={22} className="text-tertiary hover:text-secondary transition-colors" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-medium', task.completed ? 'text-tertiary line-through' : 'text-primary')}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-xs text-tertiary truncate mt-0.5">{task.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-tertiary flex items-center gap-1 font-medium">
                          <Clock size={11} /> {task.estimatedMinutes}m
                        </span>
                        <span className="text-xs text-tertiary font-medium">{task.category}</span>
                      </div>
                    </div>
                    <div className={cn('px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shrink-0', prio.bg, prio.color)}>
                      <div className={cn('w-1.5 h-1.5 rounded-full', prio.dot)} />
                      <span className="hidden sm:inline">{task.priority}</span>
                    </div>
                  </motion.div>
                );
              })}
              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-2xl bg-subtle flex items-center justify-center mx-auto mb-3">
                    <Calendar className="text-tertiary" size={28} />
                  </div>
                  <p className="text-sm font-medium text-secondary">No tasks here. Enjoy the calm.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Add Modal */}
        <Dialog open={quickAddOpen} onClose={() => setQuickAddOpen(false)} title="Quick Add Task" description="Add a new task to your planner">
          <div className="space-y-4">
            <input
              autoFocus
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="What do you need to do?"
              className="w-full px-4 h-12 rounded-xl bg-subtle border border-default text-primary text-sm outline-none focus:border-[var(--accent)] transition-colors"
            />
            <div>
              <label className="text-xs text-tertiary font-medium mb-2 block uppercase tracking-wide">Priority</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((p) => {
                  const prio = priorityConfig[p];
                  return (
                    <button
                      key={p}
                      onClick={() => setNewTaskPriority(p)}
                      className={cn(
                        'flex-1 py-2.5 text-sm font-medium rounded-xl border-2 transition-all capitalize flex items-center justify-center gap-2',
                        newTaskPriority === p
                          ? 'border-transparent accent-soft-bg accent-text'
                          : 'border-default text-secondary hover:bg-subtle'
                      )}
                    >
                      <div className={cn('w-2 h-2 rounded-full', prio.dot)} />
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setQuickAddOpen(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleAdd}>Add Task</Button>
            </div>
          </div>
        </Dialog>
      </div>
    </PageTransition>
  );
}
