import dbConnect from "@db/connect";
import Material from "@db/models/Material";

export default function MaterialDetail({ material }) {
  if (!material) {
    return <div>Material nicht gefunden!</div>;
  }

  return (
    <div>
      <h1>{material.name}</h1>

      <p>
        <strong>Erstellt am:</strong>{" "}
        {material.erstelltAm
          ? new Date(material.erstelltAm).toLocaleDateString()
          : "Keine Angabe"}
      </p>
      <p>
        <strong>Aktualisiert am:</strong>{" "}
        {material.aktualisiertAm
          ? new Date(material.aktualisiertAm).toLocaleDateString()
          : "Keine Angabe"}
      </p>
    </div>
  );
}

// getServerSideProps ermöglicht es uns, Daten vom Server zu holen, bevor die Seite angezeigt wird
export async function getServerSideProps(context) {
  const { id } = context.params;

  await dbConnect();

  const material = await Material.findById(id).lean(); // Nutze `lean()` für plain JSON-Daten

  if (!material) {
    return {
      notFound: true,
    };
  }

  return {
    props: { material }, // Serialisierung erfolgt automatisch
  };
}
