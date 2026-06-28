import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold tracking-wide text-gray-300">{label}</label>
      )}
      <input
        className={`rounded-lg border bg-base-dark/50 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary ${
          error ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-medium text-red-400">{error}</span>}
    </div>
  );
}
