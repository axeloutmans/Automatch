"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, Link2, Search, MoreHorizontal, Car } from "lucide-react";

const INTEGRATIONS = [
  { name: "VWE", logo: "VWE", status: "Binnenkort", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { name: "Mobilox", logo: "MOB", status: "Binnenkort", color: "bg-purple-50 text-purple-600 border-purple-200" },
  { name: "Autosoft", logo: "ASW", status: "Binnenkort", color: "bg-green-50 text-green-600 border-green-200" },
  { name: "Hexon", logo: "HEX", status: "Binnenkort", color: "bg-orange-50 text-orange-600 border-orange-200" },
];

const STOCK = [
  { id: "1", brand: "Audi", model: "Q5 50 TFSI e", year: 2022, price: 47950, mileage: 38400, fuel: "Plug-in hybride", color: "Chronosgrijs", status: "Beschikbaar" },
  { id: "2", brand: "BMW", model: "X3 xDrive20d", year: 2021, price: 42500, mileage: 52000, fuel: "Diesel", color: "Alpinwit", status: "Beschikbaar" },
  { id: "3", brand: "Volkswagen", model: "Golf 8 R-Line", year: 2023, price: 31900, mileage: 15200, fuel: "Benzine", color: "Diepzwart", status: "Gereserveerd" },
  { id: "4", brand: "Cupra", model: "Formentor VZ", year: 2022, price: 39800, mileage: 28100, fuel: "Plug-in hybride", color: "Petrol Blue", status: "Beschikbaar" },
];

export default function VoorraadPage() {
  const [activeTab, setActiveTab] = useState("voorraad");

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mijn voorraad</h1>
          <p className="text-slate-500 mt-1">Beheer jouw voertuigen en koppelingen.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full gap-2">
            <Upload className="w-4 h-4" /> CSV upload
          </Button>
          <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full gap-2">
            <Plus className="w-4 h-4" /> Auto toevoegen
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        {["voorraad", "koppelingen"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab === "voorraad" ? "Voorraad" : "Koppelingen"}
          </button>
        ))}
      </div>

      {activeTab === "voorraad" && (
        <div>
          {/* Search */}
          <div className="relative mb-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-9" placeholder="Zoek in voorraad..." />
          </div>

          {/* Stock table */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-7 text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3 border-b border-slate-50 bg-slate-50">
              <div className="col-span-2">Voertuig</div>
              <div>Jaar</div>
              <div>Km-stand</div>
              <div>Brandstof</div>
              <div>Prijs</div>
              <div>Status</div>
            </div>
            {STOCK.map(car => (
              <div key={car.id} className="grid grid-cols-7 items-center px-5 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Car className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{car.brand} {car.model}</div>
                    <div className="text-xs text-slate-400">{car.color}</div>
                  </div>
                </div>
                <div className="text-sm text-slate-700">{car.year}</div>
                <div className="text-sm text-slate-700">{car.mileage.toLocaleString("nl-NL")} km</div>
                <div className="text-sm text-slate-700">{car.fuel}</div>
                <div className="text-sm font-semibold text-slate-900">€ {car.price.toLocaleString("nl-NL")}</div>
                <div>
                  <Badge variant="outline" className={car.status === "Beschikbaar" ? "text-green-700 border-green-200 bg-green-50" : "text-orange-700 border-orange-200 bg-orange-50"}>
                    {car.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "koppelingen" && (
        <div>
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
            Koppelingen met externe systemen zijn binnenkort beschikbaar. Zodra jouw systeem gekoppeld is, wordt jouw voorraad automatisch gesynchroniseerd.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTEGRATIONS.map(intg => (
              <div key={intg.name} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center justify-between hover:border-slate-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm ${intg.color}`}>
                    {intg.logo}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{intg.name}</div>
                    <div className="text-sm text-slate-500">Voertuigbeheer systeem</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-slate-500 border-slate-200 text-xs">
                    {intg.status}
                  </Badge>
                  <Button variant="outline" size="sm" disabled className="rounded-full text-xs gap-1">
                    <Link2 className="w-3 h-3" /> Koppelen
                  </Button>
                </div>
              </div>
            ))}

            {/* XML Feed */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-slate-900">XML feed</div>
                  <div className="text-sm text-slate-500">Koppel een eigen XML feed voor automatische voorraadsynchronisatie</div>
                </div>
                <Button variant="outline" className="rounded-full text-sm">Configureren</Button>
              </div>
              <div className="relative">
                <Input placeholder="https://jouwdomein.nl/voorraad.xml" className="font-mono text-sm pr-24" />
                <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full text-xs bg-slate-900 text-white">
                  Opslaan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
