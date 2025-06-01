import { useSearchParams } from "react-router";

export const usePageParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  return {
    page: isNaN(page) || page < 1 ? 1 : page,
    setSearchParams,
    searchParams,
  };
};