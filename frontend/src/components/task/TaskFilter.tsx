import { useState, useEffect } from 'react';
import { Select } from '~/components/ui/Select';
import { Input } from '~/components/ui/Input';
import { useUIStore } from '~/store/ui.store';
import { useDebounce } from '~/hooks/use-debounce';

export function TaskFilter() {
  const filters = useUIStore((s) => s.filters);
  const setFilters = useUIStore((s) => s.setFilters);

  const [localSearch, setLocalSearch] = useState(filters.search ?? '');
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    setFilters({ search: debouncedSearch });
  }, [debouncedSearch, setFilters]);

  useEffect(() => {
    setLocalSearch(filters.search ?? '');
  }, [filters.search]);

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Search"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        placeholder="Type to search..."
        className="w-full bg-transparent border-white/10 rounded-none shadow-none"
      />
      <Select
        label="Status"
        value={filters.status ?? 'all'}
        onChange={(e) => setFilters({ status: e.target.value as never })}
        options={[
          { value: 'all', label: 'All Statuses' },
          { value: 'pending', label: 'Pending' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
        ]}
        className="w-full bg-transparent border-white/10 rounded-none shadow-none"
      />
      <Select
        label="Priority"
        value={filters.priority ?? 'all'}
        onChange={(e) => setFilters({ priority: e.target.value as never })}
        options={[
          { value: 'all', label: 'All Priorities' },
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ]}
        className="w-full bg-transparent border-white/10 rounded-none shadow-none"
      />
    </div>
  );
}
