import { useState } from "react";
import styled from "styled-components";

export default function MaterialForm() {
  const [name, setName] = useState("");
  const [menge, setMenge] = useState(0);
  const [einheit, setEinheit] = useState("kg");
  const [preis, setPreis] = useState(0);
  const [beschreibung, setBeschreibung] = useState("");
  const [foto, setFoto] = useState(null); // State für das Bild

  // Funktion zum Hochladen des Materials
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("menge", menge);
    formData.append("einheit", einheit);
    formData.append("preis", preis);
    formData.append("beschreibung", beschreibung);
    if (foto) formData.append("foto", foto);

    try {
      const response = await fetch("/api/material", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.text();
        alert(`Fehler: ${data}`);
        return;
      }

      const data = await response.json();
      alert("Material erfolgreich hinzugefügt!");
      // Formular zurücksetzen
      setName("");
      setMenge(0);
      setEinheit("kg");
      setPreis(0);
      setBeschreibung("");
      setFoto(null); // Reset für das Bild
    } catch (error) {
      console.error("Error while submitting:", error);
      alert("Fehler beim Absenden des Formulars: " + error.message);
    }
  }

  // Funktion zum Setzen des Bildes
  const handleFotoChange = (event) => {
    setFoto(event.target.files[0]);
  };

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Menge:
          <input
            type="number"
            value={menge}
            onChange={(event) => setMenge(parseFloat(event.target.value))}
          />
        </label>
        <label>
          Einheit:
          <select
            value={einheit}
            onChange={(event) => setEinheit(event.target.value)}
          >
            <option value="kg">kg</option>
            <option value="Stück">Stück</option>
            <option value="m²">m²</option>
            <option value="Liter">Liter</option>
          </select>
        </label>
        <label>
          Preis:
          <input
            type="number"
            value={preis}
            onChange={(event) => setPreis(parseFloat(event.target.value))}
          />
        </label>
        <label>
          Beschreibung:
          <textarea
            value={beschreibung}
            onChange={(event) => setBeschreibung(event.target.value)}
          />
        </label>
        <label>
          Foto:
          <input type="file" accept="image/*" onChange={handleFotoChange} />
        </label>
        <button type="submit">Material hinzufügen</button>
      </StyledForm>
    </StyledFormWrapper>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
