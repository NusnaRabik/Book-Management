export default function DeleteBookModal({ open, bookTitle, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-lg max-w-md w-full border border-outline-variant/40 flex flex-col gap-space-md">
        <div className="flex items-center gap-space-sm text-error">
          <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px] text-error">warning</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface">Delete Book?</h3>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-on-surface">"{bookTitle}"</span>? This action
          cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <button
            type="button"
            onClick={onCancel}
            className="px-space-md py-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-space-md py-space-sm bg-error hover:bg-error/90 text-on-error font-label-lg text-label-lg rounded-lg shadow-sm transition-colors"
          >
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
}