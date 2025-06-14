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
  console.log(response);
  return Promise.resolve(response.data);
};

export const CreateMovie = async (
  obj: Movie,
  apiKey: string
): Promise<string> => {
  const response = await apiClient.post(BASE_ROUTE, obj, {
    headers: { "x-api-key": apiKey },
  });
  return Promise.resolve(response.data);
};

export const UpdateMovie = async (
  id: string,
  obj: Movie,
  apiKey: string
): Promise<void> => {
  await apiClient.put(`${BASE_ROUTE}/${id}`, obj, {
    headers: { "x-api-key": apiKey },
  });
};

export const DeleteMovie = async (
  id: string,
  apiKey: string
): Promise<void> => {
  await apiClient.delete(`${BASE_ROUTE}/${id}`, {
    headers: { "x-api-key": apiKey },
  });
};

export const AddMovieActor = async (
  movieId: string,
  actorId: string,
  apiKey: string
) => {
  await apiClient.post(
    `${BASE_ROUTE}/${movieId}/actor`,
    { actorId: actorId },
    {
      headers: { "x-api-key": apiKey },
    }
  );
};

export const RemoveMovieActor = async (
  movieId: string,
  actorId: string,
  apiKey: string
) => {
  await apiClient.delete(`${BASE_ROUTE}/${movieId}/actor/${actorId}`, {
    headers: { "x-api-key": apiKey },
  });
};
