package de.rechnungsanwendung.backend.modelle;

import java.math.BigDecimal;

public record NeueRechnungAnfrage(
        String rechnungsNummer,
        String kundenName,
        RechnungsStatus status,
        BigDecimal nettoBetrag
) {

}

