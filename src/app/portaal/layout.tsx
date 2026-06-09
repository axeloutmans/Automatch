import ConsumentSidebar from "@/components/portaal/ConsumentSidebar";

export default function PortaalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <ConsumentSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
