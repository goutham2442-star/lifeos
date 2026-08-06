import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, CalendarDays, LayoutGrid, BookOpen, HeartPulse, Sparkles, Settings, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { userProfile } from '@/data/mockData';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/planner', label: 'Planner', icon: CalendarDays },
  { to: '/apps', label: 'App Hub', icon: LayoutGrid },
  { to: '/knowledge', label: 'Knowledge', icon: BookOpen },
  { to: '/wellness', label: 'Wellness', icon: HeartPulse },
  { to: '/ai', label: 'Life AI', icon: Sparkles },
  { to: '/settings', label: 'Personalize', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-default bg-surface px-3 py-5">
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
          <Sparkles className="text-white" size={20} />
        </div>
        <div>
          <span className="text-lg font-bold text-primary tracking-tight block leading-none">LifeOS</span>
          <span className="text-[10px] text-tertiary font-medium tracking-wider uppercase">Personal OS</span>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {({ isActive }) => (
              <div
                className={cn(
                  'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isActive ? 'accent-text' : 'text-secondary hover:text-primary hover:bg-subtle'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 accent-soft-bg rounded-xl"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <item.icon size={18} className="relative z-10 shrink-0" />
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <ChevronRight size={14} className="relative z-10 ml-auto accent-text" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <NavLink to="/settings" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-subtle transition-colors group">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center text-white text-sm font-bold shrink-0">
            {userProfile.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-primary truncate">{userProfile.name}</p>
            <p className="text-xs text-tertiary truncate">{userProfile.email}</p>
          </div>
          <Settings size={16} className="text-tertiary group-hover:text-primary transition-colors shrink-0" />
        </NavLink>
      </div>
    </aside>
  );
}
