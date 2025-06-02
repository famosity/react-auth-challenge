import { renderHook } from "@testing-library/react";
import { usePageParam } from "../usePageParam";
import { useSearchParams } from "react-router";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useSearchParams: jest.fn(),
}));

describe("usePageParam", () => {
  it("devuelve el número de página correcto si el parámetro es válido", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      { get: () => "3" },
      jest.fn(),
    ]);
    const { result } = renderHook(() => usePageParam());
    expect(result.current.page).toBe(3);
  });

  it("devuelve 1 si el parámetro es inválido o menor que 1", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      { get: () => "0" },
      jest.fn(),
    ]);
    let { result } = renderHook(() => usePageParam());
    expect(result.current.page).toBe(1);

    (useSearchParams as jest.Mock).mockReturnValue([
      { get: () => "abc" },
      jest.fn(),
    ]);
    result = renderHook(() => usePageParam()).result;
    expect(result.current.page).toBe(1);

    (useSearchParams as jest.Mock).mockReturnValue([
      { get: () => null },
      jest.fn(),
    ]);
    result = renderHook(() => usePageParam()).result;
    expect(result.current.page).toBe(1);
  });

  it("expone setSearchParams y searchParams", () => {
    const mockSet = jest.fn();
    const mockParams = { get: () => "2" };
    (useSearchParams as jest.Mock).mockReturnValue([mockParams, mockSet]);
    const { result } = renderHook(() => usePageParam());
    expect(result.current.setSearchParams).toBe(mockSet);
    expect(result.current.searchParams).toBe(mockParams);
  });
});