package co.edu.univalle.Controllers;

import co.edu.univalle.Models.BookModel;
import co.edu.univalle.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping(path = "/book")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService){
        this.bookService = bookService;
    }
    @GetMapping(path = "/allBooks")
    public List<BookModel> findAllBooks(){
        return bookService.findAll();
    }

    @GetMapping(path = "/allByTitle")
    public List<BookModel> findByTitle(@RequestParam(name = "titulo") String titulo){
        return bookService.findByTitle(titulo);
    }

    @PostMapping(path = "/save")
    public BookModel createBook(@RequestBody BookModel bookModel){
        return bookService.createBook(bookModel);
    }
    @PutMapping(path = "/edit")
    public BookModel editBook(@RequestBody BookModel bookModel){
        return bookService.updateBook(bookModel);
    }
    @DeleteMapping(path = "/deleteBook/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id){
        bookService.deleteBook(id);

        return ResponseEntity.ok("Libro eliminado");
    }
    @GetMapping("/search")
    public List<BookModel> buscarlibros(@RequestParam(required = false) String query) {
        return bookService.searchBooks(query);
    }

}
