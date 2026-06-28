import { TaskCard } from '~/components/task/TaskCard';
import { useTasks } from '~/hooks/use-tasks';
import { useUIStore } from '~/store/ui.store';

export function TaskList() {
  const filters = useUIStore((s) => s.filters);
  const { data: tasks, isLoading, isError, error } = useTasks(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 border-b section-border border-solid">
        <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent blur-[0.5px]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border-b section-border border-solid bg-red-500/10 p-6 md:px-10 text-center text-sm font-medium text-red-500">
        {error?.message || 'Failed to load tasks'}
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="border-b section-border border-solid py-20 text-center text-sm font-medium text-gray-400">
        No tasks found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
