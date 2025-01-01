export default function MaterialDetails({ material }) {
  return (
    <div>
      <h2>{material.name}</h2>
      <p>
        Menge: {material.menge} {material.einheit}
      </p>
      <p>Preis: {material.preis} €</p>
      <p>Beschreibung: {material.beschreibung}</p>
    </div>
  );
}
