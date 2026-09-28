export function formatDate(input) {
  if (!input) return '—';
  const date = new Date(input);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}