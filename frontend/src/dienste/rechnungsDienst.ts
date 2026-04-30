import type { Rechnung } from "../typen/Rechnung";

const API_BASIS_URL = "http://localhost:8081/api/rechnungen";

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



