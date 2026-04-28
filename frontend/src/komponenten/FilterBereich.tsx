import type { RechnungsStatusFilter } from "../typen/Rechnung";

type FilterBereichEigenschaften = {
    suchText: string;
    statusFilter: RechnungsStatusFilter;
    beiSuchTextAendern: (neuerSuchText: string) => void;
    beiStatusFilterAendern: (neuerStatus: RechnungsStatusFilter) => void;
    deaktiviert?: boolean;
};

function FilterBereich({
    suchText,
    statusFilter,
    beiSuchTextAendern,
    beiStatusFilterAendern,
    deaktiviert = false
}: FilterBereichEigenschaften) {
    return (
        <section className="filterBereich">
            <h2>Filter</h2>

            <div className="filterZeile">
                <div className="eingabeGruppe">
                    <label htmlFor="suchfeld">Suche</label>
                    <input
                        id="suchfeld"
                        type="text"
                        placeholder="Nach Rechnungsnummer oder Kunde suchen"
                        value={suchText}
                        disabled={deaktiviert}
                        onChange={(ereignis) => beiSuchTextAendern(ereignis.target.value)}
                    />
                </div>

                <div className="eingabeGruppe">
                    <label htmlFor="statusFilter">Status</label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        disabled={deaktiviert}
                        onChange={(ereignis) =>
                            beiStatusFilterAendern(ereignis.target.value as RechnungsStatusFilter)
                        }
                    >
                        <option value="ALLE">ALLE</option>
                        <option value="OFFEN">OFFEN</option>
                        <option value="BEZAHLT">BEZAHLT</option>
                        <option value="STORNIERT">STORNIERT</option>
                    </select>
                </div>
            </div>
        </section>
    );
}

export default FilterBereich;