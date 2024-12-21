import { useEffect, useState } from "react";
import dbConnect from "@lib/dbConnect";
import Material from "../../models/Material";

const MaterialDetail = ({ material }) => {
  if (!material) {
    return <div>Material nicht gefunden!</div>;
  }

  return (
    <div>
      <h1>{material.name}</h1>
      <p>
        <strong>Menge:</strong> {material.menge} {material.einheit}
      </p>
      <p>
        <strong>Preis:</strong> €{material.preis}
      </p>
      <p>
        <strong>Beschreibung:</strong> {material.beschreibung}
      </p>
      <p>
        <strong>Erstellt am:</strong>{" "}
        {new Date(material.erstelltAm).toLocaleDateString()}
      </p>
      <p>
        <strong>Aktualisiert am:</strong>{" "}
        {new Date(material.aktualisiertAm).toLocaleDateString()}
      </p>
    </div>
  );
};

// getServerSideProps ermöglicht es uns, Daten vom Server zu holen, bevor die Seite angezeigt wird
export async function getServerSideProps(context) {
  const { id } = context.params;

  // Verbindung zur DB herstellen
  await dbConnect();

  // Material mit der gegebenen ID suchen
  const material = await Material.findById(id);

  if (!material) {
    return {
      notFound: true, // Optional, wenn Material nicht gefunden wird
    };
  }

  // Material-Daten zurückgeben
  return {
    props: { material: JSON.parse(JSON.stringify(material)) },
  };
}

export default MaterialDetail;
