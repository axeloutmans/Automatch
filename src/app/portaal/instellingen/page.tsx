"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Shield, Bell, Trash2, Eye, EyeOff } from "lucide-react";

export default function InstellingenPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Instellingen</h1>
        <p className="text-slate-500 mt-1">Beheer jouw account, privacy en notificaties.</p>
      </div>

      {/* Account */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5">
        <h2 className="font-bold text-slate-900 mb-4">Accountgegevens</h2>
        <div className="space-y-4">
          {[
            { label: "Naam", value: "Jan de Vries" },
            { label: "E-mailadres", value: "jan@voorbeeld.nl" },
            { label: "Postcode", value: "1012 AB" },
            { label: "Telefoonnummer", value: "+31 6 12345678" },
          ].map(f => (
            <div key={f.label} className="space-y-1.5">
              <Label className="text-sm font-medium text-slate-700">{f.label}</Label>
              <Input defaultValue={f.value} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-700">E-mailadres geverifieerd</span>
        </div>
        <Button className="mt-4 bg-slate-900 text-white hover:bg-slate-800 rounded-full">Opslaan</Button>
      </div>

      {/* Privacy */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-slate-600" />
          <h2 className="font-bold text-slate-900">Privacy</h2>
        </div>
        <div className="space-y-4">
          {/* Phone visibility global */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <div className="font-medium text-slate-900 text-sm flex items-center gap-2">
                {phoneVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                Telefoonnummer zichtbaar voor dealers
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {phoneVisible
                  ? "Dealers kunnen je bellen. Geldt voor alle actieve aanvragen."
                  : "Standaard verborgen. Dealers kunnen je alleen e-mailen."}
              </div>
            </div>
            <button
              onClick={() => setPhoneVisible(v => !v)}
              className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${phoneVisible ? "bg-slate-900" : "bg-slate-200"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${phoneVisible ? "left-6" : "left-1"}`} />
            </button>
          </div>

          <div className="text-sm text-slate-500 p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <strong className="text-blue-800">Jouw data.</strong> Je kunt op elk moment al jouw persoonsgegevens opvragen of laten verwijderen via{" "}
            <a href="mailto:privacy@automatch.nl" className="text-blue-600 underline">privacy@automatch.nl</a>.
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-slate-600" />
          <h2 className="font-bold text-slate-900">Notificaties</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: "Nieuwe aanbieding ontvangen", sub: "Direct per e-mail", value: emailNotif, set: setEmailNotif },
            { label: "Nieuw bericht van dealer", sub: "Direct per e-mail", value: true, set: () => {} },
            { label: "Aanvraag verloopt binnenkort", sub: "7 dagen van tevoren", value: true, set: () => {} },
          ].map((n, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div>
                <div className="font-medium text-slate-900 text-sm">{n.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{n.sub}</div>
              </div>
              <button
                onClick={() => n.set(!n.value)}
                className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${n.value ? "bg-slate-900" : "bg-slate-200"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${n.value ? "left-6" : "left-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 p-6">
        <h2 className="font-bold text-red-700 mb-2 flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Account verwijderen
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Hiermee worden alle aanvragen, aanbiedingen en persoonsgegevens permanent verwijderd. Dit kan niet ongedaan worden gemaakt.
        </p>
        {!showDeleteConfirm ? (
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 rounded-full text-sm"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Account verwijderen
          </Button>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-red-800 mb-3">Weet je het zeker? Dit kan niet ongedaan worden gemaakt.</p>
            <div className="flex gap-3">
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full text-sm">
                Ja, verwijder mijn account
              </Button>
              <Button variant="outline" className="rounded-full text-sm" onClick={() => setShowDeleteConfirm(false)}>
                Annuleren
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
