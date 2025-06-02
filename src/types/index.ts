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

export type SessionExpiredModalProps = {
    open: boolean;
    onClose: () => void;
}

export type PaginationProps = {
    totalPages: number;
}

export type PhotoListProps = {
    items: Photo[];
};
