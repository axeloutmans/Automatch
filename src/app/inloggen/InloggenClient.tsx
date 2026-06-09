"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Car, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function InloggenClient() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/portaal";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");

    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 800));
      router.push(redirect);
      return;
    }

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError("E-mailadres of wachtwoord onjuist."); setLoading(false); }
    else router.push(redirect);
  }

  async function sendMagicLink() {
    if (!email) { setError("Voer eerst jouw e-mailadres in."); return; }
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/api/auth/callback?next=${redirect}` } });
    setMagicSent(true); setLoading(false);
  }

  if (magicSent) return (
    <AuthLayout title="Controleer jouw e-mail" sub="">
      <div className="text-center p-5 bg-blue-50 rounded-2xl border border-blue-100">
        <p className="text-blue-800 font-medium mb-1">Magic link verstuurd</p>
        <p className="text-blue-700 text-sm">We hebben een inloglink gestuurd naar <strong>{email}</strong>.</p>
      </div>
      <Button variant="ghost" className="w-full mt-4 rounded-full" onClick={() => setMagicSent(false)}>Terug</Button>
    </AuthLayout>
  );

  return (
    <AuthLayout title="Inloggen" sub="Welkom terug bij AutoMatch">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"><AlertCircle className="w-4 h-4"/>{error}</div>}
        <div className="space-y-1.5">
          <Label>E-mailadres</Label>
          <Input type="email" placeholder="jan@voorbeeld.nl" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between"><Label>Wachtwoord</Label><Link href="/wachtwoord-vergeten" className="text-xs text-blue-600 hover:underline">Vergeten?</Link></div>
          <div className="relative">
            <Input type={showPw?"text":"password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="pr-10" />
            <button type="button" onClick={() => setShowPw(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {showPw?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
            </button>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full">
          {loading?<Loader2 className="w-4 h-4 animate-spin mr-2"/>:null}Inloggen
        </Button>
      </form>
      <div className="relative my-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"/></div><div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-slate-400">of</span></div></div>
      <Button variant="outline" className="w-full rounded-full" onClick={sendMagicLink} disabled={loading}>Inloggen met magic link</Button>
      <p className="text-center text-sm text-slate-500 mt-4">Nog geen account? <Link href="/registreren" className="text-blue-600 hover:underline font-medium">Gratis registreren</Link></p>
      <p className="text-center text-sm text-slate-500 mt-1">Dealer? <Link href="/dealer/inloggen" className="text-blue-600 hover:underline font-medium">Dealer login</Link></p>
    </AuthLayout>
  );
}

function AuthLayout({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold text-xl text-slate-900 mb-8">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center"><Car className="w-4 h-4 text-white"/></div>
          AutoMatch
        </Link>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{title}</h1>
          {sub && <p className="text-slate-500 mb-6 text-sm">{sub}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
