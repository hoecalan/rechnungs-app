import { useState } from "react";
import type {RechnungsStatus} from "../typen/Rechnung";

type NeueRechnungDaten = {
    rechnungsNummer: string;
    kundenName: string;
    status: RechnungsStatus;
    nettoBetrag: number;
};

type RechnungsFormularEigenschaften = {
    beiRechnungAnlegen: (daten: NeueRechnungDaten) => void;
};

function RechnungsFormular({
    beiRechnungAnlegen,
}: RechnungsFormularEigenschaften)