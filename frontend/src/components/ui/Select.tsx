import type { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold tracking-wide text-gray-300">{label}</label>
      )}
      <select
        className={`rounded-lg border border-white/10 bg-base-dark/50 px-3 py-2.5 text-sm text-white outline-none transition-all hover:border-white/20 focus:border-primary focus:ring-1 focus:ring-primary appearance-none ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-base-dark text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
