package co.edu.univalle.Repositories;

import co.edu.univalle.Models.BookModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<BookModel,Long> {


    List<BookModel> findByTituloContainingIgnoreCase(String titulo);

    Optional<BookModel> findById(Long id);
    @Query("""
        SELECT b FROM BookModel b
        WHERE LOWER(b.autor) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(b.titulo) LIKE LOWER(CONCAT('%', :query, '%'))
           OR LOWER(b.editorial) LIKE LOWER(CONCAT('%', :query, '%'))
    """)
    List<BookModel> searchBooks(@Param("query") String query);

}
