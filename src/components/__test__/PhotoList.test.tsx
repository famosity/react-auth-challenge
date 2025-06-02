import { render, screen } from "@testing-library/react";
import PhotoList from "../PhotoList";
import type { Photo } from "../../types";

jest.mock("../PhotoCard", () => ({ photo }: { photo: Photo }) => (
  <div data-testid="photo-card">{photo.title}</div>
));

describe("PhotoList", () => {
  const items: Photo[] = [
    { albumId: 1, id: 1, title: "Foto 1", url: "url1", thumbnailUrl: "thumb1" },
    { albumId: 1, id: 2, title: "Foto 2", url: "url2", thumbnailUrl: "thumb2" },
  ];

  it("renderiza un PhotoCard por cada item", () => {
    render(<PhotoList items={items} />);
    const cards = screen.getAllByTestId("photo-card");
    expect(cards).toHaveLength(items.length);
    expect(cards[0]).toHaveTextContent("Foto 1");
    expect(cards[1]).toHaveTextContent("Foto 2");
  });

  it("no renderiza PhotoCard si items está vacío", () => {
    render(<PhotoList items={[]} />);
    expect(screen.queryByTestId("photo-card")).toBeNull();
  });
});