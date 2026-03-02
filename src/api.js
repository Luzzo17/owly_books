export async function getBooksByCategory(category) {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${category}.json`,
    );

    if (!response.ok) {
      throw new Error("Errore nel caricamento dei libri");
    }

    const data = await response.json();
    return data.works;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getBookDetails(workKey) {
  try {
    const response = await fetch(`https://openlibrary.org${workKey}.json`);

    if (!response.ok) {
      throw new Error("Errore nel caricamento della descrizione del libro");
    }

    const data = await response.json();
    return data.description;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
