import { Suspense } from "react";
import InloggenClient from "./InloggenClient";

export default function InloggenPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin"/></div>}>
      <InloggenClient />
    </Suspense>
  );
}
