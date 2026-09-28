const STATUS_CONFIG = {
  reading: {
    label: 'Reading',
    classes: 'bg-surface-container text-primary',
    dot: 'bg-primary',
    showDot: true,
  },
  completed: {
    label: 'Completed',
    classes: 'bg-emerald-50 text-emerald-700',
    icon: 'check_circle',
    showIcon: true,
  },
  want_to_read: {
    label: 'Want to Read',
    classes: 'bg-surface-container-high text-on-surface-variant',
    icon: 'bookmark_border',
    showIcon: true,
  },
};

export default function BookStatusBadge({ status, size = 'md' }) {
  const key = status === 'want-to-read' ? 'want_to_read' : status;
  const config = STATUS_CONFIG[key] || STATUS_CONFIG.want_to_read;

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-label-sm'
      : 'px-2.5 py-1 text-label-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-label-sm ${sizeClasses} ${config.classes} font-medium`}
    >
      {config.showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      )}
      {config.showIcon && (
        <span className="material-symbols-outlined text-[14px]">{config.icon}</span>
      )}
      {config.label}
    </span>
  );
}

export { STATUS_CONFIG };