import { supabase } from "@/helpers/supabase";
import { User, UserSession } from "./types";

export async function signUp(
  email: string,
  password: string
): Promise<{ user: User | null; error: { message: string } | null }> {
  try {
    const { data: userData, error: supabaseError } = await supabase
      .from("users")
      .insert({
        email,
        password,
        full_name: "",
        location: "",
        bio: ""
      })
      .select()
      .single();

    if (supabaseError) {
      if (supabaseError.code === "23505") {
        return { user: null, error: { message: "Email already exists." } };
      }
      return {
        user: null,
        error: { message: supabaseError.message || "Failed to register user." },
      };
    }

    // --- NEW LOGIC: Create a corresponding profile record ---
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        user_id: userData.id,
      });
      
    if (profileError) {
      // It's a good practice to log this, even if the user was created.
      console.error("Failed to create user profile:", profileError);
    }
    // --- END NEW LOGIC ---

    return { user: userData as User, error: null };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred during signup.";
    console.error("Signup error:", err);
    return {
      user: null,
      error: { message: errorMessage },
    };
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<{
  user: User | null;
  session: UserSession | null;
  error: { message: string } | null;
}> {
  try {
    const { data: userFromDb, error: supabaseError } = await supabase
      .from("users")
      .select("*") 
      .eq("email", email)
      .single();

    if (supabaseError || !userFromDb) {
      return {
        user: null,
        session: null,
        error: { message: "Invalid credentials." },
      };
    }

    const isPasswordValid = password === userFromDb.password;

    if (!isPasswordValid) {
      return {
        user: null,
        session: null,
        error: { message: "Invalid credentials." },
      };
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("user_session_id", userFromDb.id);
      localStorage.setItem("user_session_email", userFromDb.email);
    }

    delete userFromDb.password;

    return {
      user: userFromDb as User,
      session: { userId: userFromDb.id, email: userFromDb.email },
      error: null,
    };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred during sign-in.";
    console.error("Sign-in error:", err);
    return {
      user: null,
      session: null,
      error: { message: errorMessage },
    };
  }
}

export async function signOut(): Promise<{
  error: { message: string } | null;
}> {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_session_id");
      localStorage.removeItem("user_session_email");
    }
    return { error: null };
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred during sign-out.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Catch-all Sign-out error:", err);
    return {
      error: { message: errorMessage },
    };
  }
}

export async function getSession(): Promise<{
  session: UserSession | null;
  error: { message: string } | null;
}> {
  try {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("user_session_id");
      const userEmail = localStorage.getItem("user_session_email");

      if (userId && userEmail) {
        return { session: { userId, email: userEmail }, error: null };
      }
    }
    return { session: null, error: null };
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred getting the session.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.error("Catch-all Get session error:", err);
    return {
      session: null,
      error: { message: errorMessage },
    };
  }
}