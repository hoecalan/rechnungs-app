import { useState, type FormEvent } from "react";
import type {
    NeueRechnungDaten,
    RechnungsStatus,
} from "../typen/Rechnung";

type RechnungsFormularEigenschaften = {
    beiRechnungAnlegen: (daten: NeueRechnungDaten) => Promise<void>;
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
    const [formularFehler, setzeFormularFehler] = useState("");
    const [speichert, setzeSpeichert] = useState(false);

    async function formularAbsenden(ereignis: FormEvent<HTMLFormElement>) {
        ereignis.preventDefault();

        const nettoAlsZahl = Number(nettoBetrag);

        if (
            rechnungsNummer.trim() === "" ||
            kundenName.trim() === "" ||
            Number.isNaN(nettoAlsZahl) ||
            nettoAlsZahl <= 0
        ) {
            setzeFormularFehler("Bitte alle Felder guelitg ausfuellen.")
            return;
        }

        try {
            setzeSpeichert(true);
            setzeFormularFehler("");

            await beiRechnungAnlegen({
                rechnungsNummer: rechnungsNummer.trim(),
                kundenName: kundenName.trim(),
                status,
                nettoBetrag: nettoAlsZahl,
            });

            setzeRechnungsNummer("");
            setzeKundenName("");
            setzeStatus("OFFEN");
            setzeNettoBetrag("");
        } catch (fehler) {
            const meldung =
                fehler instanceof Error
                    ? fehler.message
                    : "Die Rechnung konnte nicht angelegt werden.";
            setzeFormularFehler(meldung);
        } finally {
            setzeSpeichert(false);
        }
    }

    const formularDeaktiviert = deaktiviert || speichert;

    return (
        <section className="formularBereich">
            <h2>Neue Rechnung anlegen</h2>

            {formularFehler !== "" && (
                <div className="formularFehler">
                    <p>{formularFehler}</p>
                </div>
            )}

            <form onSubmit={formularAbsenden} className="formular">
                <div className="eingabeGruppe">
                    <label htmlFor="rechnungsNummer">Rechnungsnummer</label>
                    <input
                        id="rechnungsNummer"
                        type="text"
                        value={rechnungsNummer}
                        disabled={formularDeaktiviert}
                        onChange={(ereignis) => setzeRechnungsNummer(ereignis.target.value)}
                    />
                </div>

                <div className="eingabeGruppe">
                    <label htmlFor="kundenName">Kundenname</label>
                    <input
                        id="kundenName"
                        type="text"
                        value={kundenName}
                        disabled={formularDeaktiviert}
                        onChange={(ereignis) => setzeKundenName(ereignis.target.value)}
                    />
                </div>

                <div className="eingabeGruppe">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        disabled={formularDeaktiviert}
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
                        step="0.01"
                        value={nettoBetrag}
                        disabled={formularDeaktiviert}
                        onChange={(ereignis) => setzeNettoBetrag(ereignis.target.value)}
                    />
                </div>

                <button type="submit" disabled={formularDeaktiviert}>
                    {speichert ? "Wird gespeichert..." : "Rechnung anlegen"}
                </button>
            </form>
        </section>

    );
}

export default RechnungsFormular;