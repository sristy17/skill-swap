import { supabase } from "@/helpers/supabase";

export interface ProfileData {
  user_id: string;
  full_name: string | null;
  location: string | null;
  bio: string | null;
  is_public: boolean;
  skills_offered: string[];
  skills_wanted: string[];
  availability: string[];
  timezone: string | null;
  availability_notes: string | null;
}

export interface ProfileUpdateData {
  full_name?: string;
  location?: string;
  bio?: string;
  is_public?: boolean;
  skills_offered?: string[];
  skills_wanted?: string[];
  availability?: string[];
  timezone?: string;
  availability_notes?: string;
}

export async function fetchProfile(): Promise<{
  profile: ProfileData | null;
  error: { message: string } | null;
}> {
  try {
    const userId = localStorage.getItem("user_session_id");

    if (!userId) {
      return {
        profile: null,
        error: { message: "User not authenticated. Please sign in." },
      };
    }

    const { data: profile, error: supabaseError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (supabaseError) {
      console.error("Supabase fetch profile error:", supabaseError);
      return {
        profile: null,
        error: { message: supabaseError.message || "Failed to fetch profile." },
      };
    }

    return { profile, error: null };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("Fetch profile error:", err);
    return {
      profile: null,
      error: { message: errorMessage },
    };
  }
}

export async function updateProfile(
  data: ProfileUpdateData
): Promise<{ error: { message: string } | null }> {
  try {
    // Get the user's ID from localStorage
    const userId = localStorage.getItem("user_session_id");

    if (!userId) {
      return { error: { message: "User not authenticated. Please sign in." } };
    }

    const { error: supabaseError } = await supabase
      .from("profiles")
      .update(data)
      .eq("user_id", userId);

    if (supabaseError) {
      console.error("Supabase update profile error:", supabaseError);
      return {
        error: {
          message: supabaseError.message || "Failed to update profile.",
        },
      };
    }

    return { error: null };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    console.error("Update profile error:", err);
    return {
      error: { message: errorMessage },
    };
  }
}
