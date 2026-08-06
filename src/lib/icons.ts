import * as Icons from 'lucide-react';
import type { ComponentType } from 'react';

type IconComp = ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

const iconMap = Icons as unknown as Record<string, IconComp>;

export function getIcon(name: string): IconComp {
  return iconMap[name] || Icons.AppWindow;
}
