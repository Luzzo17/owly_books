import { describe, it, expect, vi } from "vitest";
import {
  showDescription,
  showLoadingDescription,
  showError,
  renderBooks,
} from "../ui.js";

describe("showDescription", () => {
  it("crea un elemento con la descrizione nel container", () => {
    const container = document.createElement("div");

    showDescription(container, "Test descrizione");

    const desc = container.querySelector(".description");

    expect(desc).not.toBeNull();
    expect(desc.textContent).toContain("Test descrizione");
  });
});
it("aggiorna la descrizione se esiste già", () => {
  const container = document.createElement("div");

  showDescription(container, "Prima descrizione");
  showDescription(container, "Nuova descrizione");

  const descriptions = container.querySelectorAll(".description");

  expect(descriptions.length).toBe(1);
  expect(descriptions[0].textContent).toBe("Nuova descrizione");
});
it("mostra il testo di caricamento", () => {
  const container = document.createElement("div");

  showLoadingDescription(container);

  const desc = container.querySelector(".description");

  expect(desc).not.toBeNull();
  expect(desc.textContent).toBe("Caricamento descrizione...");
});
it("mostra il messaggio di errore", () => {
  const container = document.createElement("div");

  showError(container, "Errore test");

  const desc = container.querySelector(".description");

  expect(desc).not.toBeNull();
  expect(desc.textContent).toBe("Errore test");
});
it("renderBooks crea un elemento per ogni libro", () => {
  const container = document.createElement("div");

  const mockBooks = [
    {
      title: "Libro 1",
      authors: [{ name: "Autore 1" }],
    },
    {
      title: "Libro 2",
      authors: [{ name: "Autore 2" }],
    },
  ];

  renderBooks(mockBooks, container, () => {});

  const titles = container.querySelectorAll("h3");

  expect(titles.length).toBe(2);
  expect(titles[0].textContent).toBe("Libro 1");
  expect(titles[1].textContent).toBe("Libro 2");
});
it("chiama la callback quando si clicca sul titolo", () => {
  const container = document.createElement("div");

  const mockBooks = [
    {
      title: "Libro 1",
      authors: [{ name: "Autore 1" }],
    },
  ];

  const mockCallback = vi.fn();

  renderBooks(mockBooks, container, mockCallback);

  const title = container.querySelector("h3");

  title.click();

  expect(mockCallback).toHaveBeenCalledTimes(1);
});
