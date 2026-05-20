package de.rechnungsanwendung.backend.dienste;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import de.rechnungsanwendung.backend.modelle.NeueRechnungAnfrage;
import de.rechnungsanwendung.backend.modelle.RechnungAntwort;
import de.rechnungsanwendung.backend.persistenz.RechnungEntity;
import de.rechnungsanwendung.backend.persistenz.RechnungsRepository;

@Service
public class RechnungsDienst {

        private final RechnungsRepository rechnungsRepository;

        public RechnungsDienst(RechnungsRepository rechnungsRepository) {
                this.rechnungsRepository = rechnungsRepository;
        }

        public List<RechnungAntwort> alleRechnungenLaden() {
                return rechnungsRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))
                                .stream()
                                .map(this::zuAntwort)
                                .toList();
        }

        public Optional<RechnungAntwort> rechnungNachIdFinden(Long id) {
                return rechnungsRepository.findById(id)
                                .map(this::zuAntwort);
        }

        public RechnungAntwort rechnungAnlegen(NeueRechnungAnfrage anfrage) {
                String rechnungsNummer = anfrage.rechnungsNummer().trim();
                String kundenName = anfrage.kundenName().trim();

                if (rechnungsRepository.existsByRechnungsNummerIgnoreCase(rechnungsNummer)) {
                        throw new ResponseStatusException(
                                        HttpStatus.CONFLICT,
                                        "Die Rechnungsnummer ist bereits vorhanden.");
                }

                BigDecimal nettoBetrag = anfrage.nettoBetrag()
                                .setScale(2, RoundingMode.HALF_UP);

                BigDecimal steuerBetrag = nettoBetrag
                                .multiply(new BigDecimal("0.19"))
                                .setScale(2, RoundingMode.HALF_UP);

                BigDecimal bruttoBetrag = nettoBetrag
                                .add(steuerBetrag)
                                .setScale(2, RoundingMode.HALF_UP);

                RechnungEntity neueRechnung = new RechnungEntity(
                                rechnungsNummer,
                                kundenName,
                                anfrage.status(),
                                nettoBetrag,
                                steuerBetrag,
                                bruttoBetrag);
                RechnungEntity gespeicherteRechnung = rechnungsRepository.save(neueRechnung);

                return zuAntwort(gespeicherteRechnung);
        }

        private RechnungAntwort zuAntwort(RechnungEntity rechnung) {
                return new RechnungAntwort(
                                rechnung.getId(),
                                rechnung.getRechnungsNummer(),
                                rechnung.getKundenName(),
                                rechnung.getStatus(),
                                rechnung.getNettoBetrag(),
                                rechnung.getSteuerBetrag(),
                                rechnung.getBruttoBetrag());
        }

}
