import React, { useEffect } from "react";
import "./App.scss";
import Resource, { ResourceType } from "../components/Resource";
import BookingList from "../components/BookingList";
import { useAuth } from "../utils/auth";
import { useApi } from "../utils/useApi";
import { useBookings } from "../utils/useBookings";

const Page = () => {
  const { data: resource, getApi: getResource } = useApi<ResourceType>("resource");
  const { bookings, getBookings, addBooking } = useBookings();

  useEffect(() => {
    getResource();
    getBookings();
  }, [])

  if (!resource || !bookings) return <p>Loading...</p>;

  return (
    <>
      <Resource resource={resource} bookings={bookings} addBooking={addBooking}/>
      <BookingList bookings={bookings} />
    </>
  );
};

function App() {
  const { login, auth } = useAuth();
  const isValidToken = auth && new Date(auth.expirationDate) > new Date();

  if (!isValidToken) {
    return <button onClick={login}>Login</button>;
  }

  return <Page />;
}

export default App;
