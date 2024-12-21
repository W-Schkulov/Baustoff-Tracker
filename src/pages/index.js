import { useState } from "react";
import styled from "styled-components";
import MaterialList from "../components/MaterialList";

const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export default function Home() {
  const [materials, setMaterials] = useState([]);

  return (
    <Container>
      <Title>Handwerker Material Verbrauch</Title>
      <MaterialList materials={materials} />
      <button
        onClick={() =>
          setMaterials([...materials, { name: "Zement", amount: 10 }])
        }
      >
        Material hinzufügen
      </button>
    </Container>
  );
}
