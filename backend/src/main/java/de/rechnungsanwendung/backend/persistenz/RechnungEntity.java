package de.rechnungsanwendung.backend.persistenz;

import java.math.BigDecimal;

import de.rechnungsanwendung.backend.modelle.RechnungsStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "rechnungen", uniqueConstraints = {
        @UniqueConstraint(name = "uk_rechnungs_nummer", columnNames = "rechnungs_nummer")
})
public class RechnungEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rechnungs_nummer", nullable = false, length = 50, unique = true)
    private String rechnungsNummer;

    @Column(name = "kunden_name", nullable = false, length = 100)
    private String kundenName;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private RechnungsStatus status;

    @Column(name = "netto_betrag", nullable = false, precision = 12, scale = 2)
    private BigDecimal nettoBetrag;

    @Column(name = "steuer_betrag", nullable = false, precision = 12, scale = 2)
    private BigDecimal steuerBetrag;

    @Column(name = "brutto_betrag", nullable = false, precision = 12, scale = 2)
    private BigDecimal bruttoBetrag;

    protected RechnungEntity() {

    }

    public RechnungEntity(
            String rechnungsNummer,
            String kundenName,
            RechnungsStatus status,
            BigDecimal nettoBetrag,
            BigDecimal steuerBetrag,
            BigDecimal bruttoBetrag) {
        this.rechnungsNummer = rechnungsNummer;
        this.kundenName = kundenName;
        this.status = status;
        this.nettoBetrag = nettoBetrag;
        this.steuerBetrag = steuerBetrag;
        this.bruttoBetrag = bruttoBetrag;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRechnungsNummer() {
        return rechnungsNummer;
    }

    public void setRechnungsNummer(String rechnungsNummer) {
        this.rechnungsNummer = rechnungsNummer;
    }

    public String getKundenName() {
        return kundenName;
    }

    public void setKundenName(String kundenName) {
        this.kundenName = kundenName;
    }

    public RechnungsStatus getStatus() {
        return status;
    }

    public void setStatus(RechnungsStatus status) {
        this.status = status;
    }

    public BigDecimal getNettoBetrag() {
        return nettoBetrag;
    }

    public void setNettoBetrag(BigDecimal nettoBetrag) {
        this.nettoBetrag = nettoBetrag;
    }

    public BigDecimal getSteuerBetrag() {
        return steuerBetrag;
    }

    public void setSteuerBetrag(BigDecimal steuerBetrag) {
        this.steuerBetrag = steuerBetrag;
    }

    public BigDecimal getBruttoBetrag() {
        return bruttoBetrag;
    }

    public void setBruttoBetrag(BigDecimal bruttoBetrag) {
        this.bruttoBetrag = bruttoBetrag;
    }

}
