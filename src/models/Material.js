import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  menge: {
    type: Number,
    required: true,
  },
  einheit: {
    type: String,
    required: true,
    enum: ["kg", "Stück", "m²", "Liter"],
  },
  preis: {
    type: Number,
    required: true,
  },
  beschreibung: {
    type: String,
    default: "",
  },
  erstelltAm: {
    type: Date,
    default: Date.now,
  },
  aktualisiertAm: {
    type: Date,
    default: Date.now,
  },

  timestamps: true,
});

const Material =
  mongoose.models.Material || mongoose.model("Material", materialSchema);

export default Material;
