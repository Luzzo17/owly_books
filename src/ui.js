export function renderBooks(books, container, onBookClick) {
  container.innerHTML = "";

  books.forEach((book) => {
    const bookElement = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = book.title;

    const authors = document.createElement("p");
    authors.textContent = book.authors.map((author) => author.name).join(", ");

    title.addEventListener("click", () => {
      onBookClick(book, bookElement);
    });

    bookElement.appendChild(title);
    bookElement.appendChild(authors);

    container.appendChild(bookElement);
  });
}

export function showDescription(container, description) {
  let desc = container.querySelector(".description");

  if (!desc) {
    desc = document.createElement("p");
    desc.classList.add("description");
    container.appendChild(desc);
  }

  if (typeof description === "object") {
    desc.textContent = description.value;
  } else {
    desc.textContent = description || "Nessuna descrizione disponibile.";
  }
}

export function showLoadingDescription(container) {
  let desc = container.querySelector(".description");

  if (!desc) {
    desc = document.createElement("p");
    desc.classList.add("description");
    container.appendChild(desc);
  }

  desc.textContent = "Caricamento descrizione...";
}

export function showError(container, message) {
  let desc = container.querySelector(".description");

  if (!desc) {
    desc = document.createElement("p");
    desc.classList.add("description");
    container.appendChild(desc);
  }

  desc.textContent = message;
}
