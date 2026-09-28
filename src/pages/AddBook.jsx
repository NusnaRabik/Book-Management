import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export default function AddBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    status: 'want_to_read',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Please enter the book title.';
    if (!form.author.trim()) next.author = "Please provide the author's name.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await bookService.create(form);
      setToast({ message: 'Book added successfully', type: 'success' });
      setTimeout(() => navigate('/books'), 800);
    } catch (err) {
      setToast({ message: err.message || 'Failed to add book', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-space-xl py-space-xl">
      <nav className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant mb-space-md">
        <Link to="/books" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">library_books</span>
          <span>My Books</span>
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">
          chevron_right
        </span>
        <span className="text-on-surface font-label-md text-label-md">Add Book</span>
      </nav>

      <div className="mb-space-xl max-w-3xl mx-auto w-full">
        <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
          Add Book
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Add a book to your personal library.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full bg-surface-container-lowest rounded-xl shadow-sm p-space-xl sm:p-8">
        <form className="flex flex-col gap-space-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <label
                className="font-label-lg text-label-lg text-on-surface flex items-center gap-1"
                htmlFor="bookTitle"
              >
                Book Title <span className="text-error">*</span>
              </label>
              <span className="font-body-sm text-body-sm text-outline">Required</span>
            </div>
            <input
              id="bookTitle"
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="e.g. Atomic Habits"
              className={`w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md transition-all outline-none focus:bg-surface-container-lowest focus:shadow-md ${
                errors.title ? 'ring-2 ring-error/40' : ''
              }`}
            />
            {errors.title && (
              <p className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">error</span>
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <label
                className="font-label-lg text-label-lg text-on-surface flex items-center gap-1"
                htmlFor="bookAuthor"
              >
                Author <span className="text-error">*</span>
              </label>
              <span className="font-body-sm text-body-sm text-outline">Required</span>
            </div>
            <input
              id="bookAuthor"
              type="text"
              value={form.author}
              onChange={(e) => update('author', e.target.value)}
              placeholder="e.g. James Clear"
              className={`w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md transition-all outline-none focus:bg-surface-container-lowest focus:shadow-md ${
                errors.author ? 'ring-2 ring-error/40' : ''
              }`}
            />
            {errors.author && (
              <p className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">error</span>
                <span>{errors.author}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-space-sm pt-space-xs">
            <label className="font-label-lg text-label-lg text-on-surface">Reading Status</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              {STATUS_OPTIONS.map((opt) => {
                const selected = form.status === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`relative flex flex-col p-space-md rounded-xl cursor-pointer transition-all hover:shadow-md select-none group ${
                      selected
                        ? 'bg-primary-container shadow-sm'
                        : 'bg-surface-container-low'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={opt.value}
                      checked={selected}
                      onChange={() => update('status', opt.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          selected ? 'text-on-primary' : 'text-primary'
                        }`}
                      >
                        {opt.icon}
                      </span>
                    </div>
                    <div
                      className={`font-label-lg text-label-lg font-semibold ${
                        selected ? 'text-on-primary' : 'text-on-surface'
                      }`}
                    >
                      {opt.label}
                    </div>
                    <p
                      className={`font-body-sm text-body-sm mt-0.5 ${
                        selected ? 'text-on-primary/80' : 'text-on-surface-variant'
                      }`}
                    >
                      {opt.desc}
                    </p>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <label
                className="font-label-lg text-label-lg text-on-surface"
                htmlFor="bookDescription"
              >
                Description
              </label>
              <span className="font-body-sm text-body-sm text-outline">Optional</span>
            </div>
            <textarea
              id="bookDescription"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={4}
              placeholder="Add a short description of the book..."
              className="w-full p-space-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md transition-all outline-none resize-y focus:bg-surface-container-lowest focus:shadow-md"
            />
          </div>

          <div className="pt-space-md flex items-center justify-end gap-space-md">
            <Link
              to="/books"
              className="px-space-lg py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-container-highest transition-colors inline-flex items-center justify-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-space-xl py-2.5 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-all active:scale-[0.99] shadow-sm hover:shadow-md inline-flex items-center gap-2 disabled:opacity-75"
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">
                    progress_activity
                  </span>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Add Book</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  );
}