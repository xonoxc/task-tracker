import { Button } from '~/components/ui/Button';
import { Toast } from '~/components/ui/Toast';
import { Header } from '~/components/layout/Header';
import { TaskFilter } from '~/components/task/TaskFilter';
import { TaskList } from '~/components/task/TaskList';
import { TaskForm } from '~/components/task/TaskForm';
import { useUIStore } from '~/store/ui.store';

export default function Home() {
  const isFormOpen = useUIStore((s) => s.isFormOpen);
  const openCreateForm = useUIStore((s) => s.openCreateForm);

  return (
    <div className="min-h-screen bg-base-dark text-gray-200">
      <Header />
      
      <div className="flex flex-col md:flex-row border-b section-border border-solid min-h-[calc(100vh-64px)]">
        <div className="w-full md:w-80 border-r section-border border-solid p-6 md:p-8 flex flex-col gap-6 bg-base-surface/30">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white mb-6">Filters</h2>
            <TaskFilter />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-base-dark">
          <div className="flex items-center justify-between border-b section-border border-solid p-6 md:px-10">
            <h2 className="text-2xl font-semibold tracking-tight text-white">All Tasks</h2>
            <Button onClick={openCreateForm} variant="primary" className="px-6 py-2">
              Get Started
            </Button>
          </div>
          
          <div className="flex-1 flex flex-col">
            <TaskList />
          </div>
        </div>
      </div>

      {isFormOpen && <TaskForm />}
      <Toast />
    </div>
  );
}
