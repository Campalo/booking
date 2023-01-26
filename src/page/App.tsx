import React from 'react';
import './App.scss';
import Resource from '../components/Resource';
import BookingList from '../components/BookingList';
import { useResource } from '../utils/useResource';
import { useBookings } from '../utils/useBookings';

function App() {
  const {resource, resourceError} = useResource();
  const {bookings, bookingsError} = useBookings();

  const error = !!resourceError || !!bookingsError;
  const errorMessage = resourceError || bookingsError;

  if (!!error) {
    return (
      <>
        <h1>An error occurred</h1>
        <p>{errorMessage}</p>
      </>
    )
  }

  return (
    <>
      <Resource resource={resource}/>
      <BookingList bookings={bookings}/>
    </>
  );
}

export default App;
