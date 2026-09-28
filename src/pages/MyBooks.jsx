import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/books/BookCard';
import DeleteBookModal from '../components/books/DeleteBookModal';
import Toast from '../components/common/Toast';
import { SkeletonCard } from '../components/common/Loading';
import { bookService } from '../services/bookService';

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

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

  const stats = useMemo(() => {
    return {
      total: books.length,
      reading: books.filter((b) => b.status === 'reading').length,
      completed: books.filter((b) => b.status === 'completed').length,
      wantToRead: books.filter(
        (b) => b.status === 'want_to_read' || b.status === 'want-to-read'
      ).length,
    };
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((b) => {
        const s = b.status === 'want-to-read' ? 'want_to_read' : b.status;
        return s === statusFilter;
      });
    }

    result.sort((a, b) => {
      if (sortBy === 'title') return a.title?.localeCompare(b.title);
      if (sortBy === 'author') return a.author?.localeCompare(b.author);
      return new Date(b.createdAt || b.dateAdded) - new Date(a.createdAt || a.dateAdded);
    });

    return result;
  }, [books, search, statusFilter, sortBy]);

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

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setSortBy('recent');
  };

  return (
    <div className="px-space-xl py-space-xl max-w-7xl w-full mx-auto flex flex-col gap-space-xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <h1 className="font-headline-xl text-headline-xl text-on-surface">My Books</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage and organize the books in your personal library.
          </p>
        </div>
        <Link
          to="/books/add"
          className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-md hover:shadow-lg transition-all self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>+ Add Book</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-outline-variant/30">
          <div className="w-12 h-12 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">library_books</span>
          </div>
          <div className="min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Total Books
            </span>
            <p className="font-headline-md text-headline-md text-on-surface leading-tight mt-0.5">
              {stats.total}
            </p>
            <span className="font-body-sm text-[11px] text-outline">In your library</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-outline-variant/30">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">menu_book</span>
          </div>
          <div className="min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Reading
            </span>
            <p className="font-headline-md text-headline-md text-on-surface leading-tight mt-0.5">
              {stats.reading}
            </p>
            <span className="font-body-sm text-[11px] text-outline">Currently reading</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-outline-variant/30">
          <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">check_circle</span>
          </div>
          <div className="min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Completed
            </span>
            <p className="font-headline-md text-headline-md text-on-surface leading-tight mt-0.5">
              {stats.completed}
            </p>
            <span className="font-body-sm text-[11px] text-outline">Finished reading</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md border border-outline-variant/30">
          <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">bookmark</span>
          </div>
          <div className="min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Want to Read
            </span>
            <p className="font-headline-md text-headline-md text-on-surface leading-tight mt-0.5">
              {stats.wantToRead}
            </p>
            <span className="font-body-sm text-[11px] text-outline">In backlog</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md border border-outline-variant/30">
        <div className="relative flex-1 min-w-[260px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books by title or author..."
            className="w-full pl-10 pr-space-md py-space-xs bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_rgba(79,70,229,0.25)] transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[18px] pointer-events-none">
              filter_list
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-9 pr-8 py-space-xs bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg outline-none cursor-pointer hover:bg-surface-container transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
              <option value="want_to_read">Want to Read</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 text-outline text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>

          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[18px] pointer-events-none">
              sort
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-9 pr-8 py-space-xs bg-surface-container-low text-on-surface font-label-md text-label-md rounded-lg outline-none cursor-pointer hover:bg-surface-container transition-colors"
            >
              <option value="recent">Recently Added</option>
              <option value="title">Title A-Z</option>
              <option value="author">Author A-Z</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 text-outline text-[18px] pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {error ? (
        <div className="bg-error-container/40 p-space-lg rounded-xl flex items-center justify-between border border-error-container">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Failed to load books. {error}
          </p>
          <button
            type="button"
            onClick={loadBooks}
            className="inline-flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2 rounded-lg shadow-sm hover:bg-surface-container transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Try again
          </button>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredBooks.length === 0 ? (
        books.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl text-center shadow-sm flex flex-col items-center justify-center py-16 border border-outline-variant/30">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-primary mb-space-md">
              <span className="material-symbols-outlined text-[36px]">auto_stories</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
              Your library is empty
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-lg">
              Your personal book collection is waiting to be built. Add your first book to
              get started.
            </p>
            <Link
              to="/books/add"
              className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add First Book</span>
            </Link>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl text-center shadow-sm flex flex-col items-center justify-center py-16 border border-outline-variant/30">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-outline mb-space-md">
              <span className="material-symbols-outlined text-[36px]">search_off</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-xs">
              No books found
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-lg">
              No titles matched your current search or status filter. Try clearing your
              search query or choosing another status.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-space-md py-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg transition-all duration-300">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={(id, title) => setDeleteTarget({ id, title })}
            />
          ))}
        </div>
      )}

      <DeleteBookModal
        open={!!deleteTarget}
        bookTitle={deleteTarget?.title}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  );
}