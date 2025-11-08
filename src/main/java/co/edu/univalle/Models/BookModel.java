package co.edu.univalle.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class BookModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bk-id", nullable = false)
    private Long id;

    @Column(name = "bk-titulo", length = 50, nullable = false)
    private String titulo;

    @Column(name = "bk-autor", length = 70, nullable = false)
    private String autor;

    @Column(name = "bk-editorial", length = 70, nullable = false)
    private String editorial;

    @Column(name = "bk-estado", length = 30, nullable = false)
    private String estado;

    @Column(name = "bk-anio", nullable = false)
    private int anio;
}
