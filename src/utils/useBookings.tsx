import { useEffect, useState } from "react";
import { AuthType, useAuth } from "./auth";
import * as api from "../api/api";

export interface BookingType {
  id: string;
  start: Date;
  end: Date;
  name: string;
  userId: string;
}

export interface BookingData {
  name: string,
  duration: number,
}

const formatBookings = (bookings: any[]): BookingType[] => {
  return bookings.map((booking) => {
   return {
      ...booking,
      start: new Date(booking.start),
      end: new Date(booking.end),
    }
  })
}

export const useBookings = () => {
  const { auth, reset } = useAuth();
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [error, setError] = useState("");

  const getBookings = (auth: AuthType) => {
    if (!auth) {
      throw new Error("You should not pass!");
    }

    api.getBookings(auth.token)
      .then((result) => {
        setBookings(formatBookings(result.data));
      })
      .catch((error) => {
        if (error === "You must be logged in to access this") {
          reset();
        } else {
          setError(error.toString());
        }
      });
  }

  const book = (data : BookingData) => {
    if (!auth) {
      throw new Error("You should not pass!");
    }
    api.postBookings(auth?.token, data)
      .then(() => getBookings(auth));
  }

  useEffect(() => {
    if (!auth) {
      throw new Error("You should not pass!");
    }
    getBookings(auth);
  }, []);

  return { bookings, bookingsError: error, book };
};
