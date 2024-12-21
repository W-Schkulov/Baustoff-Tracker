import dbConnect from "@lib/dbConnect";
import Material from "../../models/Material";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const material = new Material({
          name: req.body.name,
          menge: req.body.menge,
          einheit: req.body.einheit,
          preis: req.body.preis,
          beschreibung: req.body.beschreibung || "",
        });
        await material.save();
        res.status(201).json(material);
      } catch (error) {
        res.status(500).json({ message: "Error creating material" });
      }
      break;

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
