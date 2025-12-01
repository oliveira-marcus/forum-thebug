import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextData {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
  loadStoredData: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("@forum:token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  function loadStoredData() {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("@forum:token");

      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  function signIn(newToken: string) {
    try {
      localStorage.setItem("@forum:token", newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Erro ao salvar token:", error);
      throw error;
    }
  }

  function signOut() {
    try {
      localStorage.removeItem("@forum:token");
      setToken(null);
    } catch (error) {
      console.error("Erro ao remover dados:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        signIn,
        signOut,
        loadStoredData,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
