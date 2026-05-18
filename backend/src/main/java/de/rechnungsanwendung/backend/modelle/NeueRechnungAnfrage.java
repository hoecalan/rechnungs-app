package de.rechnungsanwendung.backend.modelle;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NeueRechnungAnfrage(
        @NotBlank(message = "Die Rechnungsnummer darf nicht leer sein.")
        @Size(max = 50, message = "Die Rechnungsnummer darf maximal 50 Zeichen lang sein.")
        String rechnungsNummer,

        @NotBlank(message = "Der Kundenname darf nicht leer sein.")
        @Size(max = 100, message = "Der Kundenname darf maximal 100 Zeichen lang sein.")
        String kundenName,

        @NotNull(message = "Der Rechnungsstatus muss angegeben werden.")
        RechnungsStatus status,

        @NotNull(message = "Der Netto-Betrag muss angegeben werden.")
        @DecimalMin(value = "0.01", message = "Der Netto-Betrag muss größer als 0 sein.")
        BigDecimal nettoBetrag
) {

}

