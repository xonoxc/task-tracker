import type { ReactNode } from 'react';

type BadgeColor = 'gray' | 'blue' | 'green' | 'yellow' | 'orange' | 'red';

const colorMap: Record<BadgeColor, string> = {
  gray: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
};

interface BadgeProps {
  color: BadgeColor;
  children: ReactNode;
}

export function Badge({ color, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-semibold border backdrop-blur-sm ${colorMap[color]}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: BadgeColor }> = {
    pending: { label: 'Pending', color: 'yellow' },
    'in-progress': { label: 'In Progress', color: 'blue' },
    completed: { label: 'Completed', color: 'green' },
  };
  const { label, color } = map[status] ?? { label: status, color: 'gray' };
  return <Badge color={color}>{label}</Badge>;
}

export function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, { label: string; color: BadgeColor }> = {
    low: { label: 'Low', color: 'gray' },
    medium: { label: 'Medium', color: 'orange' },
    high: { label: 'High', color: 'red' },
  };
  const { label, color } = map[priority] ?? { label: priority, color: 'gray' };
  return <Badge color={color}>{label}</Badge>;
}
