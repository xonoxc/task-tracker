export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b section-border border-solid bg-base-dark h-16 flex items-center">
      <div className="w-full flex items-center px-6 md:px-8">
        <h1 className="text-[22px] font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-primary tracking-tighter">⚡</span>
          TaskTracker
        </h1>
      </div>
    </header>
  );
}
