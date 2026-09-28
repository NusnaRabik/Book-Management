export default function ErrorMessage({
  title = 'Something went wrong',
  message = 'Please try again.',
  onRetry,
  icon = 'cloud_off',
}) {
  return (
    <div className="bg-error-container/40 p-space-lg rounded-xl flex items-start justify-between gap-space-md border border-error-container">
      <div className="flex items-start gap-space-md">
        <div className="w-10 h-10 rounded-lg bg-error text-on-error flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
        <div className="flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            {title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            {message}
          </p>
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-space-xs bg-surface-container-lowest text-on-surface font-label-md text-label-md px-3.5 py-2 rounded-lg shadow-sm hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}