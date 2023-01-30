import React from "react";
import "./App.scss";
import Resource from "../components/Resource";
import BookingList from "../components/BookingList";
import { useResource } from "../utils/useResource";
import { useBookings } from "../utils/useBookings";
import { useAuth } from "../utils/auth";

const Page = () => {
  const { resource } = useResource();
  const { bookings, book } = useBookings();

  if (!resource || !bookings) return <p>Loading...</p>;

  return (
    <>
      <Resource resource={resource} bookings={bookings} book={book} />
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
