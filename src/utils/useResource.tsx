import { useEffect, useState } from "react";
import * as api from "../api/api";
import { useAuth } from "./useAuth";

export interface ResourceType {
  id: string;
  name: string;
  bookingDurationStep: number;
  maximumBookingDuration: number;
  minimumBookingDuration: number;
}

export const useResource = () => {
  const [resource, setResource] = useState<ResourceType>();
  const [error, setError] = useState("");
  const { auth, isLoggedIn} = useAuth();

  useEffect(() => {
    if(isLoggedIn) {
      api.getResource(auth.token)
      .then(result => {
        setResource(result.data);
      })
      .catch(error => setError(error.toString()))
    }
  }, [isLoggedIn, auth]);

  return {resource, resourceError: error};
}
