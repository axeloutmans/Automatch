"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Car, Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function RegistrerenPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", postcode: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 8) { setError("Wachtwoord moet minimaal 8 tekens zijn."); return; }
    setLoading(true); setError("");
    const supabase = createClient();
    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 1000));
      setLoading(false);
      setSuccess(true);
      return;
    }

    const { error: err } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name, postcode: form.postcode },
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (err) { setError(err.message); setLoading(false); }
    else setSuccess(true);
  }

  if (success) return (
    <AuthLayout title="Controleer jouw e-mail" sub="">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-slate-700 mb-1 font-medium">Account aangemaakt!</p>
        <p className="text-sm text-slate-500">Controleer <strong>{form.email}</strong> voor een bevestigingslink.</p>
      </div>
    </AuthLayout>
  );

  return (
    <AuthLayout title="Gratis registreren" sub="Als consument op AutoMatch">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"><AlertCircle className="w-4 h-4" />{error}</div>}
        {[
          { k: "name", label: "Naam", type: "text", placeholder: "Jan de Vries" },
          { k: "email", label: "E-mailadres", type: "email", placeholder: "jan@voorbeeld.nl" },
          { k: "postcode", label: "Postcode", type: "text", placeholder: "1234 AB" },
        ].map(f => (
          <div key={f.k} className="space-y-1.5">
            <Label>{f.label}</Label>
            <Input type={f.type} placeholder={f.placeholder} value={form[f.k as keyof typeof form]} onChange={e => update(f.k, e.target.value)} required />
          </div>
        ))}
        <div className="space-y-1.5">
          <Label>Wachtwoord</Label>
          <div className="relative">
            <Input type={showPw ? "text" : "password"} placeholder="Minimaal 8 tekens" value={form.password} onChange={e => update("password", e.target.value)} required minLength={8} className="pr-10" />
            <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><Eye className="w-4 h-4" /></button>
          </div>
        </div>
        <p className="text-xs text-slate-400">Door te registreren ga je akkoord met onze <Link href="/voorwaarden" className="underline">voorwaarden</Link> en <Link href="/privacy" className="underline">privacybeleid</Link>.</p>
        <Button type="submit" disabled={loading} className="w-full bg-slate-900 text-white rounded-full">
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null} Account aanmaken
        </Button>
      </form>
      <p className="text-center text-sm text-slate-500 mt-4">Al een account? <Link href="/inloggen" className="text-blue-600 hover:underline font-medium">Inloggen</Link></p>
    </AuthLayout>
  );
}

function AuthLayout({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold text-xl text-slate-900 mb-8">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center"><Car className="w-4 h-4 text-white" /></div>
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
