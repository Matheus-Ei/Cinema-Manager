import { ResponseType } from "@/types/global";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Storage } from "./storage";

type ReturnType<T> = Promise<T | undefined>;
type AxiosResponseType<T> = ReturnType<AxiosResponse<{ resource: T }>>;

export class Request {
  private static backendUrl = process.env.NEXT_PUBLIC_BACK_URL as string;

  private static treatError = (error: AxiosError) => {
    if (error.response) {
      const { data } = error.response;

      if (data && typeof data === "object" && "message" in data) {
        const unknownError = "Unknown error on server";

        const errorMessage = (data as ResponseType).message || unknownError;
        const consoleError = (data as ResponseType).error;

        if (consoleError) console.error(consoleError);

        throw new Error(errorMessage);
      } else {
        throw new Error(error.message);
      }
    } else if (error.request) {
      throw new Error("No response recived");
    } else {
      throw new Error(error.message);
    }
  };

  static get = async <T = Record<string, unknown>[]>(
    endpoint: string,
  ): AxiosResponseType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${Storage.get("access_token")}` },
        withCredentials: true,
      });

      return response;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };

  static post = async <T>(
    endpoint: string,
    body?: object,
  ): AxiosResponseType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${Storage.get("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return await response.data;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };

  static delete = async <T>(endpoint: string): AxiosResponseType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${Storage.get("access_token")}` },
        withCredentials: true,
      });

      return await response.data;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };

  static put = async <T>(
    endpoint: string,
    body?: object,
  ): AxiosResponseType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.put(url, body, {
        headers: { Authorization: `Bearer ${Storage.get("access_token")}` },
        withCredentials: true,
      });

      return await response.data;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };

  static patch = async <T>(
    endpoint: string,
    body?: object,
  ): AxiosResponseType<T> => {
    const url = `${this.backendUrl}/${endpoint}`;

    try {
      const response = await axios.patch(url, body, {
        headers: {
          Authorization: `Bearer ${Storage.get("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      return await response.data;
    } catch (error) {
      this.treatError(error as AxiosError);
    }
  };
}
