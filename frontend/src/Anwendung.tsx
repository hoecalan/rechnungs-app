import { useEffect, useState } from "react";
import FilterBereich from "./komponenten/FilterBereich";
import Kopfbereich from "./komponenten/KopfBereich";
import RechnungsFormular from "./komponenten/RechnungsFormular";
import RechnungsListe from "./komponenten/RechnungsListe";
import { ladeRechnungen } from "./dienste/rechnungsDienst";

import type { 
    NeueRechnungDaten, 
    Rechnung, 
    RechnungsStatusFilter 
} from "./typen/Rechnung";


function Anwendung() {
    const [rechnungen, setzeRechnungen] = useState<Rechnung[]>([]);
    const [suchText, setzeSuchText] = useState("");
    const [statusFilter, setzeStatusFilter] = useState<RechnungsStatusFilter>("ALLE");
    const [laedt, setzeLaedt] = useState(true);
    const [fehlerText, setzeFehlerText] = useState("");

    useEffect(() => {
        async function anfangsDatenLaden() {
            try {
                setzeLaedt(true);
                setzeFehlerText("");

                const geladeneRechnungen = await ladeRechnungen();
                setzeRechnungen(geladeneRechnungen);
            } catch (fehler) {
                setzeFehlerText("Die Rechnungen konnten nicht geladen werden.");
            } finally {
                setzeLaedt(false);
            }
        }
        anfangsDatenLaden();
    }, []);


    function rechnungAnlegen(daten: NeueRechnungDaten) {
        const neueId =
            rechnungen.length > 0
                ? Math.max(...rechnungen.map((rechnung) => rechnung.id)) + 1
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

            <RechnungsFormular 
                beiRechnungAnlegen={rechnungAnlegen} 
                deaktiviert={laedt}
                />
            <FilterBereich
                suchText={suchText}
                statusFilter={statusFilter}
                deaktiviert={laedt}
                beiSuchTextAendern={setzeSuchText}
                beiStatusFilterAendern={setzeStatusFilter}
            />
            {laedt ? (
                <section className="hinweisBereich">
                    <p>Rechnungen werden geladen...</p>
                </section>
            ) : fehlerText !== "" ? (
                <section className="hinweisBereich fehlerBereich">
                    <p>{fehlerText}</p>
                </section>
            ) : (
                <RechnungsListe rechnungen={gefilterteRechnungen} />            
            )}
        </main>
    );
}

export default Anwendung;