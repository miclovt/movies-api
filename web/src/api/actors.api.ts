import { Actor } from "@/types/movies";
import { apiClient } from "@/utils/apiClient";

const BASE_ROUTE = "actor";

export const GetActors = async (): Promise<Actor[]> => {
  const response = await apiClient.get(BASE_ROUTE);
  console.log(response);
  return Promise.resolve(response.data);
};

export const GetActor = async (id: string): Promise<Actor | null> => {
  const response = await apiClient.get(`${BASE_ROUTE}/${id}`);
  return Promise.resolve(response.data);
};

export const CreateActor = async (
  obj: Actor,
  apiKey: string
): Promise<string> => {
  const response = await apiClient.post(BASE_ROUTE, obj, {
    headers: { "x-api-key": apiKey },
  });
  return Promise.resolve(response.data);
};

export const UpdateActor = async (
  id: string,
  obj: Actor,
  apiKey: string
): Promise<void> => {
  const response = await apiClient.put(`${BASE_ROUTE}/${id}`, obj, {
    headers: { "x-api-key": apiKey },
  });
  return Promise.resolve(response.data);
};

export const DeleteActor = async (
  id: string,
  apiKey: string
): Promise<void> => {
  const response = await apiClient.delete(`${BASE_ROUTE}/${id}`, {
    headers: { "x-api-key": apiKey },
  });
  return Promise.resolve(response.data);
};
