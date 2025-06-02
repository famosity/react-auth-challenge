import { LoginFormSchema } from "../authSchema";

describe("LoginFormSchema", () => {
  it("valida correctamente un email y password válidos", () => {
    const data = { email: "test@mail.com", password: "Password1" };
    expect(() => LoginFormSchema.parse(data)).not.toThrow();
  });

  it("falla si el email está vacío", () => {
    const data = { email: "", password: "Password1" };
    expect(() => LoginFormSchema.parse(data)).toThrow(
      /El email es obligatorio/,
    );
  });

  it("falla si el email es inválido", () => {
    const data = { email: "noesmail", password: "Password1" };
    expect(() => LoginFormSchema.parse(data)).toThrow(/Email inválido/);
  });

  it("falla si la contraseña es muy corta", () => {
    const data = { email: "test@mail.com", password: "Pass1" };
    expect(() => LoginFormSchema.parse(data)).toThrow(/al menos 8 caracteres/);
  });

  it("falla si la contraseña no tiene mayúscula", () => {
    const data = { email: "test@mail.com", password: "password1" };
    expect(() => LoginFormSchema.parse(data)).toThrow(/mayúscula/);
  });

  it("falla si la contraseña no tiene número", () => {
    const data = { email: "test@mail.com", password: "Password" };
    expect(() => LoginFormSchema.parse(data)).toThrow(/número/);
  });
});