import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  const config = {
    success: {
      bg: 'bg-inverse-surface',
      text: 'text-inverse-on-surface',
      iconBg: 'bg-emerald-500',
      icon: 'check',
    },
    error: {
      bg: 'bg-inverse-surface',
      text: 'text-inverse-on-surface',
      iconBg: 'bg-error',
      icon: 'error',
    },
    info: {
      bg: 'bg-inverse-surface',
      text: 'text-inverse-on-surface',
      iconBg: 'bg-primary',
      icon: 'info',
    },
  };

  const c = config[type] || config.success;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 ${c.bg} ${c.text} px-4 py-3 rounded-xl shadow-xl transition-all duration-200`}
    >
      <div
        className={`w-6 h-6 rounded-full ${c.iconBg} text-surface-container-lowest flex items-center justify-center flex-shrink-0`}
      >
        <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
      </div>
      <p className="font-body-sm text-body-sm font-medium">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className={`p-1 rounded ${c.text}/70 hover:opacity-100 transition-colors`}
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}