import { Link } from 'react-router-dom';

const ICONS = ['book', 'terminal', 'rocket_launch'];
const ICON_BG = [
  'bg-primary/10 text-primary',
  'bg-secondary/10 text-secondary',
  'bg-tertiary-container/15 text-tertiary',
];

export default function CurrentlyReading({ books = [] }) {
  return (
    <section aria-labelledby="heading-currently-reading" className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <h2
          id="heading-currently-reading"
          className="font-headline-md text-headline-md text-on-surface tracking-tight font-semibold"
        >
          Currently Reading
        </h2>
        <span className="font-label-md text-label-md text-on-surface-variant">
          {books.length} in progress
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {books.map((book, idx) => (
          <article
            key={book.id}
            className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-space-md">
              <div
                className={`w-14 h-20 rounded ${
                  ICON_BG[idx % ICON_BG.length]
                } flex items-center justify-center flex-shrink-0`}
              >
                <span className="material-symbols-outlined text-[26px]">
                  {ICONS[idx % ICONS.length]}
                </span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="inline-flex items-center self-start px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container text-primary font-medium mb-1.5">
                  Reading
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                  {book.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {book.author}
                </p>
              </div>
            </div>
            <div className="mt-space-md pt-space-sm flex justify-end">
              <Link
                to={`/books/${book.id}`}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md py-2 px-3 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>View Book</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}