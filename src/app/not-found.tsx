import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mx-auto mb-6">
        <Car className="w-8 h-8 text-white" />
      </div>
      <div className="text-8xl font-bold text-slate-200 mb-2">404</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-3">Pagina niet gevonden</h1>
      <p className="text-slate-500 max-w-sm mb-8">
        De pagina die je zoekt bestaat niet (meer). Misschien is de URL veranderd of heb je een typfout gemaakt.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/">
          <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full gap-2">
            <ArrowLeft className="w-4 h-4" /> Terug naar home
          </Button>
        </Link>
        <Link href="/zoeken">
          <Button variant="outline" className="rounded-full gap-2">
            <Search className="w-4 h-4" /> Auto zoeken
          </Button>
        </Link>
      </div>
    </div>
  );
}
