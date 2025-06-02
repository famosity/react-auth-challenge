import { render, screen, fireEvent } from "@testing-library/react";
import ErrorPhoto from "../ErrorPhoto";
import { useNavigate } from "react-router";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));

describe("ErrorPhoto", () => {
  it("renderiza el mensaje de error y el botón", () => {
    render(<ErrorPhoto />);
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong!.")).toBeInTheDocument();
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
  });

  it("redirige al home al hacer click en el botón", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<ErrorPhoto />);
    fireEvent.click(screen.getByText("Back to Home"));
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });
});