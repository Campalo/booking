import { format } from "date-fns";
import { BookingData, BookingType } from "../utils/useBookings";
import { ResourceType } from "../utils/useResource";
import { getCurrentBooking, getMaxEnd } from "../utils/utils";
import "./Resource.scss";

interface Props {
  resource: ResourceType;
  bookings: BookingType[];
  book: (data: BookingData) => void;
}

const Resource = ({ resource, bookings, book }: Props) => {
  const isBookedNow = getMaxEnd(new Date(), bookings, resource) === undefined;
  const currentBooking = getCurrentBooking(new Date(), bookings);

  return (
    <header>
      <h1>{resource.name}</h1>
      <div>
        {isBookedNow ? (
          <>
            <h2>Booked</h2>
            {!!currentBooking ? (
              <>
                <p>By {currentBooking.userId}</p>
                <p>From <time>{format(currentBooking.start, "p")}</time> to <time>{format(currentBooking.end, "p")}</time></p>
              </>
            ) : (
              <p>The next booking starts in less than {resource.minimumBookingDuration}min</p>
            )}
          </>
        ) : (
          <>
            <h2>Available</h2>
            <button onClick={() => book({ name: "NEW BOOKING", duration: 10})}>Book now</button>
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
