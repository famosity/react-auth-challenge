import { render, screen, fireEvent } from "@testing-library/react";
import { SessionExpiredModal } from "../SessionExpiredModal";

describe("SessionExpiredModal", () => {
  it("muestra el modal con los textos correctos cuando open es true", () => {
    render(<SessionExpiredModal open={true} onClose={jest.fn()} />);
    expect(screen.getByText("Sesión Expirada")).toBeInTheDocument();
    expect(
      screen.getByText(/Tu sesión ha expirado por seguridad/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
  });

  it("llama a onClose al hacer click en Iniciar Sesión", () => {
    const onClose = jest.fn();
    render(<SessionExpiredModal open={true} onClose={onClose} />);
    fireEvent.click(screen.getByText("Iniciar Sesión"));
    expect(onClose).toHaveBeenCalled();
  });

  it("no muestra el modal si open es false", () => {
    render(<SessionExpiredModal open={false} onClose={jest.fn()} />);
    expect(screen.queryByText("Sesión Expirada")).not.toBeInTheDocument();
  });
});