import Link from "next/link";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MaterialList = () => {
  const [materialList, setMaterialList] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await fetch("/api/material");
      const data = await response.json();
      setMaterialList(data);
    };

    fetchMaterials();
  }, []);

  return (
    <MaterialGrid>
      {materialList.map((material) => (
        <MaterialCard key={material._id}>
          <h2>{material.name}</h2>
          <p>
            <strong>Menge:</strong> {material.menge} {material.einheit}
          </p>
          <p>
            <strong>Preis:</strong> €{material.preis}
          </p>

          <Link href={`/material/${material._id}`}>
            <p>Details anzeigen</p>
          </Link>
        </MaterialCard>
      ))}
    </MaterialGrid>
  );
};

export default MaterialList;

const MaterialCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const MaterialGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
