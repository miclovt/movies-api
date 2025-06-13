import { Actor } from "@/types/movies";
import axios from "axios";

const BASE_ROUTE = "actor";

export const GetActors = async (): Promise<Actor[]> => {
  const response = await axios.get(BASE_ROUTE);
  return Promise.resolve(response.data);
};

export const GetActor = async (id: string): Promise<Actor | null> => {
  const response = await axios.get(`${BASE_ROUTE}/${id}`);
  return Promise.resolve(response.data);
};

export const CreateActor = async (obj: Actor): Promise<string> => {
  const response = await axios.post(BASE_ROUTE, obj);
  return Promise.resolve(response.data);
};

export const UpdateActor = async (id: string, obj: Actor): Promise<void> => {
  const response = await axios.put(`${BASE_ROUTE}/${id}`, obj);
  return Promise.resolve(response.data);
};

export const DeleteActor = async (id: string): Promise<void> => {
  const response = await axios.delete(`${BASE_ROUTE}/${id}`);
  return Promise.resolve(response.data);
};
