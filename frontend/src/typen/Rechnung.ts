export type RechnungsStatus = "OFFEN" | "BEZAHLT" | "STORNIERT";

export type RechnungsStatusFilter = "ALLE" | RechnungsStatus;

export type Rechnung = {
    id: number;
    rechnungsNummer: string;
    kundenName: string;
    status: RechnungsStatus;
    nettoBetrag: number;
    steuerBetrag: number;
    bruttoBetrag: number;
};

export type NeueRechnungDaten = {
    rechnungsNummer: string;
    kundenName: string;
    status: RechnungsStatus;
    nettoBetrag: number;
};