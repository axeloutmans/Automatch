"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Car, Loader2, AlertCircle, Eye, EyeOff, User, Building2 } from "lucide-react";

type Role = "particulier" | "dealer" | null;

export default function InloggenClient() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect");

  const [role, setRole] = useState<Role>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);

  const defaultRedirect = role === "dealer" ? "/dealer/dashboard" : "/portaal";
  const destination = redirect || defaultRedirect;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const isDemoMode =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 800));
      router.push(destination);
      return;
    }

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError("E-mailadres of wachtwoord onjuist.");
      setLoading(false);
    } else {
      router.push(destination);
    }
  }

  async function sendMagicLink() {
    if (!email) { setError("Voer eerst jouw e-mailadres in."); return; }
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/api/auth/callback?next=${destination}` },
    });
    setMagicSent(true);
    setLoading(false);
  }

  /* ── Magic link bevestiging ── */
  if (magicSent) {
    return (
      <Shell>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Controleer jouw e-mail</h1>
        <div className="mt-4 text-center p-5 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-blue-800 font-medium mb-1">Magic link verstuurd</p>
          <p className="text-blue-700 text-sm">
            We hebben een inloglink gestuurd naar <strong>{email}</strong>.
          </p>
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 rounded-full"
          onClick={() => setMagicSent(false)}
        >
          Terug
        </Button>
      </Shell>
    );
  }

  /* ── Rolkeuze ── */
  if (!role) {
    return (
      <Shell>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Inloggen</h1>
        <p className="text-slate-500 text-sm mb-6">Wie ben jij?</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setRole("particulier")}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-slate-900 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-slate-900 flex items-center justify-center transition-colors">
              <User className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-900 text-sm">Particulier</div>
              <div className="text-xs text-slate-400 mt-0.5">Ik zoek een auto</div>
            </div>
          </button>
          <button
            onClick={() => setRole("dealer")}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-slate-100 bg-white hover:border-slate-900 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-slate-900 flex items-center justify-center transition-colors">
              <Building2 className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-900 text-sm">Dealer</div>
              <div className="text-xs text-slate-400 mt-0.5">Ik verkoop auto&apos;s</div>
            </div>
          </button>
        </div>
        <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-1">
          <p className="text-sm text-slate-500">
            Nog geen account?{" "}
            <Link href="/registreren" className="text-blue-600 hover:underline font-medium">
              Particulier registreren
            </Link>
          </p>
          <p className="text-sm text-slate-500">
            Dealer worden?{" "}
            <Link href="/dealer/registreren" className="text-blue-600 hover:underline font-medium">
              Gratis aanmelden
            </Link>
          </p>
        </div>
      </Shell>
    );
  }

  /* ── Loginformulier ── */
  return (
    <Shell>
      {/* Terug naar rolkeuze */}
      <button
        onClick={() => { setRole(null); setError(""); }}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors mb-5"
      >
        ← Terug
      </button>

      {/* Rolbadge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
          {role === "dealer"
            ? <Building2 className="w-4 h-4 text-white" />
            : <User className="w-4 h-4 text-white" />
          }
        </div>
        <div>
          <div className="text-xs text-slate-400">Inloggen als</div>
          <div className="font-semibold text-slate-900 text-sm leading-none">
            {role === "dealer" ? "Dealer" : "Particulier"}
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-5">Welkom terug</h1>

      {/* Demo shortcut voor dealers */}
      {role === "dealer" && (
        <Link href="/dealer/dashboard">
          <button
            type="button"
            className="w-full mb-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            ▶ Bekijk demo dashboard — geen account nodig
          </button>
        </Link>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
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
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label>Wachtwoord</Label>
            <Link href="/wachtwoord-vergeten" className="text-xs text-blue-600 hover:underline">
              Vergeten?
            </Link>
          </div>
          <div className="relative">
            <Input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Inloggen
        </Button>
      </form>

      {/* Magic link alleen voor particulieren */}
      {role === "particulier" && (
        <>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-slate-400">of</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full rounded-full"
            onClick={sendMagicLink}
            disabled={loading}
          >
            Inloggen met magic link
          </Button>
        </>
      )}

      <p className="text-center text-sm text-slate-500 mt-5">
        Nog geen account?{" "}
        <Link
          href={role === "dealer" ? "/dealer/registreren" : "/registreren"}
          className="text-blue-600 hover:underline font-medium"
        >
          {role === "dealer" ? "Gratis aanmelden als dealer" : "Gratis registreren"}
        </Link>
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 font-bold text-xl text-slate-900 mb-8"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          AutoMatch
        </Link>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
