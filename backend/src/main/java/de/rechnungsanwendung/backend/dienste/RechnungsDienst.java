package de.rechnungsanwendung.backend.dienste;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import de.rechnungsanwendung.backend.modelle.RechnungAntwort;
import de.rechnungsanwendung.backend.modelle.RechnungsStatus;

@Service
public class RechnungsDienst {

    private final List<RechnungAntwort> beispielRechnungen = List.of(
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
                    new BigDecimal("892.50")));

        public List<RechnungAntwort> alleRechnungenLaden(){
            return beispielRechnungen;
        }

        public Optional<RechnungAntwort> rechnungNachIdFinden(Long id) {
            return beispielRechnungen.stream()
                    .filter(rechnung -> rechnung.id().equals(id))
                    .findFirst();
        }

}
