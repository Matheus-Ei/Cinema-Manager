// Libraries
import { Dispatch, JSX, SetStateAction } from "react";

export type SetStateType<T> = Dispatch<SetStateAction<T>>;

export type ElementType = JSX.Element | null;

export interface IconType {
  name: string;
  library: string;
}

export interface ResponseType<T = object> {
  message: string;
  resource?: T;
  error?: string;
}

export type AsyncMaybe<T> = Promise<T | null>;

export type Editable<T> = Partial<Omit<T, "id">>;
