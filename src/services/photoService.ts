import axiosInstance from "../api/axiosInstance";
import type { Photo, ResponseApi } from "../types";

export const getPhotos = async (page:number, limit:number): Promise<ResponseApi> => {
  console.log("page", page)
 const elements = page === 1 ? 1 : page*20
  const response = await axiosInstance.get<Photo[]>(`photos?_start=${elements}&_limit=${limit}`);
  return  {
    content : response.data,
    total_elements: 2000,
    total_pages: 100,
  }
};
