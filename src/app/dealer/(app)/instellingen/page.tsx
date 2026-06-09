"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const TABS = ["Bedrijfsgegevens", "Notificaties", "Wachtwoord"];

export default function InstellingenPage() {
  const [tab, setTab] = useState("Bedrijfsgegevens");
  const [saved, setSaved] = useState(false);

  const [notifs, setNotifs] = useState({
    emailNewLead: true,
    emailNewMessage: true,
    emailWeeklyReport: false,
    whatsappNewLead: false,
    whatsappNewMessage: false,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Instellingen</h1>
      <p className="text-slate-500 mb-6">Beheer jouw dealerprofiel en notificaties.</p>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Bedrijfsgegevens */}
      {tab === "Bedrijfsgegevens" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <h2 className="font-bold text-slate-900">Bedrijfsgegevens</h2>
          {[
            { label: "Bedrijfsnaam", value: "AutoHuis Rotterdam", type: "text" },
            { label: "E-mailadres", value: "dealer@autohuis.nl", type: "email" },
            { label: "Telefoonnummer", value: "+31 10 123 4567", type: "tel" },
            { label: "Straat + huisnummer", value: "Coolsingel 42", type: "text" },
            { label: "Postcode", value: "3011 AB", type: "text" },
            { label: "Stad", value: "Rotterdam", type: "text" },
            { label: "KvK-nummer", value: "12345678", type: "text" },
            { label: "BTW-nummer", value: "NL123456789B01", type: "text" },
          ].map(f => (
            <div key={f.label} className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">{f.label}</Label>
              <Input type={f.type} defaultValue={f.value} />
            </div>
          ))}
          <SaveButton saved={saved} onClick={handleSave} />
        </div>
      )}

      {/* Notificaties */}
      {tab === "Notificaties" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="font-bold text-slate-900 mb-1">E-mail notificaties</h2>
            <p className="text-sm text-slate-500 mb-5">Kies wanneer je een e-mail ontvangt.</p>
            <div className="space-y-4">
              {[
                { key: "emailNewLead", label: "Nieuwe lead beschikbaar", desc: "Direct een e-mail als er een nieuwe lead is die bij jou past." },
                { key: "emailNewMessage", label: "Nieuw bericht van koper", desc: "Notificatie als een koper reageert op jouw aanbieding." },
                { key: "emailWeeklyReport", label: "Wekelijks prestatierapport", desc: "Elke maandag een overzicht van jouw leads, matches en conversies." },
              ].map(n => (
                <NotifRow
                  key={n.key}
                  label={n.label}
                  desc={n.desc}
                  value={notifs[n.key as keyof typeof notifs]}
                  onChange={v => setNotifs(p => ({ ...p, [n.key]: v }))}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="font-bold text-slate-900 mb-1">WhatsApp notificaties</h2>
            <p className="text-sm text-slate-500 mb-5">Ontvang berichten via WhatsApp (Pro en hoger).</p>
            <div className="space-y-4">
              {[
                { key: "whatsappNewLead", label: "Nieuwe lead via WhatsApp", desc: "Directe melding bij een nieuwe passende lead." },
                { key: "whatsappNewMessage", label: "Nieuw bericht via WhatsApp", desc: "Melding als een koper reageert." },
              ].map(n => (
                <NotifRow
                  key={n.key}
                  label={n.label}
                  desc={n.desc}
                  value={notifs[n.key as keyof typeof notifs]}
                  onChange={v => setNotifs(p => ({ ...p, [n.key]: v }))}
                />
              ))}
            </div>
          </div>
          <SaveButton saved={saved} onClick={handleSave} />
        </div>
      )}

      {/* Wachtwoord */}
      {tab === "Wachtwoord" && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <h2 className="font-bold text-slate-900">Wachtwoord wijzigen</h2>
          {[
            { label: "Huidig wachtwoord", placeholder: "••••••••" },
            { label: "Nieuw wachtwoord", placeholder: "••••••••" },
            { label: "Herhaal nieuw wachtwoord", placeholder: "••••••••" },
          ].map(f => (
            <div key={f.label} className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">{f.label}</Label>
              <Input type="password" placeholder={f.placeholder} />
            </div>
          ))}
          <SaveButton saved={saved} onClick={handleSave} label="Wachtwoord opslaan" />
        </div>
      )}
    </div>
  );
}

function NotifRow({ label, desc, value, onChange }: {
  label: string; desc: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="font-medium text-slate-900 text-sm">{label}</div>
        <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full flex items-center transition-all flex-shrink-0 mt-0.5 ${value ? "bg-slate-900 justify-end" : "bg-slate-200 justify-start"}`}
      >
        <span className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm" />
      </button>
    </div>
  );
}

function SaveButton({ saved, onClick, label = "Opslaan" }: { saved: boolean; onClick: () => void; label?: string }) {
  return (
    <Button
      onClick={onClick}
      className={`rounded-full transition-all ${saved ? "bg-green-600 hover:bg-green-600" : "bg-slate-900 hover:bg-slate-800"} text-white`}
    >
      {saved ? <><Check className="w-4 h-4 mr-2" /> Opgeslagen</> : label}
    </Button>
  );
}
