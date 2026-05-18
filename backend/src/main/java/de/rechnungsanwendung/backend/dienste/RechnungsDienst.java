package de.rechnungsanwendung.backend.dienste;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import de.rechnungsanwendung.backend.modelle.NeueRechnungAnfrage;
import de.rechnungsanwendung.backend.modelle.RechnungAntwort;
import de.rechnungsanwendung.backend.modelle.RechnungsStatus;

@Service
public class RechnungsDienst {

    private final List<RechnungAntwort> rechnungen  = new ArrayList<>(List.of(
            new RechnungAntwort(
                    1L,
                    "RE-2026-0001",
                    "Muster GmbH",
                    RechnungsStatus.OFFEN,
                    new BigDecimal("1000.00"),
                    new BigDecimal("190.00"),
                    new BigDecimal("1190.00")),
            new RechnungAntwort(
                    2L,
                    "RE-2026-0002",
                    "Beispiel AG",
                    RechnungsStatus.BEZAHLT,
                    new BigDecimal("500.00"),
                    new BigDecimal("95.00"),
                    new BigDecimal("595.00")),
            new RechnungAntwort(3L,
                    "RE-2026-0003",
                    "Test Solutions",
                    RechnungsStatus.STORNIERT,
                    new BigDecimal("300.00"),
                    new BigDecimal("57.00"),
                    new BigDecimal("357.00")),
            new RechnungAntwort(4L,
                    "RE-2026-0004",
                    "Muster GmbH",
                    RechnungsStatus.OFFEN,
                    new BigDecimal("750.00"),
                    new BigDecimal("142.50"),
                    new BigDecimal("892.50"))));

    public List<RechnungAntwort> alleRechnungenLaden() {
        return rechnungen ;
    }

    public Optional<RechnungAntwort> rechnungNachIdFinden(Long id) {
        return rechnungen .stream()
                .filter(rechnung -> rechnung.id().equals(id))
                .findFirst();
    }

    public RechnungAntwort rechnungAnlegen(NeueRechnungAnfrage anfrage) {
        Long neueID = naechsteIdBerechnen();
        BigDecimal nettoBetrag = anfrage.nettoBetrag().setScale(2, RoundingMode.HALF_UP);
        BigDecimal steuerBetrag = nettoBetrag
                .multiply(new BigDecimal("0.19"))
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal bruttoBetrag = nettoBetrag
                .add(steuerBetrag)
                .setScale(2, RoundingMode.HALF_UP);

        String rechnungsNummer = anfrage.rechnungsNummer().trim();
        String kundenName = anfrage.kundenName().trim();
        
        if(rechnungsNummerBereitsVorhanden(rechnungsNummer)){
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Die Rechnungsnummer ist bereits vorhanden."
                );
        }

        RechnungAntwort neueRechnung = new RechnungAntwort(
                neueID,
                rechnungsNummer,
                kundenName,
                anfrage.status(),
                nettoBetrag,
                steuerBetrag,
                bruttoBetrag
        );
        rechnungen.add(0, neueRechnung);
        
        return neueRechnung;
    }

    private boolean rechnungsNummerBereitsVorhanden(String rechnungsNummer){
        return rechnungen.stream()
                .anyMatch(rechnung ->
                        rechnung.rechnungsNummer().equalsIgnoreCase(rechnungsNummer)       
                );
    }

    private Long naechsteIdBerechnen(){
        return rechnungen.stream()
                .map(RechnungAntwort::id)
                .max(Long::compareTo)
                .orElse(0L) + 1;
    }

}
