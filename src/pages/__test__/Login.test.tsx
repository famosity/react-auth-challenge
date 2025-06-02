import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { useAuth } from "../../hook/useAuth";

jest.mock("../../hook/useAuth");

describe("Login", () => {
  it("renderiza los campos y el botón", () => {
    (useAuth as jest.Mock).mockReturnValue({ login: jest.fn() });
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i }),
    ).toBeInTheDocument();
  });

  it("llama a login con los datos correctos", async () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "Password1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@mail.com", "Password1");
    });
  });

  it("muestra mensaje de error si login falla", async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error("fail"));
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "Password1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/error durante el login/i)).toBeInTheDocument();
    });
  });

  it("permite mostrar y ocultar la contraseña", () => {
    (useAuth as jest.Mock).mockReturnValue({ login: jest.fn() });
    render(<Login />);
    const input = screen.getByLabelText(/contraseña/i);
    const toggleBtn = screen.getByRole("button", {
      name: /mostrar contraseña/i,
    });
    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "text");
  });
});