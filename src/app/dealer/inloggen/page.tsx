"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Car, Loader2, AlertCircle, Eye } from "lucide-react";

export default function DealerInloggenPage() {
  const router = useRouter();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false); const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");
    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 800));
      router.push("/dealer/dashboard");
      return;
    }
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError("E-mailadres of wachtwoord onjuist."); setLoading(false); }
    else router.push("/dealer/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold text-xl text-slate-900 mb-8">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center"><Car className="w-4 h-4 text-white" /></div>
          AutoMatch
        </Link>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Dealer login</h1>
          <p className="text-slate-500 text-sm mb-4">Toegang tot jouw dealer dashboard</p>
          <Link href="/dealer/dashboard">
            <button type="button" className="w-full mb-5 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors">
              ▶ Bekijk demo dashboard — geen account nodig
            </button>
          </Link>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"><AlertCircle className="w-4 h-4" />{error}</div>}
            <div className="space-y-1.5">
              <Label>E-mailadres</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between"><Label>Wachtwoord</Label><Link href="/wachtwoord-vergeten" className="text-xs text-blue-600 hover:underline">Vergeten?</Link></div>
              <div className="relative">
                <Input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className="pr-10" />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><Eye className="w-4 h-4" /></button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-slate-900 text-white rounded-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null} Inloggen
            </Button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-4">Nog geen account? <Link href="/dealer/registreren" className="text-blue-600 font-medium hover:underline">Gratis aanmelden</Link></p>
        </div>
      </div>
    </div>
  );
}
