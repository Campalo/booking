import React, { useEffect, useState } from "react";
import "./App.scss";
import Resource, { ResourceType } from "../components/Resource";
import BookingList, { BookingType } from "../components/BookingList";
import { useAuth } from "../utils/auth";
import { useApi } from "../utils/useApi";
import { formatBookings } from "../utils/utils";

const Page = () => {
  const { getApi } = useApi();
  const [resource, setResource] = useState<ResourceType>();
  const [bookings, setBookings] = useState<BookingType[]>();

  useEffect(() => {
    getApi<ResourceType>("resource").then((result) => setResource(result));
    getApi<BookingType[]>("bookings").then((result) => setBookings(formatBookings(result)));
  }, [])

  if (!resource || !bookings) return <p>Loading...</p>;

  return (
    <>
      <Resource resource={resource} bookings={bookings} setBookings={setBookings}/>
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
