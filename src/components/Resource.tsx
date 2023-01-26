import { format, isWithinInterval } from "date-fns";
import { BookingType } from "../utils/useBookings";
import { ResourceType } from "../utils/useResource";
import "./Resource.scss";

interface Props {
  resource: ResourceType;
  bookings: BookingType[];
}

const isBookedNow = (booking?: BookingType):booking is BookingType => {
  if (!booking) return false;
  const interval = {
    start: booking.start,
    end: booking.end
  };
  return isWithinInterval(new Date(), interval);
}

const Resource = ({ resource, bookings }: Props) => {
  const booking = bookings.find((booking) => booking.id === resource?.id);

  return (
    <header>
      <h1>{resource.name}</h1>
      <div>
        {isBookedNow(booking) ? (
          <>
            <h2>Booked</h2>
            <p>By {booking.userId}</p>
            <p>From {format(booking.start, "p")} to {format(booking.end, "p")}</p>
          </>
        ) : (
          <>
            <h2>Available</h2>
            <button onClick={() => console.log("TODO: Book")}>Book now</button>
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
