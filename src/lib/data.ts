// AutoMatch — data types & constants

export const CAR_BRANDS = [
  "Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Volvo",
  "Toyota", "Kia", "Hyundai", "Peugeot", "Renault",
  "Ford", "Opel", "Skoda", "Seat", "Cupra",
  "Tesla", "Porsche", "Land Rover", "Jaguar", "Mazda",
  "Honda", "Nissan", "Suzuki", "Mitsubishi", "Jeep",
  "Alfa Romeo", "Fiat", "Citroën", "DS Automobiles", "Mini",
  "Dacia", "Subaru", "Lexus", "Infiniti", "Abarth"
];

export const CAR_MODELS: Record<string, string[]> = {
  "Audi": ["A1","A3","A4","A5","A6","A7","A8","Q2","Q3","Q5","Q7","Q8","e-tron","RS3","RS6","TT"],
  "BMW": ["1 Serie","2 Serie","3 Serie","4 Serie","5 Serie","6 Serie","7 Serie","8 Serie","X1","X2","X3","X4","X5","X6","X7","M3","M5","iX","i4"],
  "Mercedes-Benz": ["A-Klasse","B-Klasse","C-Klasse","E-Klasse","S-Klasse","CLA","CLS","GLA","GLB","GLC","GLE","GLS","EQC","AMG GT"],
  "Volkswagen": ["Golf","Polo","Passat","Tiguan","T-Roc","T-Cross","Touareg","Arteon","ID.3","ID.4","ID.5","Caddy"],
  "Volvo": ["XC40","XC60","XC90","S60","S90","V60","V90","C40","EX30","EX90"],
  "Toyota": ["Yaris","Corolla","Camry","RAV4","C-HR","Prius","Aygo","Hilux","Land Cruiser","bZ4X"],
  "Kia": ["Picanto","Stonic","Rio","Ceed","Sportage","Sorento","Niro","EV6","EV9","Carnival"],
  "Hyundai": ["i10","i20","i30","Tucson","Santa Fe","Ioniq 5","Ioniq 6","KONA","Bayon"],
  "Peugeot": ["208","308","408","508","2008","3008","5008","e-208"],
  "Cupra": ["Formentor","Born","Ateca","Leon"],
  "Tesla": ["Model 3","Model Y","Model S","Model X","Cybertruck"],
  "Porsche": ["911","Cayenne","Macan","Panamera","Taycan"],
  "Skoda": ["Fabia","Scala","Octavia","Superb","Kamiq","Karoq","Kodiaq","Enyaq"],
  "Renault": ["Clio","Mégane","Arkana","Captur","Austral","Espace","Zoe","Scenic E-Tech"],
  "Ford": ["Fiesta","Focus","Puma","Kuga","Explorer","Mustang","Mustang Mach-E"],
};

export const BODY_TYPES = [
  { value: "suv", label: "SUV" },
  { value: "hatchback", label: "Hatchback" },
  { value: "sedan", label: "Sedan" },
  { value: "stationwagon", label: "Stationwagon" },
  { value: "coupe", label: "Coupé" },
  { value: "cabrio", label: "Cabrio" },
  { value: "bestelwagen", label: "Bestelwagen" },
  { value: "mpv", label: "MPV" },
];

export const FUEL_TYPES = [
  { value: "benzine", label: "Benzine" },
  { value: "diesel", label: "Diesel" },
  { value: "hybride", label: "Hybride" },
  { value: "plugin-hybride", label: "Plug-in hybride" },
  { value: "elektrisch", label: "Elektrisch" },
  { value: "lpg", label: "LPG" },
];

export const TRANSMISSION_TYPES = [
  { value: "automaat", label: "Automaat" },
  { value: "handgeschakeld", label: "Handgeschakeld" },
];

export const DRIVE_TYPES = [
  { value: "voorwiel", label: "Voorwielaandrijving" },
  { value: "achterwiel", label: "Achterwielaandrijving" },
  { value: "vierwiel", label: "Vierwielaandrijving" },
];

export const OPTIONS_CATEGORIES = [
  {
    name: "Comfort",
    options: [
      "Airco","Climate control","Stoelverwarming","Stuurverwarming",
      "Geventileerde stoelen","Elektrisch verstelbare stoelen","Memory stoelen",
      "Keyless entry/start","Elektrische achterklep","Panoramadak","Trekhaak"
    ]
  },
  {
    name: "Technologie",
    options: [
      "Navigatie","Apple CarPlay","Android Auto","Virtual cockpit",
      "Digitaal dashboard","Head-up display","Draadloos laden telefoon"
    ]
  },
  {
    name: "Veiligheid",
    options: [
      "Cruise control","Adaptive cruise control","Lane assist",
      "Dodehoekdetectie","Verkeersbordherkenning","Achteruitrijcamera",
      "360 camera","Parkeersensoren","Automatisch parkeren"
    ]
  },
  {
    name: "Prestaties",
    options: ["Sportpakket","Luchtvering","Adaptief onderstel","Vierwielaandrijving"]
  },
  {
    name: "Uiterlijk",
    options: ["Sportieve uitvoering","Privacy glass","Lichtmetalen velgen","Zwarte accenten"]
  },
  {
    name: "Verlichting",
    options: ["LED verlichting","Matrix verlichting"]
  },
];

// Market price reference data per model (gemiddeld in NL 2025)
export const MARKET_PRICES: Record<string, { avg: number; min: number; max: number; avgYear: number; avgKm: number }> = {
  "Audi Q5":       { avg: 44500, min: 28000, max: 72000, avgYear: 2020, avgKm: 68000 },
  "BMW X3":        { avg: 38000, min: 22000, max: 65000, avgYear: 2019, avgKm: 78000 },
  "Volkswagen Golf":{ avg: 22000, min: 8000,  max: 42000, avgYear: 2019, avgKm: 72000 },
  "Tesla Model Y": { avg: 48000, min: 35000, max: 68000, avgYear: 2022, avgKm: 32000 },
  "Cupra Formentor":{ avg: 34000, min: 22000, max: 52000, avgYear: 2021, avgKm: 45000 },
  "Volvo XC60":    { avg: 42000, min: 26000, max: 68000, avgYear: 2020, avgKm: 62000 },
  "Mercedes-Benz GLC":{ avg: 47000, min: 30000, max: 80000, avgYear: 2020, avgKm: 58000 },
  "Kia Sportage":  { avg: 28000, min: 14000, max: 48000, avgYear: 2020, avgKm: 55000 },
};

export interface Lead {
  id: string;
  brand: string;
  model: string;
  budgetMin: number;
  budgetMax: number;
  yearMin: number;
  yearMax: number;
  fuel: string;
  transmission: string;
  location: string;
  postcode: string;
  buyIntent: string;
  score: number;
  date: string;
  mustHaveOptions: string[];
  niceToHaveOptions: string[];
  hasTradeIn: boolean;
  verified: boolean;
  phoneVerified: boolean;
  exclusive?: boolean;
  exclusiveCredits?: number;
}

export const DUMMY_LEADS: Lead[] = [
  {
    id: "1", brand: "Audi", model: "Q5",
    budgetMin: 35000, budgetMax: 55000, yearMin: 2020, yearMax: 2024,
    fuel: "Hybride", transmission: "Automaat", location: "Amsterdam", postcode: "1012",
    buyIntent: "Binnen 30 dagen", score: 96, date: "2 uur geleden",
    mustHaveOptions: ["Apple CarPlay","Panoramadak","LED verlichting"],
    niceToHaveOptions: ["Stoelverwarming","Adaptive cruise control"],
    hasTradeIn: true, verified: true, phoneVerified: true, exclusive: false
  },
  {
    id: "2", brand: "BMW", model: "X3",
    budgetMin: 40000, budgetMax: 65000, yearMin: 2021, yearMax: 2024,
    fuel: "Diesel", transmission: "Automaat", location: "Rotterdam", postcode: "3011",
    buyIntent: "Binnen 1 week", score: 92, date: "4 uur geleden",
    mustHaveOptions: ["Navigatie","Stoelverwarming","Achteruitrijcamera"],
    niceToHaveOptions: ["Head-up display","Memory stoelen"],
    hasTradeIn: false, verified: true, phoneVerified: true, exclusive: true, exclusiveCredits: 3
  },
  {
    id: "3", brand: "Volkswagen", model: "Golf",
    budgetMin: 20000, budgetMax: 30000, yearMin: 2019, yearMax: 2023,
    fuel: "Benzine", transmission: "Automaat", location: "Utrecht", postcode: "3511",
    buyIntent: "Binnen 3 maanden", score: 74, date: "Gisteren",
    mustHaveOptions: ["Apple CarPlay","Airco"],
    niceToHaveOptions: ["Parkeersensoren"],
    hasTradeIn: true, verified: true, phoneVerified: false
  },
  {
    id: "4", brand: "Tesla", model: "Model Y",
    budgetMin: 45000, budgetMax: 70000, yearMin: 2022, yearMax: 2024,
    fuel: "Elektrisch", transmission: "Automaat", location: "Den Haag", postcode: "2511",
    buyIntent: "Oriënterend", score: 61, date: "2 dagen geleden",
    mustHaveOptions: ["Adaptive cruise control"],
    niceToHaveOptions: ["Panoramadak","360 camera"],
    hasTradeIn: false, verified: true, phoneVerified: false
  },
  {
    id: "5", brand: "Cupra", model: "Formentor",
    budgetMin: 28000, budgetMax: 42000, yearMin: 2020, yearMax: 2024,
    fuel: "Plug-in hybride", transmission: "Automaat", location: "Eindhoven", postcode: "5611",
    buyIntent: "Binnen 30 dagen", score: 88, date: "3 uur geleden",
    mustHaveOptions: ["Navigatie","Virtual cockpit","Sportpakket"],
    niceToHaveOptions: ["LED verlichting","Privacy glass"],
    hasTradeIn: true, verified: true, phoneVerified: true
  },
  {
    id: "6", brand: "Volvo", model: "XC60",
    budgetMin: 42000, budgetMax: 60000, yearMin: 2021, yearMax: 2024,
    fuel: "Plug-in hybride", transmission: "Automaat", location: "Groningen", postcode: "9711",
    buyIntent: "Binnen 3 maanden", score: 45, date: "5 dagen geleden",
    mustHaveOptions: ["Lane assist","Keyless entry/start"],
    niceToHaveOptions: ["Panoramadak","Stoelverwarming"],
    hasTradeIn: false, verified: false, phoneVerified: false
  },
];

export const CREDIT_PACKAGES = [
  { id: "10",  credits: 10,  price: 29,  pricePerCredit: 2.90, popular: false, badge: null },
  { id: "25",  credits: 25,  price: 59,  pricePerCredit: 2.36, popular: true,  badge: "Populair" },
  { id: "50",  credits: 50,  price: 99,  pricePerCredit: 1.98, popular: false, badge: "Beste waarde" },
  { id: "100", credits: 100, price: 179, pricePerCredit: 1.79, popular: false, badge: null },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    period: "gratis",
    credits: 5,
    description: "Probeer AutoMatch zonder risico",
    features: [
      "5 gratis credits bij aanmelding",
      "Toegang tot alle leads",
      "E-mail notificaties",
      "Basis dashboard",
    ],
    limitations: ["Geen exclusieve leads","Geen prioritaire weergave","Geen postcode-filter"],
    cta: "Gratis starten",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 149,
    period: "per maand",
    credits: 75,
    description: "Voor actieve dealers die willen groeien",
    features: [
      "75 credits per maand inbegrepen",
      "Geografische radius filter (tot 150 km)",
      "Merk & model filters",
      "Exclusieve leads (3× credits)",
      "WhatsApp notificaties",
      "Prioritaire weergave bij leads",
      "Maandelijkse ROI-rapportage",
      "Dedicated accountmanager",
    ],
    limitations: [],
    cta: "Start Pro-abonnement",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 399,
    period: "per maand",
    credits: 250,
    description: "Voor autobedrijven met meerdere vestigingen",
    features: [
      "250 credits per maand inbegrepen",
      "Alles uit Pro",
      "Multi-vestiging beheer",
      "API-toegang",
      "VWE / Mobilox integratie (beta)",
      "Custom matching criteria",
      "SLA: 99,5% uptime garantie",
      "Maandelijks strategiegesprek",
    ],
    limitations: [],
    cta: "Contact opnemen",
    highlight: false,
  },
];

export const DEALER_STATS_DEMO = {
  newLeads: 12,
  newMatches: 3,
  openedLeads: 47,
  repliesSent: 28,
  conversionRate: 18,
  creditsRemaining: 24,
  avgResponseTime: "1u 42m",
  dealsClosedMTD: 5,
};

export function getLeadScoreLabel(score: number): { label: string; color: string; emoji: string } {
  if (score >= 90) return { label: "Hot Lead",       color: "text-orange-600 bg-orange-50 border-orange-200", emoji: "🔥" };
  if (score >= 70) return { label: "Goede Lead",     color: "text-green-700 bg-green-50 border-green-200",   emoji: "✅" };
  if (score >= 50) return { label: "Gemiddeld",      color: "text-yellow-700 bg-yellow-50 border-yellow-200", emoji: "🟡" };
  return             { label: "Lage kwaliteit",  color: "text-red-700 bg-red-50 border-red-200",         emoji: "🔴" };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
}

export function getBuyIntentUrgency(intent: string): { color: string; label: string } {
  if (intent === "Binnen 1 week")    return { color: "text-red-600 bg-red-50 border-red-200",    label: "Koopt snel" };
  if (intent === "Binnen 30 dagen")  return { color: "text-orange-600 bg-orange-50 border-orange-200", label: "Koopklaar" };
  if (intent === "Binnen 3 maanden") return { color: "text-blue-600 bg-blue-50 border-blue-200",  label: "Actief" };
  return                              { color: "text-slate-500 bg-slate-50 border-slate-200",    label: "Oriënterend" };
}
