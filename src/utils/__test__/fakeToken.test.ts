import { generateFakeToken } from "../fakeToken";

describe("generateFakeToken", () => {
  it("genera un token que empieza con 'fake-'", () => {
    const token = generateFakeToken();
    expect(token.startsWith("fake-")).toBe(true);
  });

  it("genera tokens únicos en cada llamada", () => {
    const token1 = generateFakeToken();
    const token2 = generateFakeToken();
    expect(token1).not.toBe(token2);
  });
});