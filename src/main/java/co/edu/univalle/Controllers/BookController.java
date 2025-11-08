package co.edu.univalle.Controllers;

import co.edu.univalle.Models.BookModel;
import co.edu.univalle.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Permite acceso desde tu frontend local
@RestController
@RequestMapping(path = "/api/book")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // 🔹 Obtener todos los libros
    @GetMapping(path = "/allBooks")
    public List<BookModel> findAllBooks() {
        return bookService.findAll();
    }

    // 🔹 Buscar libros por título parcial
    @GetMapping(path = "/allByTitle")
    public List<BookModel> findByTitle(@RequestParam(name = "titulo") String titulo) {
        return bookService.findByTitle(titulo);
    }

    // 🔹 Guardar un nuevo libro
    @PostMapping(path = "/save")
    public BookModel createBook(@RequestBody BookModel bookModel) {
        return bookService.createBook(bookModel);
    }

    // 🔹 Editar un libro existente
    @PutMapping(path = "/edit")
    public BookModel editBook(@RequestBody BookModel bookModel) {
        return bookService.updateBook(bookModel);
    }

    // 🔹 Eliminar un libro por ID
    @DeleteMapping(path = "/deleteBook/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok("Libro eliminado correctamente");
    }

    // 🔹 Buscar por título, autor o editorial
    @GetMapping("/search")
    public List<BookModel> buscarLibros(@RequestParam(required = false) String query) {
        return bookService.searchBooks(query);
    }
}
