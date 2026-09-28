import { useCallback, useEffect, useState } from 'react';
import { bookService } from '../services/bookService';

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = useCallback(async (id) => {
    await bookService.remove(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { books, loading, error, reload: load, remove };
}