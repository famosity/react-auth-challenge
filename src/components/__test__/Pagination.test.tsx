import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaginationsComponent from "../Pagination";

const setSearchParams = jest.fn();
jest.mock("../../hook/usePageParam", () => ({
  usePageParam: () => ({
    page: 2,
    setSearchParams,
    searchParams: "",
  }),
}));

jest.mock("@/utils/generatePaginationNumbers", () => ({
  generatePaginationNumbers: jest.fn(() => [1, 2, 3]),
}));

describe("PaginationsComponent", () => {
  beforeEach(() => {
    setSearchParams.mockClear();
  });

  it("renderiza los botones de paginación correctamente", () => {
    render(<PaginationsComponent totalPages={3} />);
    expect(screen.getByRole("button", { name: /1/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /2/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /3/ })).toBeInTheDocument();
    const chevronButtons = screen.getAllByRole("button", { name: "" });
    expect(chevronButtons).toHaveLength(2);
  });

  it("llama a setSearchParams al hacer click en un número de página", () => {
    render(<PaginationsComponent totalPages={3} />);
    fireEvent.click(screen.getByRole("button", { name: /1/ }));
    expect(setSearchParams).toHaveBeenCalled();
  });

  it("deshabilita el botón de retroceso si está en la primera página", () => {
    jest
      .spyOn(require("../../hook/usePageParam"), "usePageParam")
      .mockReturnValue({
        page: 1,
        setSearchParams,
        searchParams: "",
      });
    render(<PaginationsComponent totalPages={3} />);
    const prevButton = screen.getAllByRole("button", { name: "" })[0];
    expect(prevButton).toBeDisabled();
  });

  it("deshabilita el botón de avance si está en la última página", () => {
    jest
      .spyOn(require("../../hook/usePageParam"), "usePageParam")
      .mockReturnValue({
        page: 3,
        setSearchParams,
        searchParams: "",
      });
    render(<PaginationsComponent totalPages={3} />);
    const nextButton = screen.getAllByRole("button", { name: "" })[1];
    expect(nextButton).toBeDisabled();
  });
});