import { BookingType } from "../components/BookingList";
import { BookingPayload } from "../components/Resource";
import { useApi } from "./useApi";
import { formatBookings } from "./utils";

export function useBookings() {
  const {
    data: bookings,
    getApi: getBookings,
    postApi: postBooking
  } = useApi<BookingType[]>("bookings", formatBookings);

  const addBooking = async (payload: BookingPayload) => {
    await postBooking(payload);
    await getBookings();
  }
  return { bookings, getBookings, addBooking }
}