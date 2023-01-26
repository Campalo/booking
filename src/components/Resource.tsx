import { format, isWithinInterval } from "date-fns";
import { useEffect, useState } from "react";
import { ResourceType } from "../utils/useResource";
import "./Resource.scss";

interface Props {
  resource: ResourceType | undefined;
}

const Resource = ({ resource }: Props) => {
  const [isBookedNow, setIsBookedNow] = useState(false);

  useEffect(() => {
    if (!!resource?.bookingInfo) {
      const interval = {start: new Date(resource?.bookingInfo?.start), end: new Date(resource?.bookingInfo?.end)}
      setIsBookedNow(!!interval && isWithinInterval(new Date(resource?.bookingInfo?.start), interval));
    }
  }, [resource?.bookingInfo])

  return (
    <header>
      <h1>{resource?.name}</h1>
      <div>
        {isBookedNow && resource?.bookingInfo? (
          <>
            <h2>Booked</h2>
            <p>By {resource?.bookingInfo?.userId}</p>
            <p>From {format(new Date(resource?.bookingInfo?.start), "p")} to {format(new Date(resource?.bookingInfo?.end), "p")}</p>
          </>
        ) : (
          <>
            <h2>Free</h2>
            <button onClick={() => console.log("TODO: Book")}>Book now</button>
            <p>
              Booking range: from {resource?.minimumBookingDuration} min to {resource?.maximumBookingDuration} min.
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default Resource;
