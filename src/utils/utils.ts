import { add, differenceInMinutes } from "date-fns";
import { BookingType } from "../components/BookingList";
import { ResourceType } from "../components/Resource";

// Sort bookings from start to end of day
export const orderBookings = (bookings: BookingType[]) => {
  return bookings.sort((a, b ) => {
    return a.start.getTime() - b.start.getTime();
  })
};

export const getCurrentBooking = (start: Date, bookings: BookingType[]) => {
  const orderedBookings = orderBookings(bookings);
  let currentBooking: BookingType | undefined;

  for (const booking of orderedBookings) {
    if (booking.end > start && start > booking.start) {
      currentBooking = booking;
      break;
    };
  }
  return currentBooking;
}

export const getMaxEnd = (start: Date, bookings: BookingType[], resource: ResourceType) => {
  let nextBooking: BookingType | undefined;
  const orderedBookings = orderBookings(bookings);

  for (const booking of orderedBookings) {
    const isBookingBeforeStart = start > booking.end;
    if(isBookingBeforeStart) continue; // check the next booking

    const isStartInsideBooking = start > booking.start;
    if(isStartInsideBooking) return; // booking is not possible

    // booking is after start
    nextBooking = booking;
    break;
  }
  if (!nextBooking) return resource.maximumBookingDuration; // next time span is free, no booking found

  const minEnd = add(start, {minutes: resource.minimumBookingDuration});
  const isNextBookingAllowed = minEnd <= nextBooking.start;
  if (!isNextBookingAllowed) return;

  const delta = differenceInMinutes(nextBooking.start, start);
  return Math.min(resource.maximumBookingDuration, delta);
};

export const getIntervals = (start: Date, resource: ResourceType, bookings: BookingType[]) => {
  const maxEnd = getMaxEnd(start, bookings, resource);

  if (!maxEnd) return;

  const {minimumBookingDuration, bookingDurationStep} = resource;
  const intervals: number[] = [];

  for (let i = minimumBookingDuration; i <= maxEnd; i += bookingDurationStep) {
    intervals.push(i);
  }

  return intervals;
}

export const formatBookings = (bookings: any[]): BookingType[] => {
  return bookings.map((booking) => {
   return {
      ...booking,
      start: new Date(booking.start),
      end: new Date(booking.end),
    }
  })
}