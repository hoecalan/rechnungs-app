import type { NeueRechnungDaten, Rechnung } from "../typen/Rechnung";
import type { FehlerAntwort} from "../typen/FehlerAntwort";

const API_BASIS_URL = "http://localhost:8080/api/rechnungen";


async function fehlerAusAntwortLesen(antwort: Response): Promise<never> {
    let meldung = "Die Anfrage konnte nicht verarbeitet werden.";

    try {
        const fehlerAntwort = (await antwort.json()) as FehlerAntwort;

        if(fehlerAntwort.feldFehler && fehlerAntwort.feldFehler.length > 0) {
            meldung = fehlerAntwort.feldFehler
                .map((feldFehler) => feldFehler.meldung)
                .join(" ");
        } else if (fehlerAntwort.meldung) {
            meldung = fehlerAntwort.meldung;
        }
    } catch {
        meldung = `Fehlerhafte Antwort vom Backend. Status: ${antwort.status}`;
    }
    
    throw new Error(meldung);
}

export async function ladeRechnungen(): Promise<Rechnung[]> {
    const antwort = await fetch(API_BASIS_URL);

    if (!antwort.ok) {
        await fehlerAusAntwortLesen(antwort);
    }

    const rechnungen = (await antwort.json()) as Rechnung[];

    return rechnungen;

}

export async function ladeRechnungNachId(id: number): Promise<Rechnung> {
    const antwort = await fetch(`${API_BASIS_URL}/${id}`);

    if (!antwort.ok) {
         await fehlerAusAntwortLesen(antwort);
    }

    const rechnung = (await antwort.json()) as Rechnung;

    return rechnung;
}

export async function legeRechnungAn(daten: NeueRechnungDaten): Promise<Rechnung> {

    const antwort = await fetch(API_BASIS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(daten),

    });

    if(!antwort.ok) {
        await fehlerAusAntwortLesen(antwort);
    }

    const neueRechnung = (await antwort.json()) as Rechnung;

    return neueRechnung;
}



