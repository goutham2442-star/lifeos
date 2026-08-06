import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Clock, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageTransition } from '@/components/ui/PageTransition';
import { apps, appCategories } from '@/data/mockData';
import { getIcon } from '@/lib/icons';
import { AppWindow } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppHubPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = apps.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === 'All' ? true :
      category === 'Favorites' ? app.favorite :
      app.category === category;
    return matchesSearch && matchesCategory;
  });

  const favorites = apps.filter((a) => a.favorite);
  const recent = [...apps].sort((a, b) => (a.lastUsed || '').localeCompare(b.lastUsed || ''));
  const suggested = apps.filter((a) => !a.favorite).slice(0, 4);

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight">App Hub</h1>
          <p className="text-sm text-secondary mt-1">All your tools in one place</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-4 h-12 rounded-2xl bg-surface border border-default">
          <Search size={18} className="text-tertiary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search apps..."
            className="flex-1 bg-transparent outline-none text-primary text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {appCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-colors',
                category === cat ? 'accent-bg text-white' : 'bg-surface text-secondary border border-default hover:bg-subtle'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Favorites */}
        {category === 'All' && !search && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star size={18} className="accent-text" /> Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {favorites.map((app, i) => {
                  const Icon = getIcon(app.icon);
                  return (
                    <motion.button
                      key={app.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-subtle transition-colors group"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: app.color + '20' }}
                      >
                        <Icon size={22} style={{ color: app.color }} />
                      </div>
                      <span className="text-xs font-medium text-primary">{app.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent + Suggested */}
        {category === 'All' && !search && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={18} className="accent-text" /> Recently Used
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {recent.slice(0, 5).map((app, i) => {
                  const Icon = getIcon(app.icon);
                  return (
                    <div key={app.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-subtle transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: app.color + '20' }}>
                        <Icon size={18} style={{ color: app.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">{app.name}</p>
                        <p className="text-xs text-tertiary">{app.lastUsed}</p>
                      </div>
                      <ArrowUpRight size={16} className="text-tertiary" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggested</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {suggested.map((app, i) => {
                  const Icon = getIcon(app.icon);
                  return (
                    <div key={app.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-subtle transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: app.color + '20' }}>
                        <Icon size={18} style={{ color: app.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">{app.name}</p>
                        <p className="text-xs text-tertiary">{app.category}</p>
                      </div>
                      <Badge variant="outline">Open</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        )}

        {/* App Grid */}
        <Card>
          <CardHeader>
            <CardTitle>{search ? `Results for "${search}"` : category}</CardTitle>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <AppWindow className="mx-auto text-tertiary mb-3" size={32} />
                <p className="text-sm text-secondary">No apps found</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {filtered.map((app, i) => {
                  const Icon = getIcon(app.icon);
                  return (
                    <motion.button
                      key={app.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-subtle transition-colors group"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform relative"
                        style={{ backgroundColor: app.color + '20' }}
                      >
                        <Icon size={26} style={{ color: app.color }} />
                        {app.favorite && (
                          <Star size={12} className="absolute -top-1 -right-1 text-amber-400 fill-amber-400" />
                        )}
                      </div>
                      <span className="text-xs font-medium text-primary text-center">{app.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {['Calendar', 'Mail', 'Notes', 'Reminders', 'Weather', 'Music', 'Podcasts', 'Books'].map((link) => (
                <button
                  key={link}
                  className="px-4 py-2 text-sm font-medium rounded-xl bg-subtle text-secondary hover:bg-hover-clr hover:text-primary transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
