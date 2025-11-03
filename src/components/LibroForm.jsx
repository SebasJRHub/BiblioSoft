import { useState } from "react";
import React from "react";
import LibroService from "../services/LibroService";

function LibroForm() {
  const [book, setBook] = useState({
    titulo: "",
    autor: "",
    anio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    console.log("Enviando libro:", book); // 👈 Verifica en consola
    LibroService.saveBook(book)
      .then((res) => console.log("Guardado correctamente", res.data))
      .catch((err) => console.error("Error al guardar:", err));
  };

  return (
    <div>
      <input name="titulo" value={book.titulo} onChange={handleChange} placeholder="Título" />
      <input name="autor" value={book.autor} onChange={handleChange} placeholder="Autor" />
      <input name="anio" value={book.anio} onChange={handleChange} placeholder="Año" />
      <button onClick={saveBook}>Guardar</button>
    </div>
  );
}

export default LibroForm;
