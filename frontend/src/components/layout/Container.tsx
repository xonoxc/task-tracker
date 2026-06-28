import type { ReactNode } from 'react';

export function Container({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      {children}
    </main>
  );
}
