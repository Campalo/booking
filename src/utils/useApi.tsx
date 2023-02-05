import { get, post } from "../api/api";
import { useAuth } from "./auth";

export const useApi = () => {
  const { auth, reset } = useAuth();

  function getApi<T>(path: string) {
    if (!auth) {
      reset();
      throw new Error("You shall not pass! Please login.");
    }
    return get<T>(auth.token, path)
      .catch((error) => {
        if (error.message === "Unauthorized") reset();
        throw error;
      })
  }

  function postApi<T>(path: string, payload: Record<string, any>) {
    if (!auth) {
      reset();
      throw new Error("You shall not pass! Please login.");
    }
    return post<T>(auth.token, path, payload)
      .catch((error) => {
        if (error === "Unauthorized") reset();
        throw error;
      })
  }

  return { getApi, postApi };
}