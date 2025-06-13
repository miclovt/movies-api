import { Movie, RateAverage } from "@/types/movies";
import { apiClient } from "@/utils/apiClient";

const BASE_ROUTE = `movie`;

export const GetMovies = async (): Promise<Movie[]> => {
  const response = await apiClient.get(BASE_ROUTE);
  return Promise.resolve(response.data);
};

export const GetMovie = async (id: string): Promise<Movie> => {
  const response = await apiClient.get(`${BASE_ROUTE}/${id}`);
  return Promise.resolve(response.data);
};
export const GetMovieAvgRate = async (id: string): Promise<RateAverage> => {
  const response = await apiClient.get(`${BASE_ROUTE}/${id}/rate`);
  return Promise.resolve(response.data);
};

export const CreateMovie = async (obj: Movie): Promise<string> => {
  const response = await apiClient.post(BASE_ROUTE, obj);
  return Promise.resolve(response.data);
};

export const UpdateMovie = async (id: string, obj: Movie): Promise<void> => {
  await apiClient.put(`${BASE_ROUTE}/${id}`, obj);
};

export const DeleteMovie = async (id: string): Promise<void> => {
  await apiClient.delete(`${BASE_ROUTE}/${id}`);
};

export const AddMovieActor = async (movieId: string, actorId: string) => {
  await apiClient.post(`${BASE_ROUTE}/${movieId}`, { actorId: actorId });
};

export const RemoveMovieActor = async (movieId: string, actorId: string) => {
  await apiClient.delete(`${BASE_ROUTE}/${movieId}/actor/${actorId}`);
};
