import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'grid_view' },
  { path: '/books', label: 'My Books', icon: 'auto_stories' },
  { path: '/books/add', label: 'Add Book', icon: 'bookmark_add' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
      <div className="flex flex-col">
        {/* Logo */}
        <div className="h-16 px-space-lg flex items-center gap-space-sm">
          <img
            alt="Book Manager Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1U7tIH3vnC8d-1Uq9bhAp02iEKrysD-mYy5LqcrDf2m_6qiM-qctqlw8TClDUCDJnhWZpsPLDVzwryxmplQuSumGvGMXGxtepBRKQw6jfIK3jiCh4uYXtyZZ4Ofl0fgkO6LHaK-5KB9AuuSDjPCb0D8fL1ZDZvDjgCR6pwIZnRHczpv_BJdSgw5pLaYgmS9seq79om9pLfAyfTqh4Kxk9hn9BJRjjZhoH-L78TeRvm4jmFdi-BaNj8pMaY"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-tight">
              Book Manager
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant tracking-normal">
              Personal Library
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-space-md py-space-sm">
          <nav className="flex flex-col gap-space-xs">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/books'}
                className={({ isActive }) =>
                  `flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-lg text-label-lg transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isActive ? 'text-on-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-space-md bg-surface-container-low">
        <div className="flex items-center justify-between gap-space-sm mb-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-label-md text-on-surface truncate">
                Book Manager User
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                user@example.com
              </p>
            </div>
          </div>
          <button
            type="button"
            title="Logout"
            className="p-space-xs text-on-surface-variant hover:text-error hover:bg-surface-container rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}