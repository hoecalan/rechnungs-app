import { useEffect, useState } from "react";
import FilterBereich from "./komponenten/FilterBereich";
import Kopfbereich from "./komponenten/KopfBereich";
import RechnungsFormular from "./komponenten/RechnungsFormular";
import RechnungsListe from "./komponenten/RechnungsListe";
import { ladeRechnungen, legeRechnungAn } from "./dienste/rechnungsDienst";

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


   async  function rechnungAnlegen(daten: NeueRechnungDaten) {
        try {
            setzeFehlerText("");
            const neueRechnung = await  legeRechnungAn(daten);

            setzeRechnungen((vorherigeRechnungen) => [
                neueRechnung,
                ...vorherigeRechnungen,
            ]);
        } catch (fehler) {
            setzeFehlerText("Die Rechnung konnte nicht angelegt werden");
        }
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