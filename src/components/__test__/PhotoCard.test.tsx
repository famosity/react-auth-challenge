import { render, screen, fireEvent } from "@testing-library/react";
import PhotoCard from "../PhotoCard";
import type { Photo } from "../../types";

const photo: Photo = {
  albumId: 1,
  id: 1,
  title: "Foto de prueba",
  url: "https://test.com/foto.jpg",
  thumbnailUrl: "https://test.com/thumb.jpg",
};

describe("PhotoCard", () => {
  it("muestra el loader mientras la imagen está cargando", () => {
    render(<PhotoCard photo={photo} />);
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
    expect(screen.getByText("Foto de prueba")).toBeInTheDocument();
  });

  it("muestra la imagen cuando carga correctamente", () => {
    render(<PhotoCard photo={photo} />);
    const img = screen.getByRole("img", { hidden: true });
    fireEvent.load(img);
    expect(screen.getAllByAltText("Foto de prueba").length).toBeGreaterThan(0);
  });

  it("muestra el mensaje de error si la imagen falla", () => {
    render(<PhotoCard photo={photo} />);
    const img = screen.getByRole("img", { hidden: true });
    fireEvent.error(img);
    expect(screen.getByText("Image not available")).toBeInTheDocument();
  });

  it("renderiza el título correctamente", () => {
    render(<PhotoCard photo={photo} />);
    expect(screen.getByText("Foto de prueba")).toBeInTheDocument();
  });
});