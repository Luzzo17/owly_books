import { describe, it, expect, vi } from "vitest";
import { getBooksByCategory } from "../api.js";
import { getBookDetails } from "../api.js";

describe("getBooksByCategory", () => {
  it("restituisce i libri quando la fetch va a buon fine", async () => {
    const mockData = {
      works: [{ title: "Libro Test" }],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const books = await getBooksByCategory("fantasy");

    expect(books).toEqual(mockData.works);
    expect(fetch).toHaveBeenCalled();
  });
  it("lancia un errore quando la risposta non è ok", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      }),
    );

    await expect(getBooksByCategory("fantasy")).rejects.toThrow(
      "Errore nel caricamento dei libri",
    );

    expect(fetch).toHaveBeenCalled();
  });
});

it("getBookDetails restituisce la descrizione quando la fetch va a buon fine", async () => {
  const mockData = {
    description: "Descrizione di prova",
  };

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    }),
  );

  const result = await getBookDetails("/works/OL123W");

  expect(result).toBe(mockData.description);
  expect(fetch).toHaveBeenCalled();
});
it("getBookDetails lancia un errore quando la risposta non è ok", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: false,
    }),
  );

  await expect(getBookDetails("/works/OL123W")).rejects.toThrow(
    "Errore nel caricamento della descrizione del libro",
  );

  expect(fetch).toHaveBeenCalled();
});
