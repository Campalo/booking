import { useEffect, useState } from "react";
import { useAuth } from "./auth";
import * as api from "../api/api";

export interface BookingType {
  id: string;
  start: Date;
  end: Date;
  name: string;
  userId: string;
}

export const useBookings = () => {
  const { auth, reset } = useAuth();
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) {
      throw new Error("You should not pass!");
    }

    api
      .getBookings(auth.token)
      .then((result) => {
        setBookings(result.data);
      })
      .catch((error) => {
        if (error === "You must be logged in to access this") {
          reset();
        } else {
          setError(error.toString());
        }
      });
  }, []);

  return { bookings, bookingsError: error };
};
