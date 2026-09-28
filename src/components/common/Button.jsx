const variants = {
  primary:
    'bg-primary-container text-on-primary hover:bg-primary shadow-sm hover:shadow-md',
  secondary:
    'bg-surface-container-high text-on-surface hover:bg-surface-container-highest shadow-xs',
  ghost:
    'bg-surface-container-low hover:bg-surface-container text-on-surface',
  danger: 'bg-error text-on-error hover:bg-error/90 shadow-sm',
  outline:
    'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container hover:shadow',
};

const sizes = {
  sm: 'px-3 py-1.5 text-label-md',
  md: 'px-4 py-2 text-label-lg',
  lg: 'px-6 py-2.5 text-label-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-label-lg transition-all active:scale-[0.99] ${
        variants[variant]
      } ${sizes[size]} ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <>
          <span className="material-symbols-outlined animate-spin text-[18px]">
            progress_activity
          </span>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          )}
        </>
      )}
    </button>
  );
}