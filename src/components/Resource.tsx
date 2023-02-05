import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useApi } from "../utils/useApi";
import { formatBookings, getCurrentBooking, getMaxEnd } from "../utils/utils";
import { BookingType } from "./BookingList";
import "./Resource.scss";

export interface ResourceType {
  id: string;
  name: string;
  bookingDurationStep: number;
  maximumBookingDuration: number;
  minimumBookingDuration: number;
}

interface Props {
  resource: ResourceType;
  bookings: BookingType[];
  setBookings: (bookings: BookingType[]) => void;
}

interface User {
  id: string;
  name: string;
}

export interface BookingPayload {
  name: string,
  duration: number,
}

const Resource = ({ resource, bookings, setBookings }: Props) => {
  const { getApi, postApi } = useApi();
  const isBookedNow = getMaxEnd(new Date(), bookings, resource) === undefined;
  const currentBooking = getCurrentBooking(new Date(), bookings);
  const [bookingUser, setBookingUser] = useState<User>();
  const mockedNewBooking: BookingPayload = {name: "NEW BOOKING", duration: 10};

  const bookResource = async () => {
    await postApi<BookingType>("bookings", mockedNewBooking);
    const updatedBookingList = await getApi<BookingType[]>("bookings"); // refetch updated booking list
    setBookings(formatBookings(updatedBookingList));
  }

  useEffect(() => {
    if (currentBooking) {
      getApi<User>(`users/${currentBooking.userId}`)
        .then((result) => setBookingUser(result))
    } else {
      setBookingUser(undefined);
    }
  }, [getApi, currentBooking])

  return (
    <header>
      <h1>{resource.name}</h1>
      <div>
        {isBookedNow ? (
          <>
            <h2>Booked</h2>
            {!!currentBooking ? (
              <>
                <p>By {bookingUser?.name}</p>
                <p>From <time>{format(currentBooking.start, "p")}</time> to <time>{format(currentBooking.end, "p")}</time></p>
              </>
            ) : (
              <p>The next booking starts in less than {resource.minimumBookingDuration}min</p>
            )}
          </>
        ) : (
          <>
            <h2>Available</h2>
            <button onClick={bookResource}>Book now</button>
            <p>
              Booking range: from {resource.minimumBookingDuration} min to {resource.maximumBookingDuration} min.
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default Resource;
