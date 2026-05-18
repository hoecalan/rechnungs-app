package de.rechnungsanwendung.backend.fehler;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class GlobaleFehlerBehandlung {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<FehlerAntwort> validierungsFehlerBehnadeln(
            MethodArgumentNotValidException ausnahme) {
        List<FeldFehlerAntwort> feldFehler = ausnahme.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fehler -> new FeldFehlerAntwort(
                        fehler.getField(), fehler.getDefaultMessage()))
                .toList();

        FehlerAntwort antwort = new FehlerAntwort("Die Anfrage enthält ungültige Daten.", feldFehler);

        return ResponseEntity.badRequest().body(antwort);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<FehlerAntwort> statusFehlerBehandeln(
            ResponseStatusException ausnahme) {
        String meldung = ausnahme.getReason() != null
                ? ausnahme.getReason()
                : "Die Anfrage konnte nicht verarbeitet werden.";

        FehlerAntwort antwort = new FehlerAntwort(
                meldung, List.of());

        return ResponseEntity.status(ausnahme.getStatusCode()).body(antwort);
    }

}
