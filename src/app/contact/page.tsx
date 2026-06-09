"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const u = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Contact</h1>
          <p className="text-xl text-slate-500">Vragen, feedback of samenwerken? We reageren binnen 1 werkdag.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {sent ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-green-600" /></div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Bericht verstuurd!</h2>
                <p className="text-slate-500">We reageren zo snel mogelijk, uiterlijk binnen 1 werkdag.</p>
                <Button variant="ghost" className="mt-6 rounded-full" onClick={() => setSent(false)}>Nieuw bericht sturen</Button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5"><Label>Naam</Label><Input value={form.name} onChange={e => u("name", e.target.value)} placeholder="Jan de Vries" /></div>
                  <div className="space-y-1.5"><Label>E-mailadres</Label><Input type="email" value={form.email} onChange={e => u("email", e.target.value)} placeholder="jan@mail.nl" /></div>
                </div>
                <div className="space-y-1.5">
                  <Label>Onderwerp</Label>
                  <select className="w-full h-9 rounded-lg border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50" value={form.subject} onChange={e => u("subject", e.target.value)}>
                    <option value="">Kies een onderwerp</option>
                    <option>Vraag over mijn aanvraag</option>
                    <option>Dealer aanmelden</option>
                    <option>Technisch probleem</option>
                    <option>GDPR / Privacy verzoek</option>
                    <option>Samenwerken / Partnership</option>
                    <option>Anders</option>
                  </select>
                </div>
                <div className="space-y-1.5"><Label>Bericht</Label><Textarea rows={5} value={form.message} onChange={e => u("message", e.target.value)} placeholder="Schrijf hier jouw bericht..." /></div>
                <Button onClick={() => setSent(true)} className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full">Versturen</Button>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {[
              { icon: Mail, title: "E-mail", value: "info@automatch.nl" },
              { icon: Clock, title: "Reactietijd", value: "Binnen 1 werkdag" },
              { icon: MapPin, title: "Adres", value: "Postbus 1234\n1000 AA Amsterdam" },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                    <div className="text-sm text-slate-500 whitespace-pre-line mt-0.5">{item.value}</div>
                  </div>
                </div>
              );
            })}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-800">
              <strong>Privacy-verzoek?</strong><br/>Stuur een e-mail naar <a href="mailto:privacy@automatch.nl" className="underline">privacy@automatch.nl</a>. We reageren binnen 30 dagen conform de AVG.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
