import { useEffect, useState } from "react";
import * as api from "../api/api";
import { useAuth } from "./useAuth";
import { BookingType, useBookings } from "./useBookings";

export interface ResourceType {
  id: string;
  name: string;
  bookingDurationStep: number;
  maximumBookingDuration: number;
  minimumBookingDuration: number;
  bookingInfo?: BookingType;
}

export const useResource = () => {
  const [resource, setResource] = useState<ResourceType>();
  const [error, setError] = useState("");
  const { auth, isLoggedIn} = useAuth();
  const { bookings } = useBookings();

  useEffect(() => {
    if(isLoggedIn) {
      api.getResource(auth.token)
      .then(result => {
        setResource(result.data);
      })
      .catch(error => setError(error.toString()))
    }
  }, [isLoggedIn, auth]);

  useEffect(() => {
    if (!!resource) {
      const bookingInfo =  bookings.find((booking) => booking.id === resource.id);
      setResource({...resource, bookingInfo});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  return {resource, resourceError: error};
}
