package co.edu.univalle.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.repository.support.Repositories;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Books")
public class BookModel  {

    @Id
    @Column(name = "bk-id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "bk-titulo" ,length = 50, nullable = false)
    private String titulo;
    @Column(name = "bk-editorial",length = 70, nullable = false)
    private String editorial;
    @Column(name = "bk-estado" ,length = 30, nullable = false)
    private String estado;
}
