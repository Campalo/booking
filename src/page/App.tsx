import React, { useEffect, useState } from 'react';
import './App.scss';
import Resource from '../components/Resource';
import * as api from '../api/api';
import BookingList from '../components/BookingList';

export interface AuthType {
  token : string,
  expirationDate: Date
}

export interface ResourceType {
  id: string;
  name: string;
  bookingDurationStep: number;
  maximumBookingDuration: number;
  minimumBookingDuration: number;
}

export interface BookingType {
  id: string;
  start: Date;
  end: Date;
  name: string;
  userId: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState<AuthType>({token: "", expirationDate: new Date()});
  const [error, setError] = useState("");
  const [resource, setResource] = useState<ResourceType>();
  const [bookings, setBookings] = useState<BookingType[]>([]);

  const login = () => {
    api.login()
      .then(result => {
        setAuth(result.data);
        setIsLoggedIn(true);
      })
      .catch(error => setError(error.toString()))
  }

  useEffect(() => {
    if(isLoggedIn) {
      api.getResource(auth.token)
      .then(result => {
        setResource(result.data);
      })
      .catch(error => setError(error.toString()))

      api.getBookings(auth.token)
        .then(result => {
          setBookings(result.data);
          console.log(result.data)
        })
        .catch(error => setError(error.toString()))
    }
  }, [isLoggedIn, auth]);

  if (!!error) {
    return (
      <>
        <p>{error}</p>
      </>
    )
  }

  return (
    <>
      {isLoggedIn
      ? (
        <>
          <Resource resource={resource}/>
          <BookingList bookings={bookings}/>
        </>
      )
      : <button onClick={login}>Login</button>}
    </>
  );
}

export default App;
