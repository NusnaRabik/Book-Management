import { Link } from 'react-router-dom';
import BookTable from '../books/BookTable';

export default function RecentBooks({ books = [], onDelete }) {
  return (
    <section
      aria-labelledby="heading-recent-books"
      className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col"
    >
      <div className="flex items-center justify-between pb-space-md">
        <div>
          <h2
            id="heading-recent-books"
            className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight"
          >
            Recent Books
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Latest additions to your personal catalog
          </p>
        </div>
        <Link
          to="/books"
          className="font-label-md text-label-md text-primary hover:text-secondary font-medium flex items-center gap-1 group"
        >
          <span>View All</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>

      <BookTable books={books} onDelete={onDelete} />
    </section>
  );
}