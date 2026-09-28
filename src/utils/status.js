export const STATUS = {
  READING: 'reading',
  COMPLETED: 'completed',
  WANT_TO_READ: 'want_to_read',
};

export const STATUS_LABELS = {
  [STATUS.READING]: 'Reading',
  [STATUS.COMPLETED]: 'Completed',
  [STATUS.WANT_TO_READ]: 'Want to Read',
};

export function normalizeStatus(status) {
  if (!status) return STATUS.WANT_TO_READ;
  return status.toLowerCase().replace(/-/g, '_');
}

export function statusLabel(status) {
  return STATUS_LABELS[normalizeStatus(status)] || 'Unknown';
}