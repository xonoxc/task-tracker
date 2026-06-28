import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-transparent text-primary hover:text-primary-hover border border-primary hover:border-primary-hover shadow-[0_0_15px_rgba(161,120,250,0.2)] hover:shadow-[0_0_20px_rgba(161,120,250,0.4)] disabled:opacity-50 disabled:shadow-none font-semibold tracking-wide',
  secondary: 'bg-base-surface text-white border section-border hover:border-white/30 disabled:opacity-50 font-medium',
  danger: 'bg-transparent text-red-400 border border-red-500/30 hover:border-red-500/60 hover:text-red-300 disabled:opacity-50',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
