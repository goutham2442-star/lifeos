import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { aiActions } from '@/data/mockData';
import { getIcon } from '@/lib/icons';

export function FloatingAIButton() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40">
      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setExpanded(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="absolute bottom-16 right-0 bg-surface border border-default rounded-2xl shadow-elevated p-3 w-72 z-50"
            >
              <div className="flex items-center gap-2 mb-2 px-1">
                <Sparkles size={14} className="accent-text" />
                <span className="text-sm font-semibold text-primary">Quick Actions</span>
              </div>
              {aiActions.slice(0, 4).map((action, i) => {
                const Icon = getIcon(action.icon);
                return (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      navigate('/ai');
                      setExpanded(false);
                    }}
                    className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-subtle transition-colors text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg accent-soft-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={14} className="accent-text" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-primary truncate">{action.label}</p>
                      <p className="text-xs text-tertiary truncate">{action.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setExpanded(!expanded)}
        className="relative w-14 h-14 rounded-full accent-bg shadow-elevated flex items-center justify-center text-white float-pulse"
        style={{ ['--accent-glow' as string]: 'rgba(29, 128, 245, 0.3)' }}
        aria-label="Life AI"
      >
        {expanded ? <X size={22} /> : <Sparkles size={22} />}
      </motion.button>
    </div>
  );
}
