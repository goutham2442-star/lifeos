import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, CalendarDays, LayoutGrid, HeartPulse, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/planner', label: 'Planner', icon: CalendarDays },
  { to: '/apps', label: 'Apps', icon: LayoutGrid },
  { to: '/wellness', label: 'Wellness', icon: HeartPulse },
  { to: '/ai', label: 'AI', icon: Sparkles },
];

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 glass-strong border-t border-default px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-1 px-3 py-1.5 relative">
                {isActive && (
                  <motion.div
                    layoutId="bottomnav-active"
                    className="absolute inset-x-2 top-0 h-9 rounded-2xl accent-soft-bg"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <item.icon
                  size={20}
                  className={cn('transition-colors relative z-10', isActive ? 'accent-text' : 'text-tertiary')}
                />
                <span className={cn('text-[10px] font-medium relative z-10 transition-colors', isActive ? 'accent-text' : 'text-tertiary')}>
                  {item.label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
