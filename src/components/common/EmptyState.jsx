import { Link } from 'react-router-dom';

export default function EmptyState({
  icon = 'library_books',
  title = 'Nothing here yet',
  description = 'Get started by adding your first item.',
  actionLabel,
  actionTo,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-surface-container-lowest rounded-xl p-16 shadow-sm border border-outline-variant/30">
      <div className="w-20 h-20 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-space-md">
        <span className="material-symbols-outlined text-[42px]">{icon}</span>
      </div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">
        {title}
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg">
        {description}
      </p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center gap-space-xs bg-primary hover:bg-secondary text-on-primary font-label-lg text-label-lg px-space-lg py-2.5 rounded-lg shadow-sm transition-all duration-150"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>{actionLabel}</span>
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-space-xs bg-primary hover:bg-secondary text-on-primary font-label-lg text-label-lg px-space-lg py-2.5 rounded-lg shadow-sm transition-all duration-150"
        >
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}