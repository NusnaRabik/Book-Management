export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-space-md">
      <span className="material-symbols-outlined animate-spin text-primary text-[32px]">
        progress_activity
      </span>
      <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md flex flex-col gap-space-sm border border-outline-variant/30 animate-pulse">
      <div className="w-full h-52 bg-surface-container rounded-lg" />
      <div className="w-20 h-4 bg-surface-container rounded-full" />
      <div className="w-3/4 h-5 bg-surface-container rounded" />
      <div className="w-1/2 h-4 bg-surface-container rounded" />
      <div className="w-full h-8 bg-surface-container rounded mt-space-sm" />
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm h-32 flex flex-col justify-between animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-surface-container" />
      <div className="space-y-2">
        <div className="w-16 h-7 bg-surface-container rounded" />
        <div className="w-32 h-4 bg-surface-container-high rounded" />
      </div>
    </div>
  );
}