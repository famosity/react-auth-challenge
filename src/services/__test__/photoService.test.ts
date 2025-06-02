import { getPhotos } from "../photoService";
import axiosInstance from "../../api/axiosInstance";
import type { Photo } from "../../types";

jest.mock("../../api/axiosInstance");

describe("getPhotos", () => {
  it("llama a axiosInstance.get con la URL correcta y retorna el formato esperado", async () => {
    const mockPhotos: Photo[] = [
      {
        albumId: 1,
        id: 1,
        title: "Foto 1",
        url: "https://test.com/1",
        thumbnailUrl: "https://test.com/thumb/1",
      },
    ];

    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: mockPhotos });

    const result = await getPhotos(2, 10);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "photos?_start=10&_limit=10",
    );
    expect(result).toEqual({
      content: mockPhotos,
      total_elements: 2000,
      total_pages: 100,
    });
  });
});