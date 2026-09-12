package com.example.demo;

import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Configuration
public class SecurityConfig {

    private final SecretKey secretKey;

    public SecurityConfig() {

        String secret =
                "UmVzZXJ2YXNDYXJyaXpvU2VjcmV0S2V5MjAyNlNlY3VyZVNlY3JldA==";

        byte[] decodedKey =
                Base64.getDecoder().decode(secret);

        this.secretKey = new SecretKeySpec(
                decodedKey,
                "HmacSHA256"
        );
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtEncoder jwtEncoder() {

        return NimbusJwtEncoder
                .withSecretKey(secretKey)
                .algorithm(MacAlgorithm.HS256)
                .build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {

        return NimbusJwtDecoder
                .withSecretKey(secretKey)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtGrantedAuthoritiesConverter authoritiesConverter =
                new JwtGrantedAuthoritiesConverter();

        authoritiesConverter.setAuthoritiesClaimName("rol");
        authoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter converter =
                new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(
                authoritiesConverter
        );

        return converter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                Arrays.asList("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                Arrays.asList(
                        "Authorization",
                        "Content-Type"
                )
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .cors(cors -> {})

                .csrf(csrf -> csrf.disable())

                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // =========================
                        // RUTAS ADMINISTRATIVAS
                        // =========================

                        // Usuarios
                        .requestMatchers(
                                "/api/usuario/*/rol",
                                "/api/usuario"
                        )
                        .hasRole("ADMIN")


                        // Productos administrativos
                        .requestMatchers(
                                "/api/producto/admin"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/producto"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/producto/*"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/producto"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/producto/*"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/producto/*/categoria",
                                "/api/producto/*/caracteristicas"
                        )
                        .hasRole("ADMIN")


                        // Categorías
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/categoria"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/categoria/*"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/categoria/*"
                        )
                        .hasRole("ADMIN")


                        // Características
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/caracteristica"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/caracteristica/*"
                        )
                        .hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/caracteristica/*"
                        )
                        .hasRole("ADMIN")


                        // =========================
                        // RUTAS PÚBLICAS
                        // =========================

                        .requestMatchers("/h2-console/**")
                        .permitAll()

                        .requestMatchers(
                                "/api/usuario/registro",
                                "/api/usuario/login"
                        )
                        .permitAll()


                        // Consultas públicas de productos
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/producto/aleatorios",
                                "/api/producto/buscar",
                                "/api/producto/paginados",
                                "/api/producto/categoria/**",
                                "/api/producto/categoriasFiltro",
                                "/api/producto/categorias",
                                "/api/producto/*"
                        )
                        .permitAll()


                        // Consultas públicas de categorías
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/categoria",
                                "/api/categoria/*"
                        )
                        .permitAll()


                        // Consultas públicas de características
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/caracteristica",
                                "/api/caracteristica/*"
                        )
                        .permitAll()


                        // =========================
                        // RESTO DE ENDPOINTS
                        // =========================

                        .anyRequest()
                        .authenticated()
                )

                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt ->
                                jwt.jwtAuthenticationConverter(
                                        jwtAuthenticationConverter()
                                )
                        )
                )

                .formLogin(form -> form.disable())

                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}

