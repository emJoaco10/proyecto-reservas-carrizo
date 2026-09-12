package com.example.demo.service;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class JwtService {

    private final JwtEncoder jwtEncoder;

    public JwtService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public String generarToken(String email, String rol) {

        Instant ahora = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .subject(email)
                .claim("rol", rol)
                .issuedAt(ahora)
                .expiresAt(
                        ahora.plus(2, ChronoUnit.HOURS)
                )
                .build();

        JwtEncoderParameters parameters =
                JwtEncoderParameters.from(
                        JwsHeader
                                .with(MacAlgorithm.HS256)
                                .build(),
                        claims
                );

        return jwtEncoder
                .encode(parameters)
                .getTokenValue();
    }
}
