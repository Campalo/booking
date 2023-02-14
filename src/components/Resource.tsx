import { format } from "date-fns";
import { useEffect } from "react";
import { useApi } from "../utils/useApi";
import { getCurrentBooking, getIntervals } from "../utils/utils";
import { BookingType } from "./BookingList";
import { BookingPayload, FormModal } from "./FormModal";
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
  addBooking: (bookings: BookingPayload) => Promise<void>;
}

interface User {
  id: string;
  name: string;
}

const Resource = ({ resource, bookings, addBooking }: Props) => {
  const { data: user, getApi: getUser, setData: setUser } = useApi<User>('users');
  const currentBooking = getCurrentBooking(new Date(), bookings);
  const intervals = getIntervals(new Date(),resource, bookings);
  const isBookedNow = intervals === undefined;
  const showModal = () => (document.getElementById("dialog") as any).showModal();

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
            <button onClick={showModal} className="primary">Book now</button>
            <FormModal addBooking={addBooking} intervals={intervals}/>
            <p>
              This room can be booked from {resource.minimumBookingDuration} to {resource.maximumBookingDuration} min.
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default Resource;
