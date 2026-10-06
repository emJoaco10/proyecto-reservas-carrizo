package com.example.demo.service;

import com.example.demo.model.Reserva;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@ConditionalOnProperty(
        prefix = "spring.mail",
        name = "host"
)
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String emailRemitente;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarConfirmacionReserva(Reserva reserva) {

        String emailDestino = reserva.getUsuario().getEmail();

        String asunto = "Confirmación de reserva - Reservas Carrizo";

        String cuerpo = """
                Hola %s %s,
                
                Tu reserva fue realizada correctamente.
                
                Detalles de la reserva:
                
                Producto: %s
                Fecha de ingreso: %s
                Fecha de salida: %s
                Cantidad de huéspedes: %s
                
                Gracias por elegir Reservas Carrizo.
                
                Saludos,
                Reservas Carrizo
                """.formatted(
                reserva.getUsuario().getNombre(),
                reserva.getUsuario().getApellido(),
                reserva.getProducto().getNombre(),
                reserva.getFechaInicio(),
                reserva.getFechaFin(),
                reserva.getCantidadHuespedes()
        );

        SimpleMailMessage mensaje = new SimpleMailMessage();

        mensaje.setFrom(emailRemitente);
        mensaje.setTo(emailDestino);
        mensaje.setSubject(asunto);
        mensaje.setText(cuerpo);

        mailSender.send(mensaje);
    }
}