import { useState } from "react";
import { get, post } from "../api/api";
import { useAuth } from "./auth";

export function useApi<T>(
  basePath: string,
  transform: (valueFromServer: any) => T = (v) => v
) {
  const { auth, reset } = useAuth();
  const [data, setData] = useState<T>();

  function getApi(param?: string) {
    if (!auth) {
      reset();
      throw new Error("You shall not pass! Please login.");
    }
    const path = param ? basePath + "/" + param : basePath;

    return get<T>(auth.token, path)
      .then((result) => setData(transform(result)))
      .catch((error) => {
        if (error.message === "Unauthorized") reset();
        throw error;
      })
  }

  function postApi(payload: Record<string, any>) {
    if (!auth) {
      reset();
      throw new Error("You shall not pass! Please login.");
    }
    return post<T>(auth.token, basePath, payload)
      .catch((error) => {
        if (error === "Unauthorized") reset();
        throw error;
      })
  }

  return { getApi, postApi, data, setData };
}