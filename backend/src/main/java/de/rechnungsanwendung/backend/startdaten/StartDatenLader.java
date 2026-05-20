package de.rechnungsanwendung.backend.startdaten;

import de.rechnungsanwendung.backend.modelle.RechnungsStatus;
import de.rechnungsanwendung.backend.persistenz.RechnungEntity;
import de.rechnungsanwendung.backend.persistenz.RechnungsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class StartDatenLader implements CommandLineRunner {

    private final RechnungsRepository rechnungsRepository;

    public StartDatenLader(RechnungsRepository rechnungsRepository) {
        this.rechnungsRepository = rechnungsRepository;
    }

    @Override
    public void run(String... args) {
        if (rechnungsRepository.count() > 0) {
            return;
        }

        rechnungsRepository.saveAll(List.of(
                new RechnungEntity(
                        "RE-2026-0001",
                        "Muster GmbH",
                        RechnungsStatus.OFFEN,
                        new BigDecimal("1000.00"),
                        new BigDecimal("190.00"),
                        new BigDecimal("1190.00")
                ),
                new RechnungEntity(
                        "RE-2026-0002",
                        "Beispiel AG",
                        RechnungsStatus.BEZAHLT,
                        new BigDecimal("500.00"),
                        new BigDecimal("95.00"),
                        new BigDecimal("595.00")
                ),
                new RechnungEntity(
                        "RE-2026-0003",
                        "Test Solutions",
                        RechnungsStatus.STORNIERT,
                        new BigDecimal("300.00"),
                        new BigDecimal("57.00"),
                        new BigDecimal("357.00")
                ),
                new RechnungEntity(
                        "RE-2026-0004",
                        "Muster GmbH",
                        RechnungsStatus.OFFEN,
                        new BigDecimal("750.00"),
                        new BigDecimal("142.50"),
                        new BigDecimal("892.50")
                )
        ));
    }
}