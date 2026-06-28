import { StatusBadge, PriorityBadge } from '~/components/ui/Badge';
import { Button } from '~/components/ui/Button';
import { useDeleteTask } from '~/hooks/use-tasks';
import { useUIStore } from '~/store/ui.store';
import type { Task } from '~/types/task';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const deleteTask = useDeleteTask();
  const openEditForm = useUIStore((s) => s.openEditForm);
  const addNotification = useUIStore((s) => s.addNotification);

  const handleDelete = () => {
    deleteTask.mutate(task._id, {
      onSuccess: () => addNotification({ type: 'success', message: 'Task deleted' }),
      onError: () => addNotification({ type: 'error', message: 'Failed to delete task' }),
    });
  };

  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : null;

  return (
    <div className="border-b section-border border-solid p-6 md:px-10 group hover:bg-base-surface/50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-white tracking-tight group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1.5 line-clamp-2 text-sm text-gray-400">
              {task.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
            {dueDate && (
              <span className="text-xs text-gray-500 font-medium tracking-wide">
                DUE {dueDate}
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => openEditForm(task._id)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            loading={deleteTask.isPending}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
