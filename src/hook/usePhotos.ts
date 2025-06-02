import { useEffect, useState } from "react";
import { getPhotos } from "@/services/photoService";
import { useAuth } from "@/hook/useAuth";
import { usePageParam } from "@/hook/usePageParam";
import { useNavigate } from "react-router";
import type { ResponseApi } from "@/types";
import { TIMEOUT, TOTAL_ITEMS } from "@/utils/constant";

export const usePhotos = () => {
  const { token } = useAuth();
  const { page } = usePageParam();
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<ResponseApi | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await getPhotos(page, TOTAL_ITEMS);
        setPhotos(response);
      } catch (error) {
        console.error("Ocurrió un error:", error);
        navigate("/errorPhotos");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, TIMEOUT);
      }
    };

    fetchPhotos();
  }, [token, page]);

  return { photos, loading };
};
