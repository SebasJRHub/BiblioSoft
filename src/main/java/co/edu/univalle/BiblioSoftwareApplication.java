package co.edu.univalle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BiblioSoftwareApplication {

    public static void main(String[] args) {
        // Cargar .env antes de levantar el contexto de Spring
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("DB_USER", dotenv.get("DB_USER"));
        System.setProperty("DB_KEY", dotenv.get("DB_KEY"));

        System.out.println("✅ Variables .env cargadas antes del contexto Spring");

        SpringApplication.run(BiblioSoftwareApplication.class, args);
    }
}
