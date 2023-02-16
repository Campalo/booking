import { endOfDay, format, startOfDay } from "date-fns";
import "./BookingList.scss";

export interface BookingType {
  id: string;
  start: Date;
  end: Date;
  name: string;
  userId: string;
}

interface Props {
  bookings: BookingType[];
}

const BookingList = ({bookings}: Props) => {
  if (!bookings.length) {
    return (<p>No bookings found</p>)
  }

  let rows = [];
  let previousEnd = startOfDay(new Date());

  for (const booking of bookings) {
    // Rows between bookings
    if (booking.start > previousEnd) {
      rows.push((
        <tr key={booking.start.getTime()} className="available">
          <td><time>{format(previousEnd, "p")}</time> - <time>{format(booking.start, "p")}</time></td>
          <td>Available</td>
        </tr>
      ))
    }

    // Rows for bookings
    rows.push((
      <tr key={booking.end.getTime()} className="booked">
        <td><time>{format(booking.start, "p")}</time> - <time>{format(booking.end, "p")}</time></td>
        <td>{booking.name}</td>
      </tr>
    ))

    previousEnd = booking.end;
  }

  // Rows after last booking until end of day
  const endOfTheDay = endOfDay(new Date());
  if (endOfTheDay > previousEnd) {
    rows.push((
      <tr key={endOfTheDay.getTime()} className="available">
        <td><time>{format(previousEnd, "p")}</time> - <time>{format(endOfTheDay, "p")}</time></td>
        <td>Available</td>
      </tr>
    ))
  }

  return (
    <table>
      <caption>Today's bookings</caption>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
};

export default BookingList;