package de.rechnungsanwendung.backend.fehler;

public record FeldFehlerAntwort(
        String feld,
        String meldung
) {
}