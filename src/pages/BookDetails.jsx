import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookStatusBadge from '../components/books/BookStatusBadge';
import DeleteBookModal from '../components/books/DeleteBookModal';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { bookService } from '../services/bookService';
import { formatDate } from '../utils/formatDate';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const loadBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getById(id);
      setBook(data);
    } catch (err) {
      setError(err.message || 'Failed to load book');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await bookService.remove(id);
      navigate('/books', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to delete book');
    }
  };

  if (loading) return <Loading message="Loading book details..." />;
  if (error) return <ErrorMessage title="Unable to load book" message={error} onRetry={loadBook} />;
  if (!book) return null;

  return (
    <div className="px-space-xl py-space-lg flex flex-col gap-space-lg max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <Link
            to="/books"
            className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md w-fit group"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span>Back to Books</span>
          </Link>
          <div className="flex items-center gap-space-sm">
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              Book Details
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant">
              ID: #{book.id?.slice(0, 8)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-sm">
          <Link
            to={`/books/${id}/edit`}
            className="inline-flex items-center gap-space-xs px-4 py-2 bg-surface-container-lowest text-on-surface rounded-lg shadow-sm hover:bg-surface-container hover:shadow transition-all font-label-lg text-label-lg"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              edit
            </span>
            <span>Edit Book</span>
          </Link>
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-space-xs px-4 py-2 bg-error-container/30 text-error rounded-lg shadow-sm hover:bg-error-container/60 transition-all font-label-lg text-label-lg"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            <span>Delete Book</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-56 aspect-[2/3] rounded-xl overflow-hidden shadow-xl shadow-slate-900/10 relative transition-transform duration-300 group-hover:scale-[1.02]">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-t from-primary-container to-secondary-container flex flex-col items-center justify-center p-4 text-center text-on-primary">
                  <span className="material-symbols-outlined text-[48px] mb-2">book</span>
                  <span className="font-label-sm text-[11px] uppercase tracking-wider opacity-90 line-clamp-3">
                    {book.title}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-space-lg">
              <BookStatusBadge status={book.status} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col gap-space-md">
            <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight mt-space-xs">
              {book.title}
            </h2>
            <p className="font-headline-md text-headline-md text-on-surface-variant font-normal">
              By{' '}
              <span className="text-on-surface font-medium underline decoration-surface-variant underline-offset-4">
                {book.author}
              </span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-md pt-space-md mt-space-sm bg-surface-container-low rounded-xl p-space-lg">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Status
                </span>
                <div className="mt-1">
                  <BookStatusBadge status={book.status} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Created Date
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  {formatDate(book.createdAt || book.dateAdded)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Updated Date
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface mt-1">
                  {formatDate(book.updatedAt || book.createdAt || book.dateAdded)}
                </span>
              </div>
            </div>
          </div>

          {book.description && (
            <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  subject
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Book Overview
                </h3>
              </div>
              <div className="space-y-space-md text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
                {book.description.split('\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteBookModal
        open={showDelete}
        bookTitle={book.title}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}