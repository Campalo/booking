import { BASE_API_URL } from "../utils/constants";

const url = (path: string) => `${BASE_API_URL}/${path}`;

export const get = async <T>(token: string, path: string): Promise<T> => {
  const response = await fetch(
    url(path),
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + token,
        }
      }
    );

    if (response.status === 401) throw new Error("Unauthorized");

    const result = await response.json();

    if(result.success === true) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
}

export const post = async <T>(token: string, path: string, payload: Record<string, any>): Promise<T> => {
  const response = await fetch(
    url(path),
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(payload),
    }
  )

  if (response.status === 401) throw new Error("Unauthorized");

  const result = await response.json();

  if(result.success === true) {
    return result.data;
  } else {
    throw new Error(result.message);
  }
}

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
  return response.json();
};
