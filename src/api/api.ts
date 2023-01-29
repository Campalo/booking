import { BASE_API_URL } from "../utils/constants";
import { BookingData } from "../utils/useBookings";

const bearerToken =  (token: string) => "Bearer " + token;

export const login = async () => {
  const response = await fetch(
  `${BASE_API_URL}/login`,
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
    `${BASE_API_URL}/resource`,
    {
      method:"GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": bearerToken(token),
     },
    }
  );

  if (!response.ok) throw new Error ("No resource was found")
  return response.json();
};

export const getBookings = async (token: string) => {
  const response = await fetch(
    `${BASE_API_URL}/bookings`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": bearerToken(token),
      }
    }
  );

  if (!response.ok) throw new Error ("No booking was found")
  return response.json();
};

export const postBookings = async (token: string, data: BookingData) => {
  const response = await fetch(
    `${BASE_API_URL}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": bearerToken(token),
      },
      body: JSON.stringify(data),
    }
  )

  return response.json();
}
