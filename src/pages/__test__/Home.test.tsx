import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { usePhotos } from "@/hook/usePhotos";

jest.mock("@/components/Navbar", () => () => <nav>Navbar</nav>);
jest.mock("@/components/PhotoList", () => ({ items }: any) => (
  <div data-testid="photo-list">{items.length} fotos</div>
));
jest.mock("@/components/Pagination", () => ({ totalPages }: any) => (
  <div data-testid="pagination">{totalPages} páginas</div>
));

jest.mock("@/hook/usePhotos");

describe("Home", () => {
  it("muestra el loader cuando loading es true", () => {
    (usePhotos as jest.Mock).mockReturnValue({ photos: null, loading: true });
    render(<Home />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByTestId("photo-list")).not.toBeInTheDocument();
  });

  it("muestra la lista y paginación cuando loading es false", () => {
    (usePhotos as jest.Mock).mockReturnValue({
      photos: { content: [{ id: 1 }], total_pages: 5 },
      loading: false,
    });
    render(<Home />);
    expect(screen.getByTestId("photo-list")).toHaveTextContent("1 fotos");
    expect(screen.getByTestId("pagination")).toHaveTextContent("5 páginas");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});