import { getBooksByCategory, getBookDetails } from "./api.js";
import {
  renderBooks,
  showDescription,
  showLoadingDescription,
  showError,
} from "./ui.js";

const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});
button.addEventListener("click", async () => {
  const category = input.value;

  resultsDiv.innerHTML = "<p>Caricamento...</p>";

  try {
    const books = await getBooksByCategory(category);
    renderBooks(books, resultsDiv, async (book, bookElement) => {
      try {
        showLoadingDescription(bookElement);

        const description = await getBookDetails(book.key);

        showDescription(bookElement, description);
      } catch (error) {
        showError(bookElement, "Errore nel caricamento della descrizione");
      }
    });
  } catch (error) {
    resultsDiv.innerHTML = "<p>Errore nel caricamento dei libri. Riprova</p>";
  }
});
