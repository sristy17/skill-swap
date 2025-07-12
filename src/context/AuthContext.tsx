import { createContext, useState, useEffect, useContext } from "react";
import { getSession, signIn as apiSignIn, signOut as apiSignOut, signUp as apiSignUp } from "../api/auth";

interface UserSession {
  userId: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserSession | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ user: any; session: any; error: any }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ user: any; error: any }>;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  signIn: () => Promise.resolve({ user: null, session: null, error: null }),
  signOut: () => Promise.resolve(),
  signUp: () => Promise.resolve({ user: null, error: null }),
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for session on initial load
  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession();
      if (session) {
        setIsAuthenticated(true);
        setUser(session);
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);

  const signIn = async (email, password) => {
    const { user, session, error } = await apiSignIn(email, password);
    if (session) {
      setIsAuthenticated(true);
      setUser(session);
    }
    return { user, session, error };
  };

  const signOut = async () => {
    await apiSignOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  const signUp = async (email, password) => {
    const { user, error } = await apiSignUp(email, password);
    return { user, error };
  }

  const value = {
    isAuthenticated,
    user,
    isLoading,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};