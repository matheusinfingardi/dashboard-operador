// src/components/forms/drone/VerDroneForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';  // Botão importado do shadcn
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Drone } from '@/types/drone';

interface VerDroneFormProps {
  drones: Drone[];
}

const VerDroneForm: React.FC<VerDroneFormProps> = ({ drones }) => {
  const [id, setId] = useState('');
  const [drone, setDrone] = useState<Drone | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundDrone = drones.find((drone) => drone.id === id);
    setDrone(foundDrone || null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="id">ID do Drone</Label>
        <Input
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Digite o ID do drone para visualizar"
          required
        />
      </div>
      <Button onClick={handleSubmit} className="w-full bg-black text-white hover:bg-gray-800">
        Buscar Drone
      </Button>

      {drone && (
        <div className="mt-4">
          <p><strong>ID:</strong> {drone.id}</p>
          <p><strong>Status:</strong> {drone.status}</p>
          <p><strong>Local:</strong> {drone.local}</p>
          <p><strong>Nível de Bateria:</strong> {drone.nivelBateria}%</p>
          <p><strong>Condição de Uso:</strong> {drone.condicaoUso}</p>
        </div>
      )}
      {!drone && id && <p>Drone não encontrado.</p>}
    </form>
  );
};

export default VerDroneForm;
