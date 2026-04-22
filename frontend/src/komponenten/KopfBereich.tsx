type KopfbereichEigenschaften = {
    titel: string;
};

function Kopfbereich({titel}: KopfbereichEigenschaften){
    return (
        <header>
            <h1>{titel}</h1>
            <p>Verwaltung von Rechnungen in der Benutzeroberfläche</p>
        </header>
    );
}

export default Kopfbereich;