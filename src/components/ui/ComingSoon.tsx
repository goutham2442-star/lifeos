import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function ComingSoon({ title, description, icon }: ComingSoonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="w-16 h-16 rounded-2xl accent-soft-bg flex items-center justify-center mb-4">
        {icon || <Sparkles className="accent-text" size={28} />}
      </div>
      <h3 className="text-lg font-semibold text-primary mb-1">{title}</h3>
      <p className="text-sm text-secondary max-w-sm">
        {description || 'This feature is on the way. We\'re crafting something special for you.'}
      </p>
      <span className="mt-4 px-3 py-1 text-xs font-medium rounded-full accent-soft-bg accent-text">
        Coming Soon
      </span>
    </motion.div>
  );
}
