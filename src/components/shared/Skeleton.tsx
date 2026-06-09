export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
      <div className="flex items-start gap-3">
        <Skeleton className="w-11 h-11 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonStatGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-50 bg-slate-50 flex gap-4">
        {[2, 1, 1, 1, 1].map((w, i) => (
          <Skeleton key={i} className={`h-4 flex-${w}`} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-slate-50 last:border-0">
          {[2, 1, 1, 1, 1].map((w, j) => (
            <Skeleton key={j} className={`h-4 flex-${w}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
