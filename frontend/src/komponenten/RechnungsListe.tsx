import type { Rechnung } from "../typen/Rechnung";

type RechnungsListeEigenschaften = {
    rechnungen: Rechnung[];
};

function RechnungsListe({rechnungen}: RechnungsListeEigenschaften) {
    return (
        <section>
            <h2>Rechnungen</h2>

            {rechnungen.length === 0 ? ( 
            <p>Keine Rechnungen vorhanden.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Rechnungsnummer</th>
                            <th>Kunde</th>
                            <th>Status</th>
                            <th>Netto</th>
                            <th>Steuer</th>
                            <th>Brutto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rechnungen.map((rechnung) => (
                            <tr key={rechnung.id}>
                                <td>{rechnung.id}</td>
                                <td>{rechnung.rechnungsNummer}</td>
                                <td>{rechnung.kundenName}</td>
                                <td>{rechnung.status}</td>
                                <td>{rechnung.nettoBetrag.toFixed(2)} €</td>
                                <td>{rechnung.steuerBetrag.toFixed(2)} €</td>
                                <td>{rechnung.bruttoBetrag.toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
        </section>
    );
}

export default RechnungsListe;