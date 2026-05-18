export type FeldFehlerAntwort = {
    feld: string;
    meldung: string;
};

export type FehlerAntwort = {
    meldung: string;
    feldFehler: FeldFehlerAntwort[];
};