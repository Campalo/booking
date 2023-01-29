import { add, differenceInMinutes } from "date-fns";
import { BookingType } from "./useBookings";
import { ResourceType } from "./useResource";

export  const getMaxEnd = (start: Date, bookings: BookingType[], resource: ResourceType) => {
  const orderedBookings: BookingType[] = bookings.sort((a, b ) => {
    return a.start.getTime() - b.start.getTime();
  })

  let nextBooking: BookingType | undefined;

  for (const booking of orderedBookings) {
    const isBookingBeforeStart = start > booking.end;
    if(isBookingBeforeStart) continue; // check the next booking

    const isStartInsideBooking = start > booking.start;
    if(isStartInsideBooking) return; // booking is not possible

    // booking is after start
    nextBooking = booking;
    break;
  }

  if (!nextBooking) return resource.maximumBookingDuration; // next time span is free, no booking;

  const minEnd = add(start, {minutes: resource.minimumBookingDuration});
  const isNextBookingAllowed = minEnd < nextBooking.start;
  if (!isNextBookingAllowed) return;

  const delta = differenceInMinutes(nextBooking.start, start);
  return Math.min(resource.maximumBookingDuration, delta);
};
