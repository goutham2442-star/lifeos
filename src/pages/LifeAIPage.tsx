import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/ui/PageTransition';
import { useAIStore } from '@/store/aiStore';
import { aiActions, aiRecentCommands } from '@/data/mockData';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

export function LifeAIPage() {
  const { conversations, isTyping, sendMessage } = useAIStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [conversations, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight flex items-center gap-2">
            Life AI
            <Sparkles size={22} className="accent-text" />
          </h1>
          <p className="text-sm text-secondary mt-1">Your action assistant — not just a chat, a helper</p>
        </div>

        {/* Conversation */}
        <Card className="min-h-[400px] flex flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[50vh]">
            {conversations.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl accent-soft-bg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="accent-text" size={28} />
                </div>
                <p className="text-base font-semibold text-primary mb-1">How can I help you today?</p>
                <p className="text-sm text-secondary">Pick an action below or type your own request</p>
              </div>
            )}

            <AnimatePresence>
              {conversations.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl accent-bg flex items-center justify-center shrink-0">
                      <Sparkles size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line',
                      msg.role === 'user'
                        ? 'accent-bg text-white rounded-br-md'
                        : 'bg-subtle text-primary rounded-bl-md'
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-xl accent-bg flex items-center justify-center shrink-0">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div className="bg-subtle rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-2 h-2 rounded-full bg-tertiary"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-default p-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Life AI to do something..."
              className="flex-1 min-w-0 px-4 h-11 rounded-xl bg-subtle border border-default text-primary text-sm outline-none focus:border-[var(--accent)] transition-colors"
            />
            <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping} className="shrink-0">
              <Send size={18} />
            </Button>
          </div>
        </Card>

        {/* Suggested Actions */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">Suggested Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {aiActions.map((action, i) => {
              const Icon = getIcon(action.icon);
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => sendMessage(action.prompt)}
                  className="text-left p-4 rounded-2xl border border-default bg-surface hover:bg-subtle hover:shadow-card transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg accent-soft-bg flex items-center justify-center">
                      <Icon size={16} className="accent-text" />
                    </div>
                    <span className="text-sm font-semibold text-primary">{action.label}</span>
                  </div>
                  <p className="text-xs text-tertiary">{action.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Recent Commands */}
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-1.5">
              <Clock size={14} /> Recent Commands
            </h3>
            <div className="space-y-1">
              {aiRecentCommands.map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(cmd)}
                  className="w-full text-left flex items-center gap-3 p-2.5 rounded-xl hover:bg-subtle transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-subtle flex items-center justify-center shrink-0">
                    <Clock size={12} className="text-tertiary" />
                  </div>
                  <span className="text-sm text-secondary flex-1 truncate">{cmd}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
