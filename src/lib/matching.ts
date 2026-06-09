// AutoMatch — Server-side lead scoring algorithm

import type { Database } from "./supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type DealerStock = {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuel: string;
  transmission: string;
  options: string[];
  postcode: string;
};

interface MatchResult {
  score: number; // 0–100
  mustHaveHit: string[];
  mustHaveMiss: string[];
  niceToHaveHit: string[];
  breakdown: ScoreBreakdown;
}

interface ScoreBreakdown {
  brand: number;
  model: number;
  budget: number;
  year: number;
  mileage: number;
  mustHave: number;
  niceToHave: number;
  buyIntent: number;
  location: number;
}

// Weights must sum to 100
const WEIGHTS = {
  brand:      20,
  model:      15,
  budget:     20,
  year:       10,
  mileage:    5,
  mustHave:   15,  // per must-have option that matches
  niceToHave: 5,
  buyIntent:  5,
  location:   5,
} as const;

export function scoreLead(lead: Lead, stock: DealerStock): MatchResult {
  const breakdown: ScoreBreakdown = {
    brand: 0, model: 0, budget: 0, year: 0,
    mileage: 0, mustHave: 0, niceToHave: 0,
    buyIntent: 0, location: 0,
  };

  // ── Brand (20pts) ──────────────────────────────────────────────────────────
  const brandMatch = lead.brands.some(
    b => b.toLowerCase() === stock.brand.toLowerCase()
  );
  breakdown.brand = brandMatch ? WEIGHTS.brand : 0;

  // ── Model (15pts) ──────────────────────────────────────────────────────────
  const modelMatch = !lead.models?.length || lead.models.some(
    m => stock.model.toLowerCase().includes(m.toLowerCase())
  );
  breakdown.model = modelMatch ? WEIGHTS.model : 0;

  // ── Budget (20pts) ─────────────────────────────────────────────────────────
  if (lead.price_min !== null || lead.price_max !== null) {
    const withinMin = lead.price_min === null || stock.price >= lead.price_min;
    const withinMax = lead.price_max === null || stock.price <= lead.price_max;
    if (withinMin && withinMax) {
      breakdown.budget = WEIGHTS.budget;
    } else {
      // Partial score: within 10% of max gets 50%
      const tolerance = (lead.price_max || stock.price) * 0.10;
      if (lead.price_max && stock.price <= lead.price_max + tolerance) {
        breakdown.budget = Math.round(WEIGHTS.budget * 0.5);
      }
    }
  } else {
    breakdown.budget = WEIGHTS.budget; // no budget constraint = full match
  }

  // ── Year (10pts) ───────────────────────────────────────────────────────────
  const withinYear = (lead.year_min === null || stock.year >= lead.year_min) &&
                     (lead.year_max === null || stock.year <= lead.year_max);
  if (withinYear) {
    breakdown.year = WEIGHTS.year;
  } else {
    // 1 year off = 50%
    const yearMin = lead.year_min || 0;
    const yearMax = lead.year_max || 9999;
    const diff = stock.year < yearMin ? yearMin - stock.year : stock.year - yearMax;
    if (diff <= 1) breakdown.year = Math.round(WEIGHTS.year * 0.5);
  }

  // ── Mileage (5pts) ─────────────────────────────────────────────────────────
  if (lead.mileage_max === null || stock.mileage <= lead.mileage_max) {
    breakdown.mileage = WEIGHTS.mileage;
  } else if (stock.mileage <= lead.mileage_max * 1.1) {
    breakdown.mileage = Math.round(WEIGHTS.mileage * 0.5);
  }

  // ── Must-have options (15pts total) ────────────────────────────────────────
  const mustHaveHit: string[] = [];
  const mustHaveMiss: string[] = [];

  if (lead.must_have_options.length > 0) {
    const stockOptionsLower = stock.options.map(o => o.toLowerCase());
    for (const opt of lead.must_have_options) {
      const found = stockOptionsLower.some(
        so => so.includes(opt.toLowerCase()) || opt.toLowerCase().includes(so)
      );
      if (found) mustHaveHit.push(opt); else mustHaveMiss.push(opt);
    }
    const ratio = mustHaveHit.length / lead.must_have_options.length;
    breakdown.mustHave = Math.round(WEIGHTS.mustHave * ratio);
  } else {
    breakdown.mustHave = WEIGHTS.mustHave;
  }

  // ── Nice-to-have options (5pts) ─────────────────────────────────────────────
  const niceToHaveHit: string[] = [];
  if (lead.nice_to_have_options.length > 0) {
    const stockOptionsLower = stock.options.map(o => o.toLowerCase());
    for (const opt of lead.nice_to_have_options) {
      const found = stockOptionsLower.some(
        so => so.includes(opt.toLowerCase()) || opt.toLowerCase().includes(so)
      );
      if (found) niceToHaveHit.push(opt);
    }
    const ratio = niceToHaveHit.length / lead.nice_to_have_options.length;
    breakdown.niceToHave = Math.round(WEIGHTS.niceToHave * ratio);
  } else {
    breakdown.niceToHave = WEIGHTS.niceToHave;
  }

  // ── Buy intent (5pts) — urgency bonus ──────────────────────────────────────
  const intentScore: Record<string, number> = {
    "Binnen 1 week":    WEIGHTS.buyIntent,
    "Binnen 30 dagen":  Math.round(WEIGHTS.buyIntent * 0.8),
    "Binnen 3 maanden": Math.round(WEIGHTS.buyIntent * 0.5),
    "Oriënterend":      Math.round(WEIGHTS.buyIntent * 0.2),
  };
  breakdown.buyIntent = intentScore[lead.buy_intent] ?? Math.round(WEIGHTS.buyIntent * 0.5);

  // ── Location (5pts) — postcode prefix matching ─────────────────────────────
  const leadPost = lead.postcode.replace(/\s/g, "").slice(0, 2);
  const stockPost = stock.postcode.replace(/\s/g, "").slice(0, 2);
  if (leadPost === stockPost) {
    breakdown.location = WEIGHTS.location;
  } else {
    const leadN = parseInt(leadPost) || 0;
    const stockN = parseInt(stockPost) || 0;
    const diff = Math.abs(leadN - stockN);
    if (diff <= 5) breakdown.location = Math.round(WEIGHTS.location * 0.5);
  }

  const score = Math.min(100, Object.values(breakdown).reduce((a, b) => a + b, 0));

  return { score, mustHaveHit, mustHaveMiss, niceToHaveHit, breakdown };
}

// Score a lead purely from its metadata (for display without stock)
export function scoreLead_fromData(
  mustHaveCount: number,
  buyIntent: string,
  hasBudget: boolean,
  hasYear: boolean
): number {
  let score = 50;
  if (mustHaveCount > 3) score += 15;
  if (buyIntent === "Binnen 1 week") score += 20;
  else if (buyIntent === "Binnen 30 dagen") score += 12;
  else if (buyIntent === "Oriënterend") score -= 15;
  if (hasBudget) score += 10;
  if (hasYear) score += 5;
  return Math.min(100, Math.max(20, score));
}
