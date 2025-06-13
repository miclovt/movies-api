import { Rate } from "@/types/movies";
import axios from "axios";

const BASE_ROUTE = "rate";

export const CreateRate = async (obj: Rate): Promise<string> => {
  const response = await axios.post(BASE_ROUTE, obj);
  return Promise.resolve(response.data);
};

export const DeleteRate = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_ROUTE}/${id}`);
};
