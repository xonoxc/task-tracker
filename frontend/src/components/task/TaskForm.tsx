import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Select } from '~/components/ui/Select';
import { Modal } from '~/components/ui/Modal';
import { useTask, useCreateTask, useUpdateTask } from '~/hooks/use-tasks';
import { useUIStore } from '~/store/ui.store';
import type { CreateTaskInput, TaskStatus, TaskPriority } from '~/types/task';

export function TaskForm() {
  const isOpen = useUIStore((s) => s.isFormOpen);
  const editingTaskId = useUIStore((s) => s.editingTaskId);
  const closeForm = useUIStore((s) => s.closeForm);
  const addNotification = useUIStore((s) => s.addNotification);

  const { data: existingTask } = useTask(editingTaskId);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const isEditing = !!editingTaskId;
  const isPending = createTask.isPending || updateTask.isPending;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description ?? '');
      setStatus(existingTask.status);
      setPriority(existingTask.priority);
      setDueDate(existingTask.dueDate ? existingTask.dueDate.slice(0, 10) : '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
      setDueDate('');
    }
    setErrors({});
  }, [existingTask, isOpen]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (title.length > 100) errs.title = 'Title must be under 100 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data: CreateTaskInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    };

    if (isEditing && editingTaskId) {
      updateTask.mutate(
        { id: editingTaskId, data },
        {
          onSuccess: () => {
            addNotification({ type: 'success', message: 'Task updated' });
            closeForm();
          },
          onError: () =>
            addNotification({ type: 'error', message: 'Failed to update task' }),
        },
      );
    } else {
      createTask.mutate(data, {
        onSuccess: () => {
          addNotification({ type: 'success', message: 'Task created' });
          closeForm();
        },
        onError: () =>
          addNotification({ type: 'error', message: 'Failed to create task' }),
      });
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeForm}
      title={isEditing ? 'Edit Task' : 'New Task'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          placeholder="What needs to be done?"
          autoFocus
        />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details..."
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />
        </div>
        <Input
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" type="button" onClick={closeForm}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            {isEditing ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
