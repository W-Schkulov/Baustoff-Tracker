import { useState } from "react";
import styled from "styled-components";

export default function MaterialForm() {
  const [name, setName] = useState("");
  const [menge, setMenge] = useState(0);
  const [einheit, setEinheit] = useState("kg");
  const [preis, setPreis] = useState(0);
  const [beschreibung, setBeschreibung] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const materialData = {
      name,
      menge,
      einheit,
      preis,
      beschreibung,
    };

    try {
      const response = await fetch("/api/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(materialData),
      });

      if (response.ok) {
        alert("Material erfolgreich hinzugefügt!");
        setName("");
        setMenge(0);
        setEinheit("kg");
        setPreis(0);
        setBeschreibung("");
      } else {
        const data = await response.json();
        alert(`Fehler: ${data.message}`);
      }
    } catch (error) {
      console.error("Error while submitting:", error);
      alert("Fehler beim Absenden des Formulars");
    }
  }

  return (
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
          onChange={(event) => setMenge(event.target.value)}
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
          onChange={(event) => setPreis(event.target.value)}
        />
      </label>
      <label>
        Beschreibung:
        <textarea
          value={beschreibung}
          onChange={(event) => setBeschreibung(event.target.value)}
        />
      </label>
      <button type="submit">Material hinzufügen</button>
    </StyledForm>
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
