"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, WifiOff, ServerCrash } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  type?: "network" | "server" | "notfound" | "generic";
  onRetry?: () => void;
}

export default function ErrorState({
  title,
  message,
  type = "generic",
  onRetry,
}: ErrorStateProps) {
  const defaults = {
    network: { icon: WifiOff, t: "Geen verbinding", m: "Controleer jouw internetverbinding en probeer het opnieuw." },
    server:  { icon: ServerCrash, t: "Serverfout", m: "Er is een probleem aan onze kant. We lossen het zo snel mogelijk op." },
    notfound:{ icon: AlertCircle, t: "Niet gevonden", m: "De pagina of resource die je zoekt bestaat niet (meer)." },
    generic: { icon: AlertCircle, t: "Er is iets misgegaan", m: "Probeer de pagina te vernieuwen. Als het probleem aanhoudt, neem contact op." },
  }[type];

  const Icon = defaults.icon;

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title || defaults.t}</h3>
      <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-5">{message || defaults.m}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="rounded-full gap-2">
          <RefreshCw className="w-4 h-4" /> Opnieuw proberen
        </Button>
      )}
    </div>
  );
}
