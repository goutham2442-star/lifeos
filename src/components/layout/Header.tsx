import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Command, Sparkles } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsStore';
import { tasks, notes, calendarEvents, apps } from '@/data/mockData';
import { cn } from '@/lib/utils';

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/planner': 'Planner',
  '/apps': 'App Hub',
  '/knowledge': 'Knowledge Hub',
  '/wellness': 'Wellness',
  '/ai': 'Life AI',
  '/settings': 'Personalization',
};

export function Header() {
  const { theme, toggleTheme } = useSettingsStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const pageTitle = pageTitles[location.pathname] || 'LifeOS';

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const results = query.length > 0
    ? [
        ...tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase())).map((t) => ({ type: 'Task', label: t.title, path: '/planner' })),
        ...notes.filter((n) => n.title.toLowerCase().includes(query.toLowerCase())).map((n) => ({ type: 'Note', label: n.title, path: '/knowledge' })),
        ...calendarEvents.filter((e) => e.title.toLowerCase().includes(query.toLowerCase())).map((e) => ({ type: 'Event', label: e.title, path: '/planner' })),
        ...apps.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())).map((a) => ({ type: 'App', label: a.name, path: '/apps' })),
      ]
    : [];

  return (
    <>
      <header className="sticky top-0 z-30 glass-strong border-b border-default px-4 lg:px-8 h-16 flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
            <Sparkles className="text-white" size={16} />
          </div>
        </div>
        <div className="hidden lg:block shrink-0">
          <h2 className="text-lg font-semibold text-primary tracking-tight">{pageTitle}</h2>
        </div>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex-1 min-w-0 max-w-md flex items-center gap-2 px-3.5 h-10 rounded-xl bg-subtle border border-default text-secondary hover:border-[var(--text-tertiary)] hover:bg-hover-clr transition-all ml-auto lg:ml-8"
        >
          <Search size={16} className="shrink-0" />
          <span className="text-sm truncate">Search...</span>
          <kbd className="ml-auto hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-surface border border-default rounded font-medium shrink-0">
            <Command size={10} /> K
          </kbd>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-subtle text-secondary hover:text-primary hover:bg-hover-clr transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4" onClick={() => setSearchOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
          <div
            className="relative bg-surface border border-default rounded-2xl shadow-elevated w-full max-w-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 h-14 border-b border-default">
              <Search size={18} className="text-tertiary" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks, notes, events, apps..."
                className="flex-1 bg-transparent outline-none text-primary text-sm placeholder:text-tertiary"
              />
              <kbd className="text-xs text-tertiary px-1.5 py-0.5 bg-subtle rounded font-medium">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && query.length > 0 && (
                <p className="text-sm text-tertiary text-center py-8">No results for "{query}"</p>
              )}
              {query.length === 0 && (
                <div className="py-6 text-center">
                  <Search size={24} className="text-tertiary mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-tertiary">Start typing to search across everything</p>
                </div>
              )}
              {results.map((r, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigate(r.path);
                    setSearchOpen(false);
                    setQuery('');
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-subtle transition-colors group'
                  )}
                >
                  <span className="text-xs font-medium accent-text accent-soft-bg px-2 py-0.5 rounded-full">
                    {r.type}
                  </span>
                  <span className="text-sm text-primary group-hover:accent-text transition-colors">{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
