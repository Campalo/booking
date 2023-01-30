import { useEffect, useState } from "react";
import * as api from "../api/api";
import { useAuth } from "./auth";

export interface ResourceType {
  id: string;
  name: string;
  bookingDurationStep: number;
  maximumBookingDuration: number;
  minimumBookingDuration: number;
}

export const useResource = () => {
  const {auth, reset} = useAuth();
  const [resource, setResource] = useState<ResourceType>();

  useEffect(()=> {
    if (!auth) {
      throw new Error("You should not pass!")
    };

    api.getResource(auth.token)
      .then(result => {
        setResource(result.data);
      })
      .catch(error => {
        console.error(error);
        reset();
      })
    }, []);

  return {resource};
}
