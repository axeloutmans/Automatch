// AutoMatch — data types & constants

export const CAR_BRANDS = [
  "Abarth", "Alfa Romeo", "Audi", "BMW", "Chevrolet", "Citroën",
  "Cupra", "Dacia", "DS Automobiles", "Fiat", "Ford", "Honda",
  "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover",
  "Lexus", "Maserati", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi",
  "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Seat",
  "Skoda", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo",
];

export const CAR_MODELS: Record<string, string[]> = {
  "Abarth": ["500", "595", "695", "124 Spider"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale", "Giulietta", "147", "156"],
  "Audi": [
    "A1", "S1",
    "A3", "S3", "RS3",
    "A4", "S4", "RS4",
    "A5", "S5", "RS5",
    "A6", "S6", "RS6",
    "A7", "S7", "RS7",
    "A8", "S8",
    "Q2", "SQ2",
    "Q3", "RSQ3",
    "Q4 e-tron",
    "Q5", "SQ5",
    "Q7", "SQ7",
    "Q8", "SQ8", "RSQ8",
    "e-tron", "e-tron GT", "RS e-tron GT",
    "TT", "TTS", "TTRS",
    "R8",
  ],
  "BMW": [
    "118i", "120i", "123d", "M135i", "M140i",
    "218i", "220i", "M235i", "M240i",
    "316i", "318i", "320i", "320d", "330i", "330e", "M340i", "M3",
    "418i", "420i", "420d", "430i", "M440i", "M4",
    "520i", "520d", "530i", "530e", "540i", "M550i", "M5",
    "630i", "640i", "M6",
    "730i", "740i", "745e", "750i", "M760i",
    "840i", "M850i", "M8",
    "X1", "X2",
    "X3", "X3 M40i", "X3M",
    "X4", "X4 M40i", "X4M",
    "X5", "X5 M50i", "X5M",
    "X6", "X6 M50i", "X6M",
    "X7",
    "iX1", "iX3", "i4", "i5", "i7", "iX",
    "Z4",
  ],
  "Chevrolet": ["Camaro", "Corvette", "Blazer"],
  "Citroën": ["C1", "C3", "C4", "C5", "C5 X", "C3 Aircross", "C5 Aircross", "Berlingo", "ë-C4"],
  "Cupra": ["Formentor", "Born", "Ateca", "Leon", "Tavascan", "Terramar"],
  "Dacia": ["Sandero", "Duster", "Jogger", "Bigster", "Spring", "Logan"],
  "DS Automobiles": ["DS3", "DS4", "DS7", "DS9"],
  "Fiat": ["500", "500X", "500L", "Panda", "Tipo", "Bravo"],
  "Ford": [
    "Fiesta", "Focus", "Mondeo",
    "Puma", "Kuga", "Explorer", "Edge",
    "Mustang", "Mustang Mach-E",
    "Ranger", "Transit", "Tourneo",
  ],
  "Honda": ["Jazz", "Civic", "CR-V", "HR-V", "e", "e:Ny1", "ZR-V"],
  "Hyundai": [
    "i10", "i20", "i30", "i30 N", "i20 N",
    "Tucson", "Santa Fe", "Santa Cruz",
    "Ioniq 5", "Ioniq 6", "Ioniq 9",
    "KONA", "KONA Electric", "Bayon",
  ],
  "Infiniti": ["Q30", "Q50", "Q60", "QX30", "QX50", "QX70", "QX80"],
  "Jaguar": ["XE", "XF", "XJ", "E-Pace", "F-Pace", "F-Type", "I-Pace"],
  "Jeep": ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Avenger"],
  "Kia": [
    "Picanto", "Rio", "Stonic",
    "Ceed", "ProCeed", "Xceed",
    "Sportage", "Sorento", "Stinger",
    "Niro", "Niro EV",
    "EV3", "EV6", "EV9",
    "Carnival",
  ],
  "Land Rover": [
    "Defender", "Discovery", "Discovery Sport",
    "Freelander", "Range Rover", "Range Rover Sport",
    "Range Rover Evoque", "Range Rover Velar",
  ],
  "Lexus": ["CT", "IS", "ES", "LS", "UX", "NX", "RX", "LX", "LC", "RC"],
  "Maserati": ["Ghibli", "Quattroporte", "Levante", "Grecale", "GranTurismo"],
  "Mazda": ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-30", "CX-5", "CX-60", "MX-5", "MX-30"],
  "Mercedes-Benz": [
    "A-Klasse", "A 45 AMG", "A 35 AMG",
    "B-Klasse",
    "C-Klasse", "C 43 AMG", "C 63 AMG",
    "E-Klasse", "E 53 AMG", "E 63 AMG",
    "S-Klasse",
    "CLA", "CLA 45 AMG",
    "CLS",
    "GLA", "GLA 45 AMG",
    "GLB",
    "GLC", "GLC 43 AMG", "GLC 63 AMG",
    "GLE", "GLE 53 AMG", "GLE 63 AMG",
    "GLS",
    "EQA", "EQB", "EQC", "EQE", "EQS",
    "AMG GT", "AMG GT 4-deurs",
    "G-Klasse",
  ],
  "Mini": ["Mini", "Mini Clubman", "Mini Countryman", "Mini Paceman", "Mini Cabrio", "Mini Electric"],
  "Mitsubishi": ["Colt", "Eclipse Cross", "Outlander", "ASX", "L200"],
  "Nissan": ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya", "370Z", "GT-R"],
  "Opel": ["Corsa", "Astra", "Insignia", "Crossland", "Grandland", "Mokka", "Zafira", "Vivaro"],
  "Peugeot": ["108", "208", "308", "408", "508", "2008", "3008", "5008", "Rifter", "e-208", "e-2008"],
  "Porsche": ["911", "718 Boxster", "718 Cayman", "Cayenne", "Cayenne GTS", "Macan", "Panamera", "Taycan"],
  "Renault": [
    "Twingo", "Clio", "Mégane", "Laguna", "Talisman",
    "Captur", "Arkana", "Austral", "Espace",
    "Kadjar", "Koleos",
    "Zoe", "Scenic E-Tech", "Megane E-Tech",
    "Master",
  ],
  "Seat": ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco", "Mii"],
  "Skoda": [
    "Fabia", "Scala", "Rapid",
    "Octavia", "Octavia RS",
    "Superb",
    "Kamiq", "Karoq", "Kodiaq",
    "Enyaq", "Enyaq Coupé",
  ],
  "Subaru": ["Impreza", "Legacy", "Outback", "Forester", "XV", "BRZ", "WRX STI", "Solterra"],
  "Suzuki": ["Alto", "Swift", "Swift Sport", "Vitara", "S-Cross", "Jimny", "Ignis"],
  "Tesla": ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
  "Toyota": [
    "Aygo", "Aygo X",
    "Yaris", "Yaris Cross", "Yaris GR",
    "Corolla", "Corolla Cross",
    "Camry",
    "C-HR",
    "RAV4",
    "Highlander",
    "Land Cruiser",
    "Prius",
    "Supra",
    "bZ4X",
    "Hilux",
  ],
  "Volkswagen": [
    "Polo", "Polo GTI",
    "Golf", "Golf GTI", "Golf GTE", "Golf R",
    "Arteon",
    "Passat",
    "Jetta",
    "T-Cross", "T-Roc", "T-Roc R",
    "Tiguan", "Tiguan Allspace",
    "Touareg",
    "ID.3", "ID.4", "ID.5", "ID.7",
    "Caddy", "Transporter",
  ],
  "Volvo": [
    "S60", "S60 Recharge",
    "S90",
    "V40", "V60", "V60 Recharge", "V60 Cross Country",
    "V90", "V90 Cross Country",
    "XC40", "XC40 Recharge",
    "XC60", "XC60 Recharge",
    "XC90", "XC90 Recharge",
    "C40 Recharge",
    "EX30", "EX40", "EX90",
  ],
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
  { value: "geen-voorkeur", label: "Geen voorkeur" },
];

export const TRANSMISSION_TYPES = [
  { value: "automaat", label: "Automaat" },
  { value: "handgeschakeld", label: "Handgeschakeld" },
  { value: "geen-voorkeur", label: "Geen voorkeur" },
];

export const DRIVE_TYPES = [
  { value: "voorwiel", label: "Voorwielaandrijving" },
  { value: "achterwiel", label: "Achterwielaandrijving" },
  { value: "vierwiel", label: "Vierwielaandrijving / 4MATIC / AWD" },
  { value: "geen-voorkeur", label: "Geen voorkeur" },
];

export const OPTIONS_CATEGORIES = [
  {
    name: "Comfort",
    options: [
      "Airco",
      "Climate control",
      "Stoelverwarming",
      "Stuurverwarming",
      "Geventileerde stoelen",
      "Elektrisch verstelbare stoelen",
      "Memory stoelen",
      "Keyless entry / start",
      "Elektrische achterklep",
      "Panoramadak",
      "Trekhaak",
    ],
  },
  {
    name: "Technologie",
    options: [
      "Navigatie",
      "Apple CarPlay",
      "Android Auto",
      "Digitaal dashboard",
      "Virtual cockpit",
      "Head-up display",
      "Draadloos laden telefoon",
    ],
  },
  {
    name: "Veiligheid",
    options: [
      "Cruise control",
      "Adaptive cruise control",
      "Lane assist",
      "Dodehoekdetectie",
      "Verkeersbordherkenning",
      "Achteruitrijcamera",
      "360 camera",
      "Parkeersensoren",
      "Automatisch parkeren",
    ],
  },
  {
    name: "Rijervaring",
    options: [
      "Sportpakket",
      "Luchtvering",
      "Adaptief onderstel",
      "Vierwielaandrijving",
    ],
  },
  {
    name: "Verlichting",
    options: ["LED verlichting", "Matrix verlichting"],
  },
];

// Market price reference data (gemiddeld NL 2025)
export const MARKET_PRICES: Record<string, { avg: number; min: number; max: number; avgYear: number; avgKm: number }> = {
  "Audi A3":            { avg: 28000, min: 12000, max: 48000, avgYear: 2020, avgKm: 72000 },
  "Audi S3":            { avg: 38000, min: 25000, max: 55000, avgYear: 2021, avgKm: 52000 },
  "Audi RS3":           { avg: 62000, min: 48000, max: 82000, avgYear: 2022, avgKm: 38000 },
  "Audi A4":            { avg: 34000, min: 16000, max: 58000, avgYear: 2020, avgKm: 68000 },
  "Audi RS6":           { avg: 98000, min: 75000, max: 140000, avgYear: 2022, avgKm: 35000 },
  "Audi Q3":            { avg: 32000, min: 18000, max: 52000, avgYear: 2020, avgKm: 62000 },
  "Audi Q5":            { avg: 44500, min: 28000, max: 72000, avgYear: 2020, avgKm: 68000 },
  "Audi Q7":            { avg: 58000, min: 38000, max: 95000, avgYear: 2020, avgKm: 72000 },
  "Audi Q8":            { avg: 72000, min: 52000, max: 110000, avgYear: 2021, avgKm: 48000 },
  "Audi RSQ8":          { avg: 110000, min: 85000, max: 155000, avgYear: 2022, avgKm: 32000 },
  "BMW M3":             { avg: 82000, min: 62000, max: 125000, avgYear: 2022, avgKm: 28000 },
  "BMW M5":             { avg: 95000, min: 68000, max: 145000, avgYear: 2021, avgKm: 40000 },
  "BMW X3":             { avg: 38000, min: 22000, max: 65000, avgYear: 2019, avgKm: 78000 },
  "BMW X3M":            { avg: 72000, min: 55000, max: 105000, avgYear: 2022, avgKm: 30000 },
  "BMW X5":             { avg: 58000, min: 38000, max: 95000, avgYear: 2020, avgKm: 65000 },
  "BMW X5M":            { avg: 98000, min: 78000, max: 145000, avgYear: 2022, avgKm: 28000 },
  "BMW 3 Serie":        { avg: 28000, min: 12000, max: 55000, avgYear: 2019, avgKm: 80000 },
  "BMW M340i":          { avg: 55000, min: 42000, max: 78000, avgYear: 2021, avgKm: 38000 },
  "Cupra Formentor":    { avg: 34000, min: 22000, max: 52000, avgYear: 2021, avgKm: 45000 },
  "Cupra Leon":         { avg: 28000, min: 18000, max: 42000, avgYear: 2021, avgKm: 50000 },
  "Cupra Born":         { avg: 32000, min: 24000, max: 45000, avgYear: 2022, avgKm: 28000 },
  "Mercedes-Benz C-Klasse": { avg: 38000, min: 18000, max: 72000, avgYear: 2020, avgKm: 65000 },
  "Mercedes-Benz E-Klasse": { avg: 48000, min: 25000, max: 88000, avgYear: 2020, avgKm: 68000 },
  "Mercedes-Benz GLC":  { avg: 47000, min: 30000, max: 80000, avgYear: 2020, avgKm: 58000 },
  "Mercedes-Benz GLE":  { avg: 65000, min: 42000, max: 110000, avgYear: 2021, avgKm: 55000 },
  "Mercedes-Benz AMG GT": { avg: 95000, min: 68000, max: 155000, avgYear: 2022, avgKm: 22000 },
  "Volkswagen Golf":    { avg: 22000, min: 8000,  max: 42000, avgYear: 2019, avgKm: 72000 },
  "Volkswagen Golf GTI":{ avg: 32000, min: 22000, max: 48000, avgYear: 2021, avgKm: 45000 },
  "Volkswagen Golf R":  { avg: 45000, min: 35000, max: 62000, avgYear: 2022, avgKm: 28000 },
  "Volkswagen Tiguan":  { avg: 32000, min: 16000, max: 55000, avgYear: 2020, avgKm: 65000 },
  "Volkswagen Touareg": { avg: 52000, min: 35000, max: 88000, avgYear: 2020, avgKm: 68000 },
  "Volkswagen ID.4":    { avg: 38000, min: 28000, max: 55000, avgYear: 2022, avgKm: 32000 },
  "Tesla Model 3":      { avg: 38000, min: 25000, max: 58000, avgYear: 2021, avgKm: 42000 },
  "Tesla Model Y":      { avg: 48000, min: 35000, max: 68000, avgYear: 2022, avgKm: 32000 },
  "Tesla Model S":      { avg: 72000, min: 52000, max: 105000, avgYear: 2022, avgKm: 28000 },
  "Tesla Model X":      { avg: 85000, min: 62000, max: 120000, avgYear: 2022, avgKm: 25000 },
  "Volvo XC40":         { avg: 32000, min: 18000, max: 55000, avgYear: 2020, avgKm: 58000 },
  "Volvo XC60":         { avg: 42000, min: 26000, max: 68000, avgYear: 2020, avgKm: 62000 },
  "Volvo XC90":         { avg: 58000, min: 38000, max: 92000, avgYear: 2020, avgKm: 65000 },
  "Porsche 911":        { avg: 125000, min: 75000, max: 220000, avgYear: 2021, avgKm: 22000 },
  "Porsche Cayenne":    { avg: 75000, min: 48000, max: 140000, avgYear: 2021, avgKm: 42000 },
  "Porsche Taycan":     { avg: 88000, min: 65000, max: 145000, avgYear: 2022, avgKm: 25000 },
  "Kia Sportage":       { avg: 28000, min: 14000, max: 48000, avgYear: 2020, avgKm: 55000 },
  "Kia EV6":            { avg: 42000, min: 32000, max: 58000, avgYear: 2022, avgKm: 28000 },
  "Hyundai Tucson":     { avg: 28000, min: 14000, max: 48000, avgYear: 2020, avgKm: 58000 },
  "Hyundai Ioniq 5":    { avg: 42000, min: 32000, max: 58000, avgYear: 2022, avgKm: 30000 },
  "Toyota Supra":       { avg: 62000, min: 48000, max: 88000, avgYear: 2022, avgKm: 18000 },
  "Toyota Yaris GR":    { avg: 42000, min: 35000, max: 58000, avgYear: 2022, avgKm: 12000 },
  "Skoda Octavia":      { avg: 22000, min: 10000, max: 40000, avgYear: 2019, avgKm: 75000 },
  "Skoda Kodiaq":       { avg: 32000, min: 18000, max: 55000, avgYear: 2020, avgKm: 62000 },
  "Land Rover Range Rover": { avg: 95000, min: 62000, max: 165000, avgYear: 2021, avgKm: 48000 },
  "Land Rover Defender": { avg: 72000, min: 48000, max: 115000, avgYear: 2022, avgKm: 28000 },
};

// Alternatieven suggesties per merk/model
export const ALTERNATIVES: Record<string, string[]> = {
  "Audi A3":         ["Volkswagen Golf", "BMW 1 Serie", "Mercedes-Benz A-Klasse", "Cupra Leon"],
  "Audi RS3":        ["BMW M135i", "Mercedes-Benz A 45 AMG", "Cupra Leon"],
  "BMW X3":          ["Audi Q5", "Mercedes-Benz GLC", "Volvo XC60"],
  "BMW M3":          ["Audi RS4", "Mercedes-Benz C 63 AMG", "Volkswagen Golf R"],
  "Mercedes-Benz GLC": ["BMW X3", "Audi Q5", "Volvo XC60", "Kia Sportage"],
  "Volkswagen Golf": ["Skoda Octavia", "Seat Leon", "Cupra Leon", "BMW 1 Serie"],
  "Volkswagen Golf R": ["Audi S3", "BMW M135i", "Cupra Leon"],
  "Tesla Model Y":   ["Volkswagen ID.4", "Hyundai Ioniq 5", "Kia EV6", "Volvo XC40 Recharge"],
  "Porsche 911":     ["Audi R8", "BMW M4", "Mercedes-Benz AMG GT"],
  "Cupra Formentor": ["Volkswagen T-Roc R", "Audi Q3", "Skoda Karoq"],
  "Volvo XC60":      ["BMW X3", "Audi Q5", "Mercedes-Benz GLC", "Land Rover Discovery Sport"],
  "Kia EV6":         ["Hyundai Ioniq 5", "Tesla Model 3", "Volkswagen ID.4", "Skoda Enyaq"],
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
  tradeInLicense?: string;
  tradeInMileage?: number;
  tradeInRemarks?: string;
  tradeInPhotos?: string[];
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
    hasTradeIn: true,
    tradeInLicense: "GZ-451-B",
    tradeInMileage: 87000,
    tradeInRemarks: "Kleine deukje rechter achterbumper, verder nette staat. Volledig dealeronderhouden.",
    tradeInPhotos: [],
    verified: true, phoneVerified: true, exclusive: false
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
    hasTradeIn: true,
    tradeInLicense: "RT-839-K",
    tradeInMileage: 112000,
    tradeInRemarks: "2019 Volkswagen Polo, APK tot maart 2026. Lichte krasjes op de velgen.",
    tradeInPhotos: [],
    verified: true, phoneVerified: false
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
    hasTradeIn: true,
    tradeInLicense: "LD-027-X",
    tradeInMileage: 64000,
    tradeInRemarks: "BMW 1 Serie 2021, M-Sport pakket, geen schades, eerste eigenaar.",
    tradeInPhotos: [],
    verified: true, phoneVerified: true
  },
  {
    id: "6", brand: "Volvo", model: "XC60",
    budgetMin: 42000, budgetMax: 60000, yearMin: 2021, yearMax: 2024,
    fuel: "Plug-in hybride", transmission: "Automaat", location: "Groningen", postcode: "9711",
    buyIntent: "Binnen 3 maanden", score: 45, date: "5 dagen geleden",
    mustHaveOptions: ["Lane assist","Keyless entry / start"],
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
  if (score >= 85) return { label: "Hot Lead",      color: "text-orange-600 bg-orange-50 border-orange-200", emoji: "🔥" };
  if (score >= 65) return { label: "Goede Lead",    color: "text-green-700 bg-green-50 border-green-200",   emoji: "✅" };
  if (score >= 45) return { label: "Gemiddeld",     color: "text-yellow-700 bg-yellow-50 border-yellow-200", emoji: "🟡" };
  return             { label: "Lage kwaliteit", color: "text-red-700 bg-red-50 border-red-200",         emoji: "🔴" };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);
}

export function getBuyIntentUrgency(intent: string): { color: string; label: string } {
  if (intent === "Binnen 1 week")    return { color: "text-red-600 bg-red-50 border-red-200",         label: "Koopt snel" };
  if (intent === "Binnen 30 dagen")  return { color: "text-orange-600 bg-orange-50 border-orange-200", label: "Koopklaar" };
  if (intent === "Binnen 3 maanden") return { color: "text-blue-600 bg-blue-50 border-blue-200",       label: "Actief" };
  return                              { color: "text-slate-500 bg-slate-50 border-slate-200",          label: "Oriënterend" };
}
