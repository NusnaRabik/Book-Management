import api from './api';

// Normalize backend fields to frontend-friendly shape
const normalize = (raw) => ({
  id: raw.id || raw.bookId || raw.book_id,
  title: raw.title,
  author: raw.author,
  status: (raw.status || 'want_to_read').toLowerCase().replace(/-/g, '_'),
  description: raw.description || '',
  coverUrl: raw.coverUrl || raw.cover_url || null,
  createdAt: raw.createdAt || raw.created_at || raw.dateAdded || null,
  updatedAt: raw.updatedAt || raw.updated_at || null,
});

const denormalize = (book) => ({
  title: book.title,
  author: book.author,
  status: book.status,
  description: book.description,
});

export const bookService = {
  async getAll() {
    const { data } = await api.get('/books');
    const list = Array.isArray(data) ? data : data.items || [];
    return list.map(normalize);
  },

  async getById(id) {
    const { data } = await api.get(`/books/${id}`);
    return normalize(data);
  },

  async create(book) {
    const { data } = await api.post('/books', denormalize(book));
    return normalize(data);
  },

  async update(id, book) {
    const { data } = await api.put(`/books/${id}`, denormalize(book));
    return normalize(data);
  },

  async remove(id) {
    await api.delete(`/books/${id}`);
    return true;
  },
};