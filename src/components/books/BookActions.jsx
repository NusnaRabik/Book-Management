import { Link } from 'react-router-dom';

export default function BookActions({ bookId, bookTitle, onDelete }) {
  return (
    <div className="inline-flex items-center gap-1">
      <Link
        to={`/books/${bookId}`}
        title="View details"
        className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">visibility</span>
      </Link>
      <Link
        to={`/books/${bookId}/edit`}
        title="Edit book"
        className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">edit</span>
      </Link>
      <button
        type="button"
        title="Delete book"
        onClick={() => onDelete?.(bookId, bookTitle)}
        className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">delete</span>
      </button>
    </div>
  );
}