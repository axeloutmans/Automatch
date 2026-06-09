import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
export const stripe = key ? new Stripe(key, { apiVersion: "2026-05-27.dahlia" }) : null;

export const STRIPE_PRICES = {
  credits_10:  { credits: 10,  price: 2900,  name: "10 AutoMatch credits" },
  credits_25:  { credits: 25,  price: 5900,  name: "25 AutoMatch credits" },
  credits_50:  { credits: 50,  price: 9900,  name: "50 AutoMatch credits" },
  credits_100: { credits: 100, price: 17900, name: "100 AutoMatch credits" },
  plan_pro:    { credits: 75,  price: 14900, name: "AutoMatch Pro — maandelijks", recurring: true },
  plan_ent:    { credits: 250, price: 39900, name: "AutoMatch Enterprise — maandelijks", recurring: true },
} as const;

export type StripePriceId = keyof typeof STRIPE_PRICES;
