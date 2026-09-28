import BookStatusBadge from './BookStatusBadge';
import BookActions from './BookActions';
import { formatDate } from '../../utils/formatDate';

const COVER_ICONS = ['auto_stories', 'terminal', 'rocket_launch', 'code', 'psychology'];

export default function BookTable({ books, onDelete }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider rounded-lg">
            <th className="py-3 px-space-md font-medium rounded-l-lg" scope="col">
              Book
            </th>
            <th className="py-3 px-space-md font-medium" scope="col">
              Author
            </th>
            <th className="py-3 px-space-md font-medium" scope="col">
              Status
            </th>
            <th className="py-3 px-space-md font-medium" scope="col">
              Date Added
            </th>
            <th className="py-3 px-space-md font-medium text-right rounded-r-lg" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-high/40">
          {books.map((book) => {
            const icon = COVER_ICONS[book.title?.length % COVER_ICONS.length] || 'auto_stories';
            return (
              <tr
                key={book.id}
                className="hover:bg-surface-container-low/50 transition-colors group"
              >
                <td className="py-3.5 px-space-md">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div className="w-8 h-10 rounded bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[18px]">{icon}</span>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-medium truncate max-w-xs">
                      {book.title}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-space-md font-body-md text-body-md text-on-surface-variant whitespace-nowrap">
                  {book.author}
                </td>
                <td className="py-3.5 px-space-md whitespace-nowrap">
                  <BookStatusBadge status={book.status} />
                </td>
                <td className="py-3.5 px-space-md font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap">
                  {formatDate(book.createdAt || book.dateAdded)}
                </td>
                <td className="py-3.5 px-space-md text-right whitespace-nowrap">
                  <BookActions
                    bookId={book.id}
                    bookTitle={book.title}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}