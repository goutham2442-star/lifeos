export type Theme = 'light' | 'dark';
export type AccentColor = 'blue' | 'green' | 'rose' | 'amber' | 'violet' | 'teal';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  bio: string;
  timezone: string;
  joinDate: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
  dueDate: string;
  estimatedMinutes: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  endTime: string;
  duration: number;
  category: 'work' | 'personal' | 'health' | 'social';
  location?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  pinned: boolean;
  type: 'note' | 'idea' | 'bookmark' | 'checklist';
  checklist?: { id: string; text: string; done: boolean }[];
  updatedAt: string;
  color?: string;
}

export interface AppItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  favorite: boolean;
  lastUsed?: string;
  url?: string;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completedToday: boolean;
  goal: number;
  current: number;
  unit: string;
  history: number[];
}

export interface Activity {
  id: string;
  type: 'task' | 'note' | 'event' | 'habit' | 'ai';
  title: string;
  description: string;
  timestamp: string;
}

export interface AIAction {
  id: string;
  label: string;
  icon: string;
  description: string;
  prompt: string;
}

export interface AIConversation {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const userProfile: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatar: '',
  bio: 'Product designer & lifelong learner. Building habits, one day at a time.',
  timezone: 'Pacific Time (PT)',
  joinDate: 'January 2024',
};

export const todayFocus = [
  { id: '1', label: 'Finish design review for Q3 roadmap', progress: 65 },
  { id: '2', label: '30-minute deep work session on proposal', progress: 20 },
  { id: '3', label: 'Call mom for her birthday', progress: 0 },
];

export const quickStats = [
  { id: 'tasks', label: 'Tasks Done', value: 7, total: 12, icon: 'CheckCircle2' },
  { id: 'focus', label: 'Focus Time', value: 3.5, total: 6, unit: 'h', icon: 'Brain' },
  { id: 'habits', label: 'Habits', value: 4, total: 6, icon: 'Flame' },
  { id: 'wellness', label: 'Wellness', value: 82, unit: '%', icon: 'HeartPulse' },
];

export const weather = {
  location: 'San Francisco',
  temperature: 68,
  condition: 'Partly Cloudy',
  high: 72,
  low: 58,
  icon: 'cloud-sun',
  hourly: [
    { time: '9 AM', temp: 62 },
    { time: '12 PM', temp: 68 },
    { time: '3 PM', temp: 71 },
    { time: '6 PM', temp: 67 },
    { time: '9 PM', temp: 61 },
  ],
};

export const motivationalQuote = {
  text: 'The secret of getting ahead is getting started.',
  author: 'Mark Twain',
};

export const tasks: Task[] = [
  { id: 't1', title: 'Review Q3 design roadmap', description: 'Go through the latest Figma file and leave comments', priority: 'high', category: 'Work', completed: false, dueDate: '2026-08-06T14:00:00', estimatedMinutes: 45 },
  { id: 't2', title: 'Morning meditation', priority: 'medium', category: 'Wellness', completed: true, dueDate: '2026-08-06T07:00:00', estimatedMinutes: 15 },
  { id: 't3', title: 'Draft client proposal', description: 'Section 2 — scope and deliverables', priority: 'high', category: 'Work', completed: false, dueDate: '2026-08-06T16:00:00', estimatedMinutes: 60 },
  { id: 't4', title: 'Grocery run', priority: 'low', category: 'Personal', completed: true, dueDate: '2026-08-06T10:00:00', estimatedMinutes: 30 },
  { id: 't5', title: 'Read chapter 4 of Atomic Habits', priority: 'low', category: 'Learning', completed: false, dueDate: '2026-08-06T20:00:00', estimatedMinutes: 25 },
  { id: 't6', title: 'Team standup', priority: 'medium', category: 'Work', completed: true, dueDate: '2026-08-06T09:30:00', estimatedMinutes: 30 },
  { id: 't7', title: 'Plan weekend trip', priority: 'low', category: 'Personal', completed: false, dueDate: '2026-08-08T18:00:00', estimatedMinutes: 40 },
  { id: 't8', title: 'Reply to investor email', priority: 'high', category: 'Work', completed: false, dueDate: '2026-08-07T11:00:00', estimatedMinutes: 15 },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Team Standup', time: '09:00', endTime: '09:30', duration: 30, category: 'work', location: 'Zoom' },
  { id: 'e2', title: 'Design Review', time: '11:00', endTime: '12:00', duration: 60, category: 'work', location: 'Conference Room A' },
  { id: 'e3', title: 'Lunch with Sarah', time: '12:30', endTime: '13:30', duration: 60, category: 'social', location: 'Blue Bottle Coffee' },
  { id: 'e4', title: 'Yoga Session', time: '17:00', endTime: '18:00', duration: 60, category: 'health', location: 'Studio 3' },
  { id: 'e5', title: 'Deep Work Block', time: '14:00', endTime: '16:00', duration: 120, category: 'work' },
];

export const notes: Note[] = [
  {
    id: 'n1',
    title: 'Q3 Product Strategy',
    content: 'Focus on three pillars this quarter:\n\n1. Onboarding redesign — reduce time-to-value from 5 days to under 2\n2. Mobile parity — close the gap on 8 missing features\n3. Performance — sub-200ms API response times\n\nNorth star metric: weekly active users who complete core action within first session.',
    tags: ['work', 'strategy', 'q3'],
    pinned: true,
    type: 'note',
    updatedAt: '2026-08-06T09:15:00',
    color: 'blue',
  },
  {
    id: 'n2',
    title: 'Book Ideas',
    content: 'A book about building personal systems that compound over time. Not productivity hacks — systems thinking applied to daily life.\n\nKey chapters:\n- The compounding effect of small habits\n- Designing your environment for success\n- Feedback loops and reflection rituals',
    tags: ['ideas', 'writing'],
    pinned: true,
    type: 'idea',
    updatedAt: '2026-08-05T21:30:00',
    color: 'amber',
  },
  {
    id: 'n3',
    title: 'Reading List',
    content: 'Books to read this quarter',
    tags: ['reading', 'learning'],
    pinned: false,
    type: 'checklist',
    checklist: [
      { id: 'c1', text: 'Atomic Habits — James Clear', done: true },
      { id: 'c2', text: 'Thinking in Systems — Donella Meadows', done: false },
      { id: 'c3', text: 'The Creative Act — Rick Rubin', done: false },
      { id: 'c4', text: 'Range — David Epstein', done: true },
      { id: 'c5', text: 'Slow Productivity — Cal Newport', done: false },
    ],
    updatedAt: '2026-08-06T08:00:00',
    color: 'green',
  },
  {
    id: 'n4',
    title: 'Design Inspiration',
    content: 'Collection of interfaces and patterns I admire. Linear\'s command palette. Arc\'s sidebar. Nothing OS dot matrix aesthetic. Apple Health\'s activity rings. Superlist\'s task interactions.',
    tags: ['design', 'inspiration'],
    pinned: false,
    type: 'bookmark',
    updatedAt: '2026-08-04T15:20:00',
    color: 'violet',
  },
  {
    id: 'n5',
    title: 'Morning Routine',
    content: 'Wake at 6:30. Hydrate. 10 min meditation. Journal 3 things I\'m grateful for. Review today\'s top 3 priorities. Light stretching.',
    tags: ['wellness', 'routine'],
    pinned: false,
    type: 'note',
    updatedAt: '2026-08-06T06:45:00',
    color: 'teal',
  },
  {
    id: 'n6',
    title: 'Project: Garden Redesign',
    content: 'Phase 1: Clear existing beds and amend soil. Phase 2: Install drip irrigation. Phase 3: Plant natives and vegetables. Budget: $400. Timeline: 3 weekends.',
    tags: ['personal', 'project'],
    pinned: false,
    type: 'note',
    updatedAt: '2026-08-03T10:00:00',
    color: 'green',
  },
  {
    id: 'n7',
    title: 'Meeting Notes — Aug 4',
    content: 'Discussed Q3 priorities with leadership. Agreed to pause Feature X and reallocate two engineers to onboarding. Next check-in in two weeks. Action items: update roadmap doc, notify the team.',
    tags: ['work', 'meetings'],
    pinned: false,
    type: 'note',
    updatedAt: '2026-08-04T16:00:00',
  },
];

export const apps: AppItem[] = [
  { id: 'a1', name: 'Calendar', category: 'Productivity', icon: 'Calendar', color: '#ef4444', favorite: true, lastUsed: '2h ago' },
  { id: 'a2', name: 'Mail', category: 'Productivity', icon: 'Mail', color: '#3b82f6', favorite: true, lastUsed: '1h ago' },
  { id: 'a3', name: 'Notes', category: 'Productivity', icon: 'StickyNote', color: '#f59e0b', favorite: true, lastUsed: '30m ago' },
  { id: 'a4', name: 'Music', category: 'Media', icon: 'Music', color: '#ec4899', favorite: true, lastUsed: '5h ago' },
  { id: 'a5', name: 'Camera', category: 'Media', icon: 'Camera', color: '#8b5cf6', favorite: false, lastUsed: '1d ago' },
  { id: 'a6', name: 'Maps', category: 'Utilities', icon: 'MapPin', color: '#10b981', favorite: false, lastUsed: '3h ago' },
  { id: 'a7', name: 'Weather', category: 'Utilities', icon: 'CloudSun', color: '#06b6d4', favorite: false, lastUsed: '1h ago' },
  { id: 'a8', name: 'Reminders', category: 'Productivity', icon: 'Bell', color: '#f97316', favorite: false, lastUsed: '4h ago' },
  { id: 'a9', name: 'Health', category: 'Lifestyle', icon: 'HeartPulse', color: '#ef4444', favorite: true, lastUsed: '2h ago' },
  { id: 'a10', name: 'Wallet', category: 'Utilities', icon: 'Wallet', color: '#14b8a6', favorite: false, lastUsed: '6h ago' },
  { id: 'a11', name: 'Podcasts', category: 'Media', icon: 'Podcast', color: '#8b5cf6', favorite: false, lastUsed: '8h ago' },
  { id: 'a12', name: 'Files', category: 'Utilities', icon: 'Folder', color: '#6b7280', favorite: false, lastUsed: '2d ago' },
  { id: 'a13', name: 'Photos', category: 'Media', icon: 'Image', color: '#22c55e', favorite: false, lastUsed: '1d ago' },
  { id: 'a14', name: 'Clock', category: 'Utilities', icon: 'Clock', color: '#3b82f6', favorite: false, lastUsed: '1h ago' },
  { id: 'a15', name: 'Books', category: 'Learning', icon: 'BookOpen', color: '#f59e0b', favorite: false, lastUsed: '3d ago' },
  { id: 'a16', name: 'Fitness', category: 'Lifestyle', icon: 'Dumbbell', color: '#ef4444', favorite: false, lastUsed: '5h ago' },
];

export const appCategories = ['All', 'Favorites', 'Productivity', 'Media', 'Utilities', 'Lifestyle', 'Learning'];

export const habits: Habit[] = [
  { id: 'h1', name: 'Meditate', icon: 'Sparkles', streak: 12, completedToday: true, goal: 15, current: 15, unit: 'min', history: [15, 15, 10, 15, 15, 20, 15] },
  { id: 'h2', name: 'Read', icon: 'BookOpen', streak: 8, completedToday: true, goal: 30, current: 30, unit: 'min', history: [30, 25, 30, 30, 20, 30, 30] },
  { id: 'h3', name: 'Exercise', icon: 'Dumbbell', streak: 5, completedToday: false, goal: 45, current: 20, unit: 'min', history: [45, 30, 45, 0, 45, 40, 20] },
  { id: 'h4', name: 'Water', icon: 'Droplet', streak: 20, completedToday: true, goal: 8, current: 6, unit: 'cups', history: [8, 8, 7, 8, 6, 8, 6] },
  { id: 'h5', name: 'Journal', icon: 'PenLine', streak: 3, completedToday: false, goal: 1, current: 0, unit: 'entry', history: [1, 1, 1, 0, 1, 1, 0] },
  { id: 'h6', name: 'Sleep Early', icon: 'Moon', streak: 7, completedToday: true, goal: 1, current: 1, unit: 'night', history: [1, 1, 0, 1, 1, 1, 1] },
];

export const wellnessData = {
  score: 82,
  steps: { current: 7432, goal: 10000 },
  water: { current: 6, goal: 8, unit: 'cups' },
  sleep: { current: 7.5, goal: 8, unit: 'h' },
  weeklyChart: [
    { day: 'Mon', steps: 8200, sleep: 7.2, water: 7 },
    { day: 'Tue', steps: 6100, sleep: 6.8, water: 6 },
    { day: 'Wed', steps: 9500, sleep: 7.5, water: 8 },
    { day: 'Thu', steps: 7800, sleep: 8.0, water: 7 },
    { day: 'Fri', steps: 5400, sleep: 6.5, water: 5 },
    { day: 'Sat', steps: 11200, sleep: 8.5, water: 8 },
    { day: 'Sun', steps: 7432, sleep: 7.5, water: 6 },
  ],
  achievements: [
    { id: 'ach1', title: 'Early Bird', description: 'Wake before 7 AM for 7 days', icon: 'Sunrise', earned: true },
    { id: 'ach2', title: 'Hydrated', description: '8 cups of water for 5 days', icon: 'Droplet', earned: true },
    { id: 'ach3', title: 'Bookworm', description: 'Read for 30 days straight', icon: 'BookOpen', earned: true },
    { id: 'ach4', title: 'Marathon', description: '10,000 steps in a day', icon: 'Trophy', earned: false },
    { id: 'ach5', title: 'Zen Master', description: 'Meditate for 30 days', icon: 'Sparkles', earned: false },
    { id: 'ach6', title: 'Night Owl', description: 'Sleep before 11 PM for 14 days', icon: 'Moon', earned: false },
  ],
};

export const recentActivity: Activity[] = [
  { id: 'act1', type: 'task', title: 'Completed "Morning meditation"', description: 'Wellness habit checked off', timestamp: '8 min ago' },
  { id: 'act2', type: 'note', title: 'Created note "Q3 Product Strategy"', description: 'Pinned to Knowledge Hub', timestamp: '45 min ago' },
  { id: 'act3', type: 'ai', title: 'Life AI planned your day', description: '3 tasks scheduled, 2 events noted', timestamp: '1h ago' },
  { id: 'act4', type: 'habit', title: 'Water habit at 6/8 cups', description: '2 more cups to hit your goal', timestamp: '2h ago' },
  { id: 'act5', type: 'event', title: 'Team standup completed', description: '30 min · Zoom', timestamp: '3h ago' },
];

export const aiActions: AIAction[] = [
  { id: 'ai1', label: 'Plan My Day', icon: 'CalendarCheck', description: 'Organize your tasks and events into a schedule', prompt: 'Plan my day' },
  { id: 'ai2', label: 'Create Reminder', icon: 'Bell', description: 'Set a reminder for something important', prompt: 'Create a reminder' },
  { id: 'ai3', label: 'Continue Project', icon: 'ArrowRight', description: 'Pick up where you left off', prompt: 'Continue my project' },
  { id: 'ai4', label: 'Summarize Notes', icon: 'FileText', description: 'Get a summary of your recent notes', prompt: 'Summarize my notes' },
  { id: 'ai5', label: 'Find Something', icon: 'Search', description: 'Search across your tasks, notes, and events', prompt: 'Find something' },
  { id: 'ai6', label: "Today's Overview", icon: 'LayoutDashboard', description: 'A quick snapshot of your day', prompt: 'Give me today\'s overview' },
];

export const aiRecentCommands = [
  'Plan my day around the 2 PM design review',
  'Summarize my notes from this week',
  'What should I focus on tomorrow?',
  'Find my notes about Q3 strategy',
];

export const aiResponses: Record<string, string> = {
  'plan my day': "Here's your optimized schedule for today:\n\n• 9:00 AM — Team Standup (already on calendar)\n• 10:00 AM — Deep work: Draft client proposal (60 min)\n• 11:00 AM — Design Review (calendar)\n• 12:30 PM — Lunch with Sarah (calendar)\n• 2:00 PM — Continue Q3 roadmap review (45 min)\n• 5:00 PM — Yoga session (calendar)\n• 8:00 PM — Read Atomic Habits chapter 4 (25 min)\n\nI've left buffer time between blocks. You have 3 high-priority tasks — I'd start with the proposal since it needs the most focus.",
  'create a reminder': "I can set that up for you. What would you like to be reminded about and when? For example:\n\n• \"Remind me to call the dentist tomorrow at 10 AM\"\n• \"Remind me about the proposal draft in 2 hours\"\n• \"Remind me to water plants every morning\"\n\nJust tell me the what and when, and I'll add it to your planner.",
  'continue my project': "Your most recent project is **Garden Redesign** (last edited 3 days ago).\n\nYou were at Phase 1: clearing beds and amending soil. Next steps from your notes:\n\n1. Finish clearing the south bed (started last weekend)\n2. Buy soil amendments — compost and perlite\n3. Sketch the drip irrigation layout\n\nWant me to add these as tasks to your planner for this weekend?",
  'summarize my notes': "Here's a summary of your 7 recent notes:\n\n**Pinned:** Q3 Product Strategy — three pillars: onboarding, mobile parity, performance. Book Ideas — a book about compounding personal systems.\n\n**Recent:** Reading List (2 of 5 books done). Morning Routine established. Meeting Notes from Aug 4 — pausing Feature X, reallocating engineers.\n\n**Themes this week:** strategy, wellness routine, and design inspiration. You've been most active in the 'work' and 'wellness' tags.",
  'find something': "What are you looking for? I can search across:\n\n• Tasks (8 active)\n• Notes (7 total, 2 pinned)\n• Events (5 today)\n• Habits (6 tracked)\n\nTry something like \"find my notes about Q3\" or \"find tasks due tomorrow.\"",
  "today's overview": "Good morning, Alex. Here's your day at a glance:\n\n**Schedule:** 5 events today — standup, design review, lunch, deep work block, yoga.\n\n**Tasks:** 7 of 12 done. 3 high-priority items remain, including the client proposal.\n\n**Wellness:** Score 82%. Steps 7,432/10,000. Water 6/8 cups. Sleep 7.5h.\n\n**Habits:** 4 of 6 complete. Exercise and journal still pending.\n\n**Focus suggestion:** Block 2–4 PM for the proposal — that's your next open window.",
};

export const focusModes = [
  { id: 'fm1', name: 'Deep Work', description: 'Hide distractions, mute notifications', icon: 'Brain', active: false },
  { id: 'fm2', name: 'Wellness', description: 'Prioritize health and habits', icon: 'HeartPulse', active: false },
  { id: 'fm3', name: 'Personal', description: 'Off-work, personal time', icon: 'Home', active: true },
  { id: 'fm4', name: 'Learning', description: 'Focus on reading and notes', icon: 'GraduationCap', active: false },
];

export const accentColors: { name: AccentColor; label: string; value: string; soft: string }[] = [
  { name: 'blue', label: 'Ocean', value: '#1d80f5', soft: '#eef4ff' },
  { name: 'green', label: 'Forest', value: '#10b981', soft: '#ecfdf5' },
  { name: 'rose', label: 'Sunset', value: '#f43f5e', soft: '#fff1f2' },
  { name: 'amber', label: 'Amber', value: '#f59e0b', soft: '#fffbeb' },
  { name: 'violet', label: 'Lavender', value: '#8b5cf6', soft: '#f5f3ff' },
  { name: 'teal', label: 'Teal', value: '#14b8a6', soft: '#f0fdfa' },
];

export const widgets = [
  { id: 'w1', name: 'Today\'s Focus', enabled: true },
  { id: 'w2', name: 'Quick Stats', enabled: true },
  { id: 'w3', name: 'Weather', enabled: true },
  { id: 'w4', name: 'Upcoming Event', enabled: true },
  { id: 'w5', name: 'Recent Activity', enabled: true },
  { id: 'w6', name: 'Motivational Quote', enabled: true },
  { id: 'w7', name: 'Progress Ring', enabled: true },
  { id: 'w8', name: 'Habit Snapshot', enabled: false },
];
