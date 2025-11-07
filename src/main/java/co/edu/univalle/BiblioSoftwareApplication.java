package co.edu.univalle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BiblioSoftwareApplication {

	public static void main(String[] args) {
		SpringApplication.run(BiblioSoftwareApplication.class, args);
	}

}
