import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  menge: { type: Number, required: true },
  einheit: { type: String, required: true },
  preis: { type: Number, required: true },
  beschreibung: { type: String, default: "" },
  bild: { type: String, default: "" }, // Bild-URL
});

const Material =
  mongoose.models.Material || mongoose.model("Material", materialSchema);

export default Material;
