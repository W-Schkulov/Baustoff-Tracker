import { useState } from "react";
import styled from "styled-components";
import MaterialForm from "../components/MaterialForm";
import MaterialList from "@/components/MaterialList";
const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

export default function Home() {
  return (
    <Container>
      <Title>Handwerker Material Verbrauch</Title>
      <MaterialForm />
      <MaterialList />
    </Container>
  );
}
