"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("am_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = (type: "essential" | "all") => {
    localStorage.setItem("am_cookie_consent", type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm leading-relaxed">
              <span className="font-semibold text-white">Wij gebruiken cookies</span> om AutoMatch beter te maken.
              Functionele cookies zijn noodzakelijk voor het werken van het platform.{" "}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                Lees ons privacybeleid
              </Link>
              .
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => accept("essential")}
              className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full text-xs"
            >
              Alleen noodzakelijk
            </Button>
            <Button
              size="sm"
              onClick={() => accept("all")}
              className="bg-white text-slate-900 hover:bg-slate-100 rounded-full text-xs font-semibold"
            >
              Alles accepteren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
