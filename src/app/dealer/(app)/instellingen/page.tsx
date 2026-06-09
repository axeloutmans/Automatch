"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FIELDS = [
  { label: "Bedrijfsnaam", value: "AutoHuis Rotterdam" },
  { label: "E-mailadres", value: "dealer@autohuis.nl" },
  { label: "Telefoonnummer", value: "+31 10 123 4567" },
  { label: "Postcode", value: "3011 AB" },
  { label: "KvK-nummer", value: "12345678" },
];

export default function InstellingenPage() {
  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Instellingen</h1>
      <p className="text-slate-500 mb-8">Beheer jouw dealerprofiel en notificaties.</p>
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
        <h2 className="font-bold text-slate-900">Bedrijfsgegevens</h2>
        {FIELDS.map(f => (
          <div key={f.label} className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">{f.label}</Label>
            <Input defaultValue={f.value} />
          </div>
        ))}
        <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full">Opslaan</Button>
      </div>
    </div>
  );
}
