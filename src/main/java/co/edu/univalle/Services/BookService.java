package co.edu.univalle.Services;

import co.edu.univalle.Models.BookModel;
import co.edu.univalle.Repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.awt.print.Book;


@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    public BookModel createBook(BookModel bookModel){
        return bookRepository.save(bookModel);
    }

    public BookModel updateBook(BookModel bookModel){
        return bookRepository.save(bookModel);
    }

    public void deleteBook(Long id){
        bookRepository.deleteById(id);
    }
    public List<BookModel> findAll(){
        return bookRepository.findAll();
    }
    public List<BookModel> findByTitle(String titulo){
        return bookRepository.findByTituloContainingIgnoreCase(titulo);
    }
}
