import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config/keys.conf";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
