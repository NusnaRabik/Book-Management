export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-xl">
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-xs rounded-lg shadow-sm w-96">
          <span className="material-symbols-outlined text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search books by title or author..."
            className="bg-transparent border-0 outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-sm pl-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>
          <span className="material-symbols-outlined text-outline text-[18px]">
            expand_more
          </span>
        </div>
      </div>
    </header>
  );
}