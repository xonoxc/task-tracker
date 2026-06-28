import { useEffect } from 'react';
import { useUIStore } from '~/store/ui.store';

export function Toast() {
  const notifications = useUIStore((s) => s.notifications);
  const removeNotification = useUIStore((s) => s.removeNotification);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((n) => (
        <ToastItem key={n.id} id={n.id} type={n.type} message={n.message} onDismiss={removeNotification} />
      ))}
    </div>
  );
}

function ToastItem({
  id,
  type,
  message,
  onDismiss,
}: {
  id: string;
  type: 'success' | 'error';
  message: string;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const glow = type === 'success' ? 'border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
  return (
    <div
      className={`glass-panel border animate-in slide-in-from-right rounded-lg px-4 py-3 text-sm font-medium text-white ${glow}`}
    >
      {message}
    </div>
  );
}
