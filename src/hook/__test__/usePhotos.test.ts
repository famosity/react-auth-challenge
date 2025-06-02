import { renderHook, act } from "@testing-library/react";
import { usePhotos } from "../usePhotos";
import { getPhotos } from "@/services/photoService";
import { useAuth } from "@/hook/useAuth";
import { usePageParam } from "@/hook/usePageParam";
import { useNavigate } from "react-router";

jest.mock("@/services/photoService");
jest.mock("@/hook/useAuth");
jest.mock("@/hook/usePageParam");
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

const mockPhotos = { content: [], total_elements: 0, total_pages: 0 };

describe("usePhotos", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ token: "fake-token" });
    (usePageParam as jest.Mock).mockReturnValue({ page: 1 });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    jest.clearAllMocks();
  });

  it("carga fotos correctamente", async () => {
    (getPhotos as jest.Mock).mockResolvedValue(mockPhotos);

    const { result } = renderHook(() => usePhotos());

    await act(async () => {
      await new Promise((res) => setTimeout(res, 0));
    });

    expect(result.current.photos).toEqual(mockPhotos);
    expect(result.current.loading).toBe(true);
  });

  it("navega a /errorPhotos si hay error", async () => {
    const mockNavigate = jest.fn();
    (getPhotos as jest.Mock).mockRejectedValue(new Error("fail"));
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const { result } = renderHook(() => usePhotos());

    await act(async () => {
      await new Promise((res) => setTimeout(res, 0));
    });

    expect(mockNavigate).toHaveBeenCalledWith("/errorPhotos");
    expect(result.current.photos).toBeNull();
    expect(result.current.loading).toBe(true);
  });
});