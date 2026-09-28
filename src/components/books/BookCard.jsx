import { Link } from 'react-router-dom';
import BookStatusBadge from './BookStatusBadge';
import { formatDate } from '../../utils/formatDate';

const COVER_FALLBACK_ICONS = ['book', 'terminal', 'rocket_launch', 'code', 'psychology'];

export default function BookCard({ book, onDelete }) {
  const icon = COVER_FALLBACK_ICONS[book.title?.length % COVER_FALLBACK_ICONS.length] || 'book';

  return (
    <div className="book-card bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden border border-outline-variant/30 group">
      <div>
        <div className="relative bg-surface-container-low p-space-md flex items-center justify-center overflow-hidden">
          <div className="relative w-36 h-52 rounded-lg shadow-md overflow-hidden transform group-hover:-translate-y-1 transition-transform duration-300">
            {book.coverUrl ? (
              <img
                alt={`${book.title} cover`}
                className="w-full h-full object-cover"
                src={book.coverUrl}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-t from-primary-container to-secondary-container flex flex-col items-center justify-center p-3 text-center text-on-primary">
                <span className="material-symbols-outlined text-[40px] mb-2">{icon}</span>
                <span className="font-label-sm text-[10px] leading-tight font-semibold line-clamp-2 uppercase tracking-wider opacity-90">
                  {book.title}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 via-transparent to-transparent flex flex-col justify-end p-2.5">
              <p className="text-white font-headline-sm text-[12px] leading-tight font-bold line-clamp-2">
                {book.title}
              </p>
              <span className="text-[10px] text-white/80">{book.author}</span>
            </div>
          </div>
        </div>

        <div className="p-space-md flex flex-col gap-space-xs">
          <div>
            <BookStatusBadge status={book.status} />
          </div>
          <div className="mt-1">
            <h2 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
              {book.title}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              {book.author}
            </p>
          </div>
          <p className="font-body-sm text-[11px] text-outline mt-1">
            Added {formatDate(book.createdAt || book.dateAdded)}
          </p>
        </div>
      </div>

      <div className="px-space-md py-space-sm bg-surface-container-low flex items-center justify-between border-t border-outline-variant/20">
        <Link
          to={`/books/${book.id}`}
          className="px-space-sm py-1 rounded bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          <span>View</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            to={`/books/${book.id}/edit`}
            title="Edit Book"
            className="p-1 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-colors flex items-center"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </Link>
          <button
            type="button"
            title="Delete Book"
            onClick={() => onDelete?.(book.id, book.title)}
            className="p-1 rounded text-on-surface-variant hover:text-error hover:bg-surface-container-lowest transition-colors flex items-center"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}