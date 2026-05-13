import type { NeueRechnungDaten, Rechnung } from "../typen/Rechnung";

const API_BASIS_URL = "http://localhost:8080/api/rechnungen";

export async function ladeRechnungen(): Promise<Rechnung[]> {
    const antwort = await fetch(API_BASIS_URL);

    if (!antwort.ok) {
        throw new Error("Rechnungen konnten nicht geladen werden.");
    }

    const rechnungen = (await antwort.json()) as Rechnung[];

    return rechnungen;

}

export async function ladeRechnungNachId(id: number): Promise<Rechnung> {
    const antwort = await fetch(`${API_BASIS_URL}/${id}`);

    if (!antwort.ok) {
        throw new Error("Rechnung mit ID ${id} konnte nicht geladen werden.");
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
        throw new Error("Rechnung konnte nicht angelegt werden.");
    }

    const neueRechnung = (await antwort.json()) as Rechnung;

    return neueRechnung;
}



