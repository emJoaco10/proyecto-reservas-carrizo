package com.example.demo;

import com.example.demo.model.Categoria;
import com.example.demo.repository.CategoriaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
    CommandLineRunner initCategorias(CategoriaRepository categoriaRepository) {
		return args -> {
			if (categoriaRepository.count() == 0) {
				categoriaRepository.save(new Categoria("Casa"));
				categoriaRepository.save(new Categoria("Departamento"));
				categoriaRepository.save(new Categoria("Hotel"));
			}
		};
	}
}
