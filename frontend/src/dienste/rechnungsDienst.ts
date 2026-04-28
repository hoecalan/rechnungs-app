import type { Rechnung } from "../typen/Rechnung";

const beispielRechnungen: Rechnung[] = [
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
    ];

    function warte(millisekunden: number) {
        return new Promise<void>((aufloesen) => {
            setTimeout(aufloesen, millisekunden);
        });
    }

    export async function ladeRechnungen(): Promise<Rechnung[]> {
        await warte(400);
        return [...beispielRechnungen];
        
    }