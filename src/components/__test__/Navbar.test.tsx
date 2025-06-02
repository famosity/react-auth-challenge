import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";
import { useAuth } from "../../hook/useAuth";

jest.mock("../../hook/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("Navbar", () => {
  it("renderiza el título y el botón de logout", () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn() });
    render(<Navbar />);
    expect(screen.getByText("Challenge")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("llama a logout al hacer click en el botón", () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalled();
  });
});