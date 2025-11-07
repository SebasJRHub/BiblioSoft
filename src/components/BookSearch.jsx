import React, { useState } from "react";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const response = await fetch(`http://localhost:8080/api/books/search?query=${query}`);
      if (!response.ok) throw new Error("Error al buscar libros");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al buscar los libros.");
    }
  };

  return (
    <div style={{ margin: "2rem auto", maxWidth: "600px", textAlign: "center" }}>
      <h2>Buscador de Libros</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por autor, título o editorial..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", width: "70%", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ marginLeft: "8px", padding: "8px 16px" }}>
          Buscar
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
        {books.length > 0 ? (
          books.map((book) => (
            <li
              key={book.id}
              style={{
                marginBottom: "12px",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              <strong>{book.titulo}</strong> — {book.autor} ({book.editorial})
            </li>
          ))
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </ul>
    </div>
  );
}

export default BookSearch;
