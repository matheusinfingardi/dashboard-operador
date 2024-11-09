// src/pages/Drones.tsx
'use client'
import React, { useState } from 'react';
import AdicionarDroneForm from '@/components/forms/drone/AdicionarDroneForm';
import RemoverDroneForm from '@/components/forms/drone/RemoverDroneForm';
import VerDroneForm from '@/components/forms/drone/VerDroneForm';
import EditarDroneForm from '@/components/forms/drone/EditarDroneForm';
import { TabelaDrones } from '@/components/data-table/TabelaDrones';
import { Drone } from '@/types/drone';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const Drones: React.FC = () => {
  const [drones, setDrones] = useState<Drone[]>([]);

  const handleAddDrone = (id: string) => {
    const newDrone = {
      id,
      status: 'Disponível',
      local: 'Base A',
      nivelBateria: 100,
      condicaoUso: 'Boa',
    };
    setDrones([...drones, newDrone]);
  };

  const handleRemoveDrone = (id: string) => {
    setDrones(drones.filter((drone) => drone.id !== id));
  };

  const handleEditDrone = (id: string, updatedDrone: Drone) => {
    setDrones(
      drones.map((drone) => (drone.id === id ? { ...drone, ...updatedDrone } : drone))
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Grid de Cards Responsivos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Adicionar Drone */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Adicionar Drone</CardTitle>
          </CardHeader>
          <CardContent>
            <AdicionarDroneForm onAddDrone={handleAddDrone} />
          </CardContent>
        </Card>

        {/* Card Remover Drone */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Remover Drone</CardTitle>
          </CardHeader>
          <CardContent>
            <RemoverDroneForm onRemoveDrone={handleRemoveDrone} />
          </CardContent>
        </Card>

        {/* Card Ver Drone */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Ver Drone</CardTitle>
          </CardHeader>
          <CardContent>
            <VerDroneForm drones={drones} />
          </CardContent>
        </Card>

        {/* Card Editar Drone (Ocupa mais espaço nas telas maiores) */}
        <Card className="lg:col-span-3 w-full">
          <CardHeader>
            <CardTitle>Editar Drone</CardTitle>
          </CardHeader>
          <CardContent>
            <EditarDroneForm drones={drones} onEditDrone={handleEditDrone} />
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Drones */}
      <TabelaDrones drones={drones} />
    </div>
  );
};

export default Drones;
