import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import * as api from "../api/api";

export interface BookingType {
  id: string;
  start: Date;
  end: Date;
  name: string;
  userId: string;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [error, setError] = useState("");
  const {isLoggedIn, auth} = useAuth();

  useEffect(() => {
    if(isLoggedIn) {
      api.getBookings(auth.token)
        .then(result => {
          setBookings(result.data);
        })
        .catch(error => setError(error.toString()))
    }
  }, [isLoggedIn, auth]);

  return {bookings, bookingsError: error};
}