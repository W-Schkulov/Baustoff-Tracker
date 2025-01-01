import databaseConnect from "@db/connect";
import Material from "@db/models/Material";

export default async function handler(request, response) {
  await databaseConnect();

  try {
    if (request.method === "GET") {
      const materialList = await Material.find(); // Alle Einträge abrufen
      return response.status(200).json(materialList);
    }

    if (request.method === "POST") {
      const inputData = request.body;

      if (
        !inputData.name ||
        !inputData.menge ||
        !inputData.einheit ||
        !inputData.preis
      ) {
        return response
          .status(400)
          .json({ message: "Alle Felder müssen ausgefüllt werden!" });
      }

      const material = await Material.create(inputData);
      return response
        .status(201)
        .json({ message: "Material erfolgreich hinzugefügt!", material });
    }

    response
      .status(405)
      .json({ message: `Method ${request.method} Not Allowed` });
  } catch (error) {
    console.error("Fehler beim Verarbeiten der Anfrage:", error);
    response
      .status(500)
      .json({ message: "Serverfehler beim Verarbeiten der Anfrage" });
  }
}
