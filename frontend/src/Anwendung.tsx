import { useState } from "react";
import Kopfbereich from "./komponenten/KopfBereich";
import RechnungsFormular from "./komponenten/RechnungsFormular";
import RechnungsListe from "./komponenten/RechnungsListe";
import type { Rechnung, RechnungsStatus } from "./typen/Rechnung";

type StatusFilter = "ALLE" | RechnungsStatus;

type NeueRechnungDaten = {
    rechnungsNummer: string;
    kundenName: string;
    status: RechnungsStatus;
    nettoBetrag: number;
};

function Anwendung() {
    const [rechnungen, setzeRechnungen] = useState<Rechnung[]> ([
        {
            id: 1,
            rechnungsNummer: "RE-2026-0001",
            kundenName: "Muster GmbH",
            status: "OFFEN",
            nettoBetrag: 1000,
            steuerBetrag: 190,
            bruttoBetrag: 1190,
        },
        {
            id: 2,
            rechnungsNummer: "RE-2026-0002",
            kundenName: "Beispiel AG",
            status: "BEZAHLT",
            nettoBetrag: 500,
            steuerBetrag: 95,
            bruttoBetrag: 595,
        },
        {
            id: 3,
            rechnungsNummer: "RE-2026-0003",
            kundenName: "Test Solutions",
            status: "STORNIERT",
            nettoBetrag: 300,
            steuerBetrag: 57,
            bruttoBetrag: 357,
        },
        {
            id: 4,
            rechnungsNummer: "RE-2026-0004",
            kundenName: "Muster GmbH",
            status: "OFFEN",
            nettoBetrag: 750,
            steuerBetrag: 142.5,
            bruttoBetrag: 892.5,
        },
    ]);

    const [suchText, setzeSuchText] = useState("");
    const [statusFilter, setzeStatusFilter] = useState<StatusFilter>("ALLE");

    function rechnungAnlegen(daten: NeueRechnungDaten) {
        const neueId = 
        rechnungen.length > 0 
        ? Math.max(...rechnungen.map((rechnung) => rechnung.id)) +1
        : 1;

        const steuerBetrag = Number((daten.nettoBetrag * 0.19).toFixed(2));
        const bruttoBetrag = Number((daten.nettoBetrag + steuerBetrag).toFixed(2));

        const neueRechnung: Rechnung = {
            id: neueId,
            rechnungsNummer: daten.rechnungsNummer,
            kundenName: daten.kundenName,
            status: daten.status,
            nettoBetrag: daten.nettoBetrag,
            steuerBetrag,
            bruttoBetrag,
        };

        setzeRechnungen((vorherigeRechnungen) => [
            neueRechnung,
            ...vorherigeRechnungen,
        ])
    }

    const gefilterteRechnungen = rechnungen.filter((rechnung) => {
        const suchTextKlein = suchText.toLowerCase();

        const passtZumSuchText = 
            rechnung.rechnungsNummer.toLowerCase().includes(suchTextKlein) ||
            rechnung.kundenName.toLocaleLowerCase().includes(suchTextKlein);

        const passtZumStatus = 
            statusFilter === "ALLE" || rechnung.status === statusFilter;
            
        return passtZumSuchText && passtZumStatus;    

    });

    return (
        <main>
            <Kopfbereich titel="Rechnungs-Anwendung" />

            <RechnungsFormular beiRechnungAnlegen={rechnungAnlegen}/>

            <section className="filterBereich">
                <h2>Filter</h2>

                <div className="filterZeile">
                    <div className="eingabeGruppe">
                        <label htmlFor="suchfeld">Suche</label>
                        <input 
                            id="suchfeld"
                            type="text"
                            placeholder="Nach Rechnungsnummer oder Kunde suchen"
                            value={suchText}
                            onChange={(ereignis) => setzeSuchText(ereignis.target.value)}
                        />
                    </div>

                    <div className="eingabeGruppe">
                        <label htmlFor="statusFilter">Status</label>
                        <select
                            id="statusFilter"
                            value={statusFilter}
                            onChange={(ereignis) => 
                                setzeStatusFilter(ereignis.target.value as StatusFilter)
                            }
                        >
                            <option value="ALLE">ALLE</option>
                            <option value="OFFEN">OFFEN</option>
                            <option value="BEZAHLT">BEZAHLT</option>
                            <option value="STORNIERT">STORNIERT</option>
                        </select>
                    </div>
                </div>

            </section>


            <RechnungsListe rechnungen={gefilterteRechnungen} />
        </main>
    );

}

export default Anwendung;