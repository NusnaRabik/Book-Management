import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteBookModal from '../components/books/DeleteBookModal';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import Toast from '../components/common/Toast';
import { bookService } from '../services/bookService';

const STATUS_OPTIONS = [
  {
    value: 'want_to_read',
    label: 'Want to Read',
    desc: 'Books you plan to read',
    icon: 'bookmark',
  },
  { value: 'reading', label: 'Reading', desc: 'Currently reading', icon: 'auto_stories' },
  { value: 'completed', label: 'Completed', desc: 'Finished reading', icon: 'task_alt' },
];

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const [form, setForm] = useState({
    title: '',
    author: '',
    status: 'want_to_read',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const loadBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getById(id);
      setForm({
        title: data.title || '',
        author: data.author || '',
        status: data.status === 'want-to-read' ? 'want_to_read' : data.status || 'want_to_read',
        description: data.description || '',
      });
    } catch (err) {
      setError(err.message || 'Failed to load book');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBook();
  }, [id]);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Please enter the book title.';
    if (!form.author.trim()) next.author = "Please enter the author's name.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await bookService.update(id, form);
      setToast({ message: 'Book updated successfully', type: 'success' });
      setTimeout(() => navigate(`/books/${id}`), 800);
    } catch (err) {
      setToast({ message: err.message || 'Failed to update book', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await bookService.remove(id);
      navigate('/books', { replace: true });
    } catch (err) {
      setToast({ message: err.message || 'Failed to delete book', type: 'error' });
      setShowDelete(false);
    }
  };

  if (loading) return <Loading message="Loading book..." />;
  if (error) return <ErrorMessage title="Unable to load book" message={error} onRetry={loadBook} />;

  return (
    <div className="p-space-xl max-w-5xl mx-auto w-full">
      <nav className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant mb-space-md">
        <Link
          to="/books"
          className="hover:text-primary transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">auto_stories</span>
          <span>My Books</span>
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">
          chevron_right
        </span>
        <span className="text-on-surface font-label-md text-label-md">Edit Book</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Edit Book
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Update the information and reading status for this book.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden"
        >
          {/* Preview Hero */}
          <div className="relative bg-surface-container-low p-space-lg flex items-center gap-space-lg overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-primary-container/10 pointer-events-none" />
            <div className="relative flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden shadow-md bg-gradient-to-t from-primary-container to-secondary-container flex flex-col items-center justify-center p-2 text-center text-on-primary">
              <span className="material-symbols-outlined text-[28px] mb-1">book</span>
              <span className="font-label-sm text-[10px] leading-tight font-semibold line-clamp-2 uppercase tracking-wider opacity-90">
                {form.title || 'Untitled Book'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-space-sm mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container/10 text-primary font-label-sm text-label-sm font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>
                    {STATUS_OPTIONS.find((s) => s.value === form.status)?.label || 'Reading'}
                  </span>
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
                {form.title || 'Untitled Book'}
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {form.author || 'Unknown Author'}
              </p>
            </div>
          </div>

          <div className="p-space-xl flex flex-col gap-space-lg">
            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="book-title"
                className="font-label-lg text-label-lg text-on-surface flex items-center justify-between"
              >
                <span>Book Title</span>
                <span className="font-label-sm text-label-sm text-outline">Required</span>
              </label>
              <input
                id="book-title"
                type="text"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Enter book title"
                className={`w-full h-11 px-space-md rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface shadow-sm focus:shadow-md focus:outline-none transition-shadow ${
                  errors.title ? 'ring-2 ring-error/40' : ''
                }`}
              />
              {errors.title && (
                <p className="text-error font-body-sm text-body-sm mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-space-xs">
              <label
                htmlFor="book-author"
                className="font-label-lg text-label-lg text-on-surface flex items-center justify-between"
              >
                <span>Author</span>
                <span className="font-label-sm text-label-sm text-outline">Required</span>
              </label>
              <input
                id="book-author"
                type="text"
                value={form.author}
                onChange={(e) => update('author', e.target.value)}
                placeholder="Author name"
                className={`w-full h-11 px-space-md rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface shadow-sm focus:shadow-md focus:outline-none transition-shadow ${
                  errors.author ? 'ring-2 ring-error/40' : ''
                }`}
              />
              {errors.author && (
                <p className="text-error font-body-sm text-body-sm mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span>{errors.author}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between">
                <span>Reading Status</span>
                <span className="font-label-sm text-label-sm text-primary font-medium">
                  Currently Selected:{' '}
                  {STATUS_OPTIONS.find((s) => s.value === form.status)?.label}
                </span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm p-1.5 bg-surface-container-low rounded-xl">
                {STATUS_OPTIONS.map((opt) => {
                  const selected = form.status === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`group relative flex flex-col p-3 rounded-lg cursor-pointer transition-all ${
                        selected
                          ? 'bg-surface-container-lowest shadow-md ring-2 ring-primary-container'
                          : 'bg-transparent hover:bg-surface-container'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reading-status"
                        value={opt.value}
                        checked={selected}
                        onChange={() => update('status', opt.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-1.5">
                        {selected && (
                          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                        )}
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            selected ? 'text-primary' : 'text-on-surface-variant'
                          }`}
                          style={selected ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                          {opt.icon}
                        </span>
                        <span
                          className={`font-label-md text-label-md ${
                            selected ? 'text-primary font-semibold' : 'text-on-surface'
                          }`}
                        >
                          {opt.label}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] mt-1 ${
                          selected ? 'text-primary font-medium' : 'text-on-surface-variant'
                        }`}
                      >
                        {opt.desc}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="book-desc"
                  className="font-label-lg text-label-lg text-on-surface"
                >
                  Description
                </label>
                <span className="font-label-sm text-label-sm text-outline">Optional</span>
              </div>
              <textarea
                id="book-desc"
                rows={4}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Add a short description of the book..."
                className="w-full p-space-md rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface shadow-sm focus:shadow-md focus:outline-none transition-shadow resize-y leading-relaxed"
              />
            </div>
          </div>

          <div className="px-space-xl py-space-lg bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm w-full sm:w-auto">
              <Link
                to={`/books/${id}`}
                className="w-full sm:w-auto px-space-lg py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:bg-surface-container hover:shadow transition-all text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all disabled:opacity-75"
              >
                {saving ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setShowDelete(true)}
                className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-error hover:underline transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
                <span>Delete this book</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <DeleteBookModal
        open={showDelete}
        bookTitle={form.title}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  );
}