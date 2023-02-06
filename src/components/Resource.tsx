import { format } from "date-fns";
import { useEffect } from "react";
import { useApi } from "../utils/useApi";
import { getCurrentBooking, getMaxEnd } from "../utils/utils";
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
  addBooking: (bookings: BookingPayload) => void;
}

interface User {
  id: string;
  name: string;
}

export interface BookingPayload {
  name: string,
  duration: number,
}

const Resource = ({ resource, bookings, addBooking }: Props) => {
  const { data: user, getApi: getUser, setData: setUser } = useApi<User>('users');

  const isBookedNow = getMaxEnd(new Date(), bookings, resource) === undefined;
  const currentBooking = getCurrentBooking(new Date(), bookings);
  const mockedNewBooking: BookingPayload = {name: "NEW BOOKING", duration: 10};

  const bookResource = () => addBooking(mockedNewBooking);

  useEffect(() => {
    if (currentBooking) {
      getUser(currentBooking.userId);
    } else {
      setUser(undefined);
    }
  }, [currentBooking])

  return (
    <header>
      <h1>{resource.name}</h1>
      <div>
        {isBookedNow ? (
          <>
            <h2>Booked</h2>
            {!!currentBooking ? (
              <>
                <p>By {user?.name}</p>
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
