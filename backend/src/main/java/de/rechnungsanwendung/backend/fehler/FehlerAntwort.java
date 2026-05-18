package de.rechnungsanwendung.backend.fehler;

import java.util.List;

public record FehlerAntwort(
        String meldung,
        List<FeldFehlerAntwort> feldFehler
) {
}