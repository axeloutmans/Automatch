"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Car, Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span>AutoMatch</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/#hoe-werkt-het" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Hoe werkt het
            </Link>
            <Link href="/voor-dealers" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Voor dealers
            </Link>
            <Link href="/#prijzen" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Prijzen
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/portaal">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 gap-1.5">
                <User className="w-4 h-4" />
                Mijn aanvragen
              </Button>
            </Link>
            <Link href="/dealer/inloggen">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                Dealer login
              </Button>
            </Link>
            <Link href="/zoeken">
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5">
                Auto zoeken
              </Button>
            </Link>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2">
          <Link href="/#hoe-werkt-het" className="block py-2 text-slate-600">Hoe werkt het</Link>
          <Link href="/voor-dealers" className="block py-2 text-slate-600">Voor dealers</Link>
          <Link href="/#prijzen" className="block py-2 text-slate-600">Prijzen</Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/portaal">
              <Button variant="outline" className="w-full gap-2"><User className="w-4 h-4" /> Mijn aanvragen</Button>
            </Link>
            <Link href="/dealer/inloggen">
              <Button variant="outline" className="w-full">Dealer login</Button>
            </Link>
            <Link href="/zoeken">
              <Button className="w-full bg-slate-900 text-white">Auto zoeken</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
