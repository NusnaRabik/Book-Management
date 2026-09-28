const VARIANTS = {
  primary: {
    iconBg: 'bg-surface-container',
    iconColor: 'text-primary',
    valueColor: 'text-on-surface',
  },
  reading: {
    iconBg: 'bg-surface-container',
    iconColor: 'text-primary',
    valueColor: 'text-primary',
  },
  completed: {
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-700',
    valueColor: 'text-on-surface',
  },
  backlog: {
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-800',
    valueColor: 'text-on-surface',
  },
};

export default function StatCard({ label, value, helper, icon, variant = 'primary' }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  return (
    <article className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-150">
      <div className="flex items-center justify-between">
        <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
          {label}
        </span>
        <div
          className={`w-10 h-10 rounded-lg ${v.iconBg} ${v.iconColor} flex items-center justify-center`}
        >
          <span className="material-symbols-outlined text-[22px]">{icon}</span>
        </div>
      </div>
      <div className="mt-4">
        <div
          className={`font-headline-xl text-headline-xl ${v.valueColor} font-bold tracking-tight`}
        >
          {value}
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{helper}</p>
      </div>
    </article>
  );
}