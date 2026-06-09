export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; name: string; email: string; phone: string | null; postcode: string | null; phone_public: boolean; email_verified: boolean; created_at: string; updated_at: string };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at"|"updated_at"> & Partial<Pick<Database["public"]["Tables"]["profiles"]["Row"], "created_at"|"updated_at">>;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      dealers: {
        Row: { id: string; company_name: string; email: string; phone: string | null; kvk: string | null; rdw_erkend: boolean; postcode: string | null; city: string | null; logo_url: string | null; verified: boolean; radius_km: number; brand_filters: string[]; plan: string; credits: number; rating: number; review_count: number; created_at: string; updated_at: string };
        Insert: Omit<Database["public"]["Tables"]["dealers"]["Row"], "created_at"|"updated_at"|"rating"|"review_count"> & Partial<Pick<Database["public"]["Tables"]["dealers"]["Row"], "created_at"|"updated_at"|"rating"|"review_count">>;
        Update: Partial<Database["public"]["Tables"]["dealers"]["Insert"]>;
      };
      leads: {
        Row: { id: string; consumer_id: string; brands: string[]; models: string[] | null; body_types: string[] | null; fuel_types: string[] | null; transmissions: string[] | null; price_min: number | null; price_max: number | null; year_min: number | null; year_max: number | null; mileage_max: number | null; power_min: number | null; power_max: number | null; must_have_options: string[]; nice_to_have_options: string[]; has_trade_in: boolean; trade_in_license: string | null; trade_in_mileage: number | null; trade_in_remarks: string | null; buy_intent: string; postcode: string; status: string; email_verified: boolean; share_phone: boolean; expires_at: string; created_at: string; updated_at: string };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id"|"created_at"|"updated_at"|"expires_at"> & Partial<Pick<Database["public"]["Tables"]["leads"]["Row"], "id"|"created_at"|"updated_at"|"expires_at">>;
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      lead_opens: {
        Row: { id: string; lead_id: string; dealer_id: string; exclusive: boolean; credits_used: number; opened_at: string };
        Insert: Omit<Database["public"]["Tables"]["lead_opens"]["Row"], "id"|"opened_at"> & Partial<Pick<Database["public"]["Tables"]["lead_opens"]["Row"], "id"|"opened_at">>;
        Update: Partial<Database["public"]["Tables"]["lead_opens"]["Insert"]>;
      };
      offers: {
        Row: { id: string; lead_id: string; dealer_id: string; car_title: string; year: number | null; mileage: number | null; fuel: string | null; transmission: string | null; price: number; match_score: number; must_have_hit: string[]; must_have_miss: string[]; nice_to_have_hit: string[]; extras: string | null; message: string | null; status: string; created_at: string };
        Insert: Omit<Database["public"]["Tables"]["offers"]["Row"], "id"|"created_at"> & Partial<Pick<Database["public"]["Tables"]["offers"]["Row"], "id"|"created_at">>;
        Update: Partial<Database["public"]["Tables"]["offers"]["Insert"]>;
      };
      messages: {
        Row: { id: string; offer_id: string; sender_id: string; sender_role: string; body: string; read: boolean; created_at: string };
        Insert: Omit<Database["public"]["Tables"]["messages"]["Row"], "id"|"created_at"> & Partial<Pick<Database["public"]["Tables"]["messages"]["Row"], "id"|"created_at">>;
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
      credit_transactions: {
        Row: { id: string; dealer_id: string; amount: number; reason: string; stripe_payment_id: string | null; meta: Json | null; created_at: string };
        Insert: Omit<Database["public"]["Tables"]["credit_transactions"]["Row"], "id"|"created_at"> & Partial<Pick<Database["public"]["Tables"]["credit_transactions"]["Row"], "id"|"created_at">>;
        Update: Partial<Database["public"]["Tables"]["credit_transactions"]["Insert"]>;
      };
      dealer_reviews: {
        Row: { id: string; dealer_id: string; consumer_id: string; offer_id: string; rating: number; comment: string | null; created_at: string };
        Insert: Omit<Database["public"]["Tables"]["dealer_reviews"]["Row"], "id"|"created_at"> & Partial<Pick<Database["public"]["Tables"]["dealer_reviews"]["Row"], "id"|"created_at">>;
        Update: Partial<Database["public"]["Tables"]["dealer_reviews"]["Insert"]>;
      };
    };
  };
}
