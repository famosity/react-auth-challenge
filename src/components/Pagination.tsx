import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./ui/pagination";
import { generatePaginationNumbers } from "@/utils/generatePaginationNumbers";
import { usePageParam } from "@/hook/usePageParam";
import type { PaginationProps } from "@/types";

function PaginationsComponent({ totalPages }: PaginationProps) {
  const{page, setSearchParams, searchParams}=usePageParam()


  const allPages = generatePaginationNumbers(page, totalPages);

  const handlePageChange = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (+pageNumber <= 0 || isNaN(+pageNumber)) {
      params.delete("page");
    } else if (+pageNumber > totalPages) {
      return;
    } else {
      params.set("page", pageNumber.toString());
    }

    setSearchParams(params);
  };

  return (
    <div className="py-12">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            </PaginationLink>
          </PaginationItem>

          {allPages.map((pag, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                
                isActive={pag === page}
              >
                <button onClick={() => handlePageChange(pag)}>
                  {pag}
                </button>
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationsComponent;
