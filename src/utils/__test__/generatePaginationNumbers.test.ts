import { generatePaginationNumbers } from "../generatePaginationNumbers";

describe("generatePaginationNumbers", () => {
  it("devuelve hasta 5 páginas centradas en la actual", () => {
    expect(generatePaginationNumbers(3, 10)).toEqual([1, 2, 3, 4, 5]);
    expect(generatePaginationNumbers(5, 10)).toEqual([3, 4, 5, 6, 7]);
    expect(generatePaginationNumbers(9, 10)).toEqual([6, 7, 8, 9, 10]);
  });

  it("devuelve menos de 5 páginas si totalPages es menor", () => {
    expect(generatePaginationNumbers(1, 3)).toEqual([1, 2, 3]);
    expect(generatePaginationNumbers(2, 4)).toEqual([1, 2, 3, 4]);
  });

  it("no devuelve páginas menores a 1 ni mayores a totalPages", () => {
    expect(generatePaginationNumbers(1, 2)).toEqual([1, 2]);
    expect(generatePaginationNumbers(2, 2)).toEqual([1, 2]);
    expect(generatePaginationNumbers(0, 2)).toEqual([1, 2]);
    expect(generatePaginationNumbers(3, 3)).toEqual([1, 2, 3]);
  });
});