package de.rechnungsanwendung.backend.modelle;

import java.math.BigDecimal;

public record RechnungAntwort(
        Long id,
        String rechnungsNummer,
        String kundenName,
        RechnungsStatus status,
        BigDecimal nettoBetrag,
        BigDecimal steuerBetrag,
        BigDecimal bruttoBetrag) {
}