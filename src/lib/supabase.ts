import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function joinWaitlist(email: string) {
  const { error } = await supabase
    .from("waitlist")
    .insert({ email, referrer: "landing-page" });

  if (error) {
    console.error("Waitlist error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}