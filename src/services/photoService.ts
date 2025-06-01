import axiosInstance from "../api/axiosInstance";
import type { Photo, ResponseApi } from "../types";

export const getPhotos = async (page:number, limit:number): Promise<ResponseApi> => {
  const response = await axiosInstance.get<Photo[]>(`photos?_start=${page}&_limit=${limit}`);
  return  {
    content : response.data,
    total_elements: 2000,
    total_pages: 100,
  }
};
