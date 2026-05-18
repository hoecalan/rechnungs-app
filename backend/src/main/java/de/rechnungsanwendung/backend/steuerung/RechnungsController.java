package de.rechnungsanwendung.backend.steuerung;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.rechnungsanwendung.backend.dienste.RechnungsDienst;
import de.rechnungsanwendung.backend.modelle.NeueRechnungAnfrage;
import de.rechnungsanwendung.backend.modelle.RechnungAntwort;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/rechnungen")
@CrossOrigin(origins = "http://localhost:5173")
public class RechnungsController {

    private final RechnungsDienst rechnungsDienst;

    public RechnungsController(RechnungsDienst rechnungsDienst) {
        this.rechnungsDienst = rechnungsDienst;
    }

    @GetMapping
    public List<RechnungAntwort> alleRechnungenLaden() {
        return rechnungsDienst.alleRechnungenLaden();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RechnungAntwort> rechnungNachIdLaden(@PathVariable Long id) {
        return rechnungsDienst.rechnungNachIdFinden(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RechnungAntwort> rechnungAnlegen(@Valid @RequestBody NeueRechnungAnfrage anfrage) {
        RechnungAntwort neueRechnung = rechnungsDienst.rechnungAnlegen(anfrage);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(neueRechnung);
    }

}
