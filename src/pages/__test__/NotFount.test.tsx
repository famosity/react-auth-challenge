import { render, screen, fireEvent } from "@testing-library/react";
import ErrorPage from "../NotFount";
import { useNavigate } from "react-router";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("ErrorPage (NotFount)", () => {
  it("renderiza el mensaje 404 y el botón", () => {
    render(<ErrorPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("NOT FOUNT.")).toBeInTheDocument();
    expect(screen.getByText("Back to Login")).toBeInTheDocument();
  });

  it("redirige al login al hacer click en el botón", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<ErrorPage />);
    fireEvent.click(screen.getByText("Back to Login"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});