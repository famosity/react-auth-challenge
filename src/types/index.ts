export type Photo = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};
  
export type ResponseApi = {
    content : Photo[]
    total_elements: number
    total_pages: number
  }
  