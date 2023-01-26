import { useEffect, useState } from "react";
import * as api from "../api/api";

export interface AuthType {
  token : string,
  expirationDate: Date
}

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState<AuthType>({
    token: "",
    expirationDate: new Date(),
  });
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .login()
      .then((result) => {
        setAuth(result.data);
        setIsLoggedIn(true);
      })
      .catch((error) => setError(error.toString()));
  }, []);

  return {isLoggedIn, auth, authError: error};
};
