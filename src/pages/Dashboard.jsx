import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import CurrentlyReading from '../components/dashboard/CurrentlyReading';
import RecentBooks from '../components/dashboard/RecentBooks';
import DeleteBookModal from '../components/books/DeleteBookModal';
import Toast from '../components/common/Toast';
import { SkeletonStatCard, SkeletonCard } from '../components/common/Loading';
import { bookService } from '../services/bookService';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getAll();
      setBooks(data);
    } catch (err) {
      setError(err.message || 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const stats = {
    total: books.length,
    reading: books.filter((b) => b.status === 'reading').length,
    completed: books.filter((b) => b.status === 'completed').length,
    wantToRead: books.filter((b) => b.status === 'want_to_read' || b.status === 'want-to-read').length,
  };

  const currentlyReading = books.filter((b) => b.status === 'reading').slice(0, 3);
  const recent = [...books]
    .sort((a, b) => new Date(b.createdAt || b.dateAdded) - new Date(a.createdAt || a.dateAdded))
    .slice(0, 5);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await bookService.remove(deleteTarget.id);
      setBooks((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      setToast({ message: `"${deleteTarget.title}" deleted successfully`, type: 'success' });
    } catch (err) {
      setToast({ message: err.message || 'Failed to delete book', type: 'error' });
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="px-space-xl py-space-lg flex flex-col gap-space-xl max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight flex items-center gap-space-xs">
            <span>Good morning</span>
            <span className="inline-block hover:rotate-12 transition-transform duration-200">
              👋
            </span>
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Manage your personal library and keep track of your books.
          </p>
        </div>
        <div className="flex items-center gap-space-sm self-start md:self-auto">
          <Link
            to="/books/add"
            className="inline-flex items-center gap-space-xs bg-primary hover:bg-secondary text-on-primary font-label-lg text-label-lg px-space-md py-2.5 rounded-lg shadow-sm transition-all duration-150 active:scale-98"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add Book</span>
          </Link>
        </div>
      </header>

      {error ? (
        <div className="bg-error-container/40 p-space-lg rounded-xl flex items-start justify-between gap-space-md border border-error-container">
          <div className="flex items-start gap-space-md">
            <div className="w-10 h-10 rounded-lg bg-error text-on-error flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[24px]">cloud_off</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Connection Error
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Unable to load books. Check your connection or API Gateway endpoint.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadBooks}
            className="inline-flex items-center gap-space-xs bg-surface-container-lowest text-on-surface font-label-md text-label-md px-3.5 py-2 rounded-lg shadow-sm hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span>Try again</span>
          </button>
        </div>
      ) : loading ? (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonStatCard key={i} />
            ))}
          </section>
          <section className="flex flex-col gap-space-sm">
            <div className="w-48 h-6 bg-surface-container rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </section>
        </>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center bg-surface-container-lowest rounded-xl p-16 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-space-md">
            <span className="material-symbols-outlined text-[42px]">library_books</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">
            Your library is empty
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg">
            Add your first book to start building your personal library and tracking your
            reading journey.
          </p>
          <Link
            to="/books/add"
            className="inline-flex items-center gap-space-xs bg-primary hover:bg-secondary text-on-primary font-label-lg text-label-lg px-space-lg py-2.5 rounded-lg shadow-sm transition-all duration-150"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add Book</span>
          </Link>
        </div>
      ) : (
        <>
          <section
            aria-label="Library statistics overview"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md"
          >
            <StatCard
              label="Total Books"
              value={stats.total}
              helper="Books in your library"
              icon="library_books"
              variant="primary"
            />
            <StatCard
              label="Reading"
              value={stats.reading}
              helper="Currently reading"
              icon="menu_book"
              variant="reading"
            />
            <StatCard
              label="Completed"
              value={stats.completed}
              helper="Books completed"
              icon="check_circle"
              variant="completed"
            />
            <StatCard
              label="Want to Read"
              value={stats.wantToRead}
              helper="Books in your backlog"
              icon="bookmark"
              variant="backlog"
            />
          </section>

          {currentlyReading.length > 0 && <CurrentlyReading books={currentlyReading} />}

          <RecentBooks books={recent} onDelete={(id, title) => setDeleteTarget({ id, title })} />
        </>
      )}

      <DeleteBookModal
        open={!!deleteTarget}
        bookTitle={deleteTarget?.title}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}