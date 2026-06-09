"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import {
  Car, Loader2, AlertCircle, CheckCircle, Eye, EyeOff,
  BadgeCheck, ChevronRight, ChevronLeft
} from "lucide-react";

const STEPS = ["Account", "Bedrijf", "Klaar"];

export default function DealerRegistrerenPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: "", password: "", companyName: "", kvk: "", postcode: "", city: "", phone: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const u = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  async function handleFinish() {
    if (form.password.length < 8) { setError("Wachtwoord minimaal 8 tekens."); return; }
    if (!form.kvk.match(/^\d{8}$/)) { setError("KvK-nummer moet 8 cijfers zijn."); return; }
    setLoading(true); setError("");

    const supabase = createClient();

    // Demo mode: Supabase not configured
    const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

    if (isDemoMode) {
      await new Promise(r => setTimeout(r, 1200)); // simulate network
      setLoading(false);
      setDone(true);
      return;
    }

    const { data, error: err } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          role: "dealer",
          company_name: form.companyName,
          kvk: form.kvk,
          postcode: form.postcode,
          city: form.city,
          phone: form.phone,
        },
        emailRedirectTo: `${location.origin}/api/auth/callback?next=/dealer/dashboard`,
      },
    });

    if (err) { setError(err.message); setLoading(false); return; }

    if (data.user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from("dealers").insert({
        id: data.user.id,
        company_name: form.companyName,
        email: form.email,
        phone: form.phone,
        kvk: form.kvk,
        postcode: form.postcode,
        city: form.city,
        credits: 5,
        plan: "starter",
      }).catch(() => {}); // non-blocking
    }
    setDone(true);
  }

  if (done) return (
    <Layout>
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Account aangemaakt!</h2>
        <p className="text-slate-500 mb-1">Bevestig jouw e-mailadres via de link die we hebben verstuurd naar <strong>{form.email}</strong>.</p>
        <p className="text-slate-400 text-sm mb-6">Daarna ontvang je <strong>5 gratis credits</strong> om de eerste leads te openen.</p>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 mb-6">
          <strong>Wat nu?</strong> Na verificatie en KvK-check (1 werkdag) activeren wij jouw account.
        </div>
        <Link href="/dealer/inloggen">
          <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-8">
            Naar dealer login →
          </Button>
        </Link>
      </div>
    </Layout>
  );

  return (
    <Layout>
      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              i < step ? "bg-green-100 text-green-700" : i === step ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400"
            }`}>
              {i < step ? <CheckCircle className="w-3 h-3" /> : null}
              {s}
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-green-200" : "bg-slate-100"}`} />}
          </div>
        ))}
      </div>

      {error && <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 mb-4"><AlertCircle className="w-4 h-4" />{error}</div>}

      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Account aanmaken</h2>
          <div className="space-y-1.5">
            <Label>E-mailadres</Label>
            <Input type="email" placeholder="info@jouwbedrijf.nl" value={form.email} onChange={e => u("email", e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label>Wachtwoord</Label>
            <div className="relative">
              <Input type={showPw ? "text" : "password"} placeholder="Minimaal 8 tekens" value={form.password} onChange={e => u("password", e.target.value)} className="pr-10" />
              <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><Eye className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-sm text-blue-800 flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-blue-500" />
            5 gratis credits bij registratie — geen creditcard vereist
          </div>
          <Button onClick={() => { if (!form.email || !form.password) { setError("Vul alle velden in."); return; } setError(""); setStep(1); }} className="w-full bg-slate-900 text-white rounded-full">
            Volgende <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Bedrijfsgegevens</h2>
          {[
            { k: "companyName", label: "Bedrijfsnaam", placeholder: "AutoHuis Rotterdam B.V." },
            { k: "kvk", label: "KvK-nummer", placeholder: "12345678", pattern: "\\d{8}" },
            { k: "phone", label: "Telefoonnummer", placeholder: "+31 10 123 4567" },
            { k: "city", label: "Plaats", placeholder: "Rotterdam" },
            { k: "postcode", label: "Postcode", placeholder: "3011 AB" },
          ].map(f => (
            <div key={f.k} className="space-y-1.5">
              <Label>{f.label}</Label>
              <Input placeholder={f.placeholder} value={form[f.k as keyof typeof form]} onChange={e => u(f.k, e.target.value)} />
            </div>
          ))}
          <p className="text-xs text-slate-400">Jouw KvK-nummer wordt geverifieerd via de KvK API. Dit duurt 1 werkdag.</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(0)} className="rounded-full"><ChevronLeft className="w-4 h-4 mr-1" /> Terug</Button>
            <Button onClick={handleFinish} disabled={loading} className="flex-1 bg-slate-900 text-white rounded-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Account aanmaken
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 font-bold text-xl text-slate-900 mb-8">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center"><Car className="w-4 h-4 text-white" /></div>
          AutoMatch
        </Link>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">{children}</div>
        <p className="text-center text-xs text-slate-400 mt-4">
          Al een account? <Link href="/dealer/inloggen" className="text-blue-600 hover:underline">Inloggen</Link>
        </p>
      </div>
    </div>
  );
}
