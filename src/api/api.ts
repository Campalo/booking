import { BASE_API_URL } from "../utils/constants";
import { BookingData } from "../utils/useBookings";

const url = (path: string) => `${BASE_API_URL}/${path}`;
const headers = (token: string) => {
  return {
    "Content-type": "application/json",
    "Authorization": "Bearer " + token,
  }
};

export const login = async () => {
  const response = await fetch(
  url("login"),
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  if (!response.ok) throw new Error ("The user authentication failed")
  return response.json();
};


export const getResource = async (token: string) => {
  const response = await fetch(
    url("resource"),
    {
      method:"GET",
      headers: headers(token)
    }
  );

  if (!response.ok) throw new Error ("No resource was found")
  return response.json();
};

export const getBookings = async (token: string) => {
  const response = await fetch(
    url("bookings"),
    {
      method: "GET",
      headers: headers(token)
    }
  );

  if (!response.ok) throw new Error ("No booking was found")
  return response.json();
};

export const postBookings = async (token: string, data: BookingData) => {
  const response = await fetch(
    url("bookings"),
    {
      method: "POST",
      headers: headers(token),
      body: JSON.stringify(data),
    }
  )

  return response.json();
}
