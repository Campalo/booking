import { BookingType } from "../page/App";

interface Props {
  bookings: BookingType[];
}

const BookingList = ({bookings}: Props) => {
  if (!bookings.length) {
    return (<p>No bookings found</p>)
  }

  const list = bookings.map((booking) => {
    return (
      <li key={booking.id}>
        <span>{booking.name}</span>
      </li>
    )
  })

  return (
    <ol>
      {list}
    </ol>
  )

};

export default BookingList;