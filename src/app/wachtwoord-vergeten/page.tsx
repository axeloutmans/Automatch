"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Car, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function WachtwoordVergetenPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");

    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 800));
      setSent(true); setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/api/auth/callback?next=/portaal/instellingen`,
    });
    if (err) { setError(err.message); setLoading(false); }
    else setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold text-xl text-slate-900 mb-8">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          AutoMatch
        </Link>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 mb-2">E-mail verstuurd</h1>
              <p className="text-slate-500 text-sm mb-5">
                Als <strong>{email}</strong> bij ons bekend is, ontvang je een link om jouw wachtwoord opnieuw in te stellen.
              </p>
              <Link href="/inloggen">
                <Button variant="outline" className="w-full rounded-full">Terug naar inloggen</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Wachtwoord vergeten</h1>
              <p className="text-slate-500 text-sm mb-6">Voer jouw e-mailadres in. We sturen een resetlink.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    <AlertCircle className="w-4 h-4" />{error}
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label>E-mailadres</Label>
                  <Input
                    type="email"
                    placeholder="jan@voorbeeld.nl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-slate-900 text-white rounded-full">
                  {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  Resetlink versturen
                </Button>
              </form>
              <p className="text-center text-sm text-slate-500 mt-4">
                <Link href="/inloggen" className="text-blue-600 hover:underline">← Terug naar inloggen</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
