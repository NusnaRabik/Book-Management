import api from './api';

function normalizeStatus(status) {
  if (!status) return '';

  return status
    .toString()
    .trim()
    .toLowerCase()
    .replace(/-/g, '_')
    .replace(/\s+/g, '_');
}

function normalize(raw) {
  return {
    id: raw.id || '',
    title: raw.title || '',
    author: raw.author || '',
    category: raw.category || '',
    year: raw.year || '',
    status: normalizeStatus(raw.status),
    description: raw.description || '',
    createdAt: raw.createdAt || null,
    updatedAt: raw.updatedAt || null,
  };
}

function denormalize(book) {
  return {
    title: book.title,
    author: book.author,
    category: book.category || '',
    year: book.year
      ? Number(book.year)
      : new Date().getFullYear(),
    status: normalizeStatus(book.status),
    description: book.description || '',
  };
}

export const bookService = {
  // Get all books
  async getAll() {
    const { data } = await api.get('/books');

    const list = Array.isArray(data)
      ? data
      : data.books || [];

    return list.map(normalize);
  },

  // Get one book
  async getById(id) {
    const { data } = await api.get(`/books/${id}`);

    const book = data.book || data;

    return normalize(book);
  },

  // Create a book
  async create(book) {
    const { data } = await api.post(
      '/books',
      denormalize(book)
    );

    // Lambda returns: { message, book }
    return normalize(data.book || data);
  },

  // Update a book
  async update(id, book) {
    const { data } = await api.put(
      `/books/${id}`,
      denormalize(book)
    );

    // Lambda returns: { message, book }
    return normalize(data.book || data);
  },

  // Delete a book
  async remove(id) {
    await api.delete(`/books/${id}`);

    return true;
  },
};
