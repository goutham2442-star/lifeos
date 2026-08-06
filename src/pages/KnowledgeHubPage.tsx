import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Pin, Plus, FileText, Lightbulb, Bookmark, CheckSquare, Mic, Tag, X, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Dialog } from '@/components/ui/Dialog';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { PageTransition } from '@/components/ui/PageTransition';
import { useNotesStore } from '@/store/notesStore';
import { cn } from '@/lib/utils';

const typeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  note: FileText,
  idea: Lightbulb,
  bookmark: Bookmark,
  checklist: CheckSquare,
};

const colorMap: Record<string, string> = {
  blue: 'border-l-blue-500',
  green: 'border-l-emerald-500',
  amber: 'border-l-amber-500',
  violet: 'border-l-violet-500',
  teal: 'border-l-teal-500',
};

export function KnowledgeHubPage() {
  const { notes, activeNoteId, setActiveNote, togglePin, toggleChecklistItem, search, setSearch, activeTag, setActiveTag, addNote } = useNotesStore();
  const [quickCaptureOpen, setQuickCaptureOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  const filtered = notes.filter((n) => {
    const matchesSearch = search === '' ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !activeTag || n.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const pinnedNotes = filtered.filter((n) => n.pinned);
  const otherNotes = filtered.filter((n) => !n.pinned);
  const activeNote = notes.find((n) => n.id === activeNoteId);

  const handleQuickCapture = () => {
    if (!newNoteText.trim()) return;
    addNote({
      id: crypto.randomUUID(),
      title: newNoteText.split('\n')[0].slice(0, 50),
      content: newNoteText,
      tags: ['quick'],
      pinned: false,
      type: 'note',
      updatedAt: new Date().toISOString(),
    });
    setNewNoteText('');
    setQuickCaptureOpen(false);
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight">Knowledge Hub</h1>
            <p className="text-sm text-secondary mt-1">Capture, organize, and revisit your ideas</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setQuickCaptureOpen(true)}>
              <Plus size={16} /> Quick Capture
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 h-11 sm:h-12 rounded-2xl bg-surface border border-default">
          <Search size={18} className="text-tertiary shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="flex-1 min-w-0 bg-transparent outline-none text-primary text-sm"
          />
        </div>

        {/* Tags */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1',
              !activeTag ? 'accent-soft-bg accent-text' : 'bg-subtle text-secondary'
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1',
                activeTag === tag ? 'accent-soft-bg accent-text' : 'bg-subtle text-secondary'
              )}
            >
              <Tag size={11} /> {tag}
            </button>
          ))}
        </div>

        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-1.5">
              <Pin size={14} /> Pinned
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedNotes.map((note, i) => {
                const Icon = typeIcons[note.type];
                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className={cn('border-l-4 cursor-pointer hover:shadow-elevated transition-all', colorMap[note.color || 'blue'])}
                      onClick={() => setActiveNote(note.id)}
                    >
                      <CardContent>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {Icon && <Icon size={16} className="text-secondary" />}
                            <h4 className="text-sm font-semibold text-primary">{note.title}</h4>
                          </div>
                          <Pin size={14} className="accent-text shrink-0" />
                        </div>
                        <p className="text-xs text-secondary line-clamp-3 whitespace-pre-line">{note.content}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {note.tags.map((tag) => (
                            <span key={tag} className="text-xs text-tertiary bg-subtle px-2 py-0.5 rounded-full">#{tag}</span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Notes */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">Recent Notes</h3>
          {otherNotes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="mx-auto text-tertiary mb-3" size={32} />
                <p className="text-sm text-secondary">No notes yet. Start capturing your thoughts.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherNotes.map((note, i) => {
                const Icon = typeIcons[note.type];
                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className={cn('cursor-pointer hover:shadow-elevated transition-all', note.color && `border-l-4 ${colorMap[note.color]}`)}
                      onClick={() => setActiveNote(note.id)}
                    >
                      <CardContent>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {Icon && <Icon size={16} className="text-secondary" />}
                            <h4 className="text-sm font-semibold text-primary">{note.title}</h4>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); togglePin(note.id); }}
                            className="text-tertiary hover:accent-text transition-colors"
                          >
                            <Pin size={14} />
                          </button>
                        </div>
                        {note.type === 'checklist' && note.checklist ? (
                          <div className="space-y-1.5">
                            {note.checklist.slice(0, 4).map((item) => (
                              <div key={item.id} className="flex items-center gap-2">
                                {item.done ? <Check size={12} className="accent-text" /> : <div className="w-3 h-3 rounded border border-default" />}
                                <span className={cn('text-xs', item.done ? 'text-tertiary line-through' : 'text-secondary')}>{item.text}</span>
                              </div>
                            ))}
                            {note.checklist.length > 4 && (
                              <p className="text-xs text-tertiary">+{note.checklist.length - 4} more</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-secondary line-clamp-3 whitespace-pre-line">{note.content}</p>
                        )}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {note.tags.map((tag) => (
                            <span key={tag} className="text-xs text-tertiary bg-subtle px-2 py-0.5 rounded-full">#{tag}</span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Voice Notes Coming Soon */}
        <Card>
          <CardContent>
            <ComingSoon
              title="Voice Notes"
              description="Capture ideas on the go with voice recording and automatic transcription."
              icon={<Mic className="accent-text" size={28} />}
            />
          </CardContent>
        </Card>

        {/* Note Reader Dialog */}
        <Dialog open={!!activeNote} onClose={() => setActiveNote(null)} className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {activeNote && (
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = typeIcons[activeNote.type];
                    return Icon ? <Icon size={18} className="accent-text" /> : null;
                  })()}
                  <h2 className="text-xl font-bold text-primary">{activeNote.title}</h2>
                </div>
                <button onClick={() => togglePin(activeNote.id)} className={cn('p-1.5 rounded-lg transition-colors', activeNote.pinned ? 'accent-text' : 'text-tertiary hover:text-primary')}>
                  <Pin size={16} />
                </button>
              </div>
              {activeNote.type === 'checklist' && activeNote.checklist ? (
                <div className="space-y-2">
                  {activeNote.checklist.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleChecklistItem(activeNote.id, item.id)}
                      className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-subtle transition-colors"
                    >
                      {item.done ? <Check size={16} className="accent-text" /> : <div className="w-4 h-4 rounded border-2 border-default" />}
                      <span className={cn('text-sm', item.done ? 'text-tertiary line-through' : 'text-primary')}>{item.text}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-secondary whitespace-pre-line leading-relaxed">{activeNote.content}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-default">
                {activeNote.tags.map((tag) => (
                  <Badge key={tag} variant="accent">#{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </Dialog>

        {/* Quick Capture Dialog */}
        <Dialog open={quickCaptureOpen} onClose={() => setQuickCaptureOpen(false)} title="Quick Capture" description="Jot down a thought, idea, or note">
          <div className="space-y-4">
            <textarea
              autoFocus
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Start typing..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-subtle border border-default text-primary text-sm outline-none focus:border-accent-500 resize-none"
            />
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setQuickCaptureOpen(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleQuickCapture}>Save Note</Button>
            </div>
          </div>
        </Dialog>
      </div>
    </PageTransition>
  );
}
