import { useState } from "react";
import type { 
    NeueRechnungDaten, 
    RechnungsStatus, 
} from "../typen/Rechnung";

type RechnungsFormularEigenschaften = {
    beiRechnungAnlegen: (daten: NeueRechnungDaten) => void;
    deaktiviert?: boolean;
};

function RechnungsFormular({
    beiRechnungAnlegen,
    deaktiviert = false,
}: RechnungsFormularEigenschaften) {
    const [rechnungsNummer, setzeRechnungsNummer] = useState("");
    const [kundenName, setzeKundenName] = useState("");
    const [status, setzeStatus] = useState<RechnungsStatus>("OFFEN");
    const [nettoBetrag, setzeNettoBetrag] = useState("");

    function formularAbsenden(ereignis: React.FormEvent<HTMLFormElement>) {
        ereignis.preventDefault();

        const nettoAlsZahl = Number(nettoBetrag);

        if (
            rechnungsNummer.trim() === "" ||
            kundenName.trim() === "" ||
            Number.isNaN(nettoAlsZahl) ||
            nettoAlsZahl <= 0
        ) {
            alert("Bitte alle Felder guelitg ausfuellen.")
            return;
        }

        beiRechnungAnlegen({
            rechnungsNummer: rechnungsNummer.trim(),
            kundenName: kundenName.trim(),
            status,
            nettoBetrag: nettoAlsZahl,
        });

        setzeRechnungsNummer("");
        setzeKundenName("");
        setzeStatus("OFFEN");
        setzeNettoBetrag("");
    }

    return (
        <section>
            <h2>Neue Rechnung anlegen</h2>

            <form onSubmit={formularAbsenden} className="formular">
                <div className="eingabeGruppe">
                    <label htmlFor="rechnungsNummer">Rechnungsnummer</label>
                    <input
                        id="rechnungsNummer"
                        type="text"
                        value={rechnungsNummer}
                        disabled={deaktiviert}
                        onChange={(ereignis) => setzeRechnungsNummer(ereignis.target.value)}
                    />
                </div>

                <div className="eingabeGruppe">
                    <label htmlFor="kundenName">Kundenname</label>
                    <input
                        id="kundenName"
                        type="text"
                        value={kundenName}
                        disabled={deaktiviert}
                        onChange={(ereignis) => setzeKundenName(ereignis.target.value)}
                    />
                </div>

                <div className="eingabeGruppe">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        disabled={deaktiviert}
                        onChange={(ereignis) => setzeStatus(ereignis.target.value as RechnungsStatus)}
                    >
                        <option value={"OFFEN"}>OFFEN</option>
                        <option value={"BEZAHLT"}>BEZAHLT</option>
                        <option value={"STORNIERT"}>STORNIERT</option>
                    </select>
                </div>

                <div className="eingabeGruppe">
                    <label htmlFor="nettoBetrag">Netto-Betrag</label>
                    <input
                        id="nettoBetrag"
                        type="number"
                        value={nettoBetrag}
                        disabled={deaktiviert}
                        onChange={(ereignis) => setzeNettoBetrag(ereignis.target.value)}
                    />
                </div>

                <button type="submit" disabled={deaktiviert}>Rechnung anlegn</button>
            </form>
        </section>

    );
}

export default RechnungsFormular;