import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as api from "../api/api";

export interface AuthType {
  token: string;
  expirationDate: Date;
}

export interface AuthContextValue {
  auth: AuthType | null,
  login: () => void,
  reset: () => void,
}

const defaultValue = {
  auth: null,
  login: () => {},
  reset: () => {},
};

const AuthContext = createContext<AuthContextValue>(defaultValue);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children} : {children: ReactNode}) => {
  const [auth, setAuth] = useState<AuthType | null>(null);

  const login = async () => {
    return api.login().then((result) => {
      setAuth(result.data);
      localStorage.setItem("auth", JSON.stringify(result.data));
    });
  };

  const reset = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  }

  useEffect(() => {
    const item = localStorage.getItem("auth");

    if (item) {
      const { token, expirationDate } = JSON.parse(item);
      if (new Date(expirationDate) > new Date()) {
        setAuth({token, expirationDate});
      } else {
        reset();
      }
    }
  }, []);

  return <AuthContext.Provider value={{auth, login, reset}}>{children}</AuthContext.Provider>
};