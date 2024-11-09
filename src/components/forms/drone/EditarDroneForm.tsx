// src/components/forms/drone/EditarDroneForm.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';  // Botão importado do shadcn
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Drone } from '@/types/drone';

interface EditarDroneFormProps {
  drones: Drone[];
  onEditDrone: (id: string, updatedDrone: Drone) => void;
}

const EditarDroneForm: React.FC<EditarDroneFormProps> = ({ drones, onEditDrone }) => {
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);
  const [status, setStatus] = useState<'Disponível' | 'Em uso' | 'Manutenção'>('Disponível');  // Inicializamos com um valor válido
  const [local, setLocal] = useState<string>('');
  const [nivelBateria, setNivelBateria] = useState<number>(0);
  const [condicaoUso, setCondicaoUso] = useState<'Boa' | 'Regular' | 'Ruim'>('Boa');  // Inicializamos com um valor válido

  // Atualiza os campos quando um drone é selecionado
  const handleSelectDrone = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const droneId = e.target.value;
    const drone = drones.find((drone) => drone.id === droneId);
    if (drone) {
      setSelectedDrone(drone);
      setStatus(drone.status);  // Atualiza o status com o valor do drone
      setLocal(drone.local);
      setNivelBateria(drone.nivelBateria);
      setCondicaoUso(drone.condicaoUso);  // Atualiza a condição de uso com o valor do drone
    }
  };

  // Submete os dados do drone editado
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDrone) {
      const updatedDrone: Drone = {
        ...selectedDrone,
        status,  // Atualiza o status
        local,
        nivelBateria,
        condicaoUso,  // Atualiza a condição de uso
      };
      onEditDrone(selectedDrone.id, updatedDrone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Seleção do Drone */}
      <div>
        <Label htmlFor="droneId">Escolha o Drone</Label>
        <select
          id="droneId"
          value={selectedDrone ? selectedDrone.id : ''}
          onChange={handleSelectDrone}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecione um Drone</option>
          {drones.map((drone) => (
            <option key={drone.id} value={drone.id}>
              {drone.id}
            </option>
          ))}
        </select>
      </div>

      {/* Campo de Status */}
      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Disponível' | 'Em uso' | 'Manutenção')}  // Garantimos que o valor seja válido
          className="w-full p-2 border rounded"
        >
          <option value="Disponível">Disponível</option>
          <option value="Em uso">Em uso</option>
          <option value="Manutenção">Manutenção</option>
        </select>
      </div>

      {/* Campo de Local */}
      <div>
        <Label htmlFor="local">Local</Label>
        <Input
          id="local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          placeholder="Localização"
        />
      </div>

      {/* Campo de Nível de Bateria */}
      <div>
        <Label htmlFor="nivelBateria">Nível de Bateria</Label>
        <Input
          id="nivelBateria"
          type="number"
          value={nivelBateria}
          onChange={(e) => setNivelBateria(Number(e.target.value))}
          placeholder="Nível de Bateria"
        />
      </div>

      {/* Campo de Condição de Uso */}
      <div>
        <Label htmlFor="condicaoUso">Condição de Uso</Label>
        <select
          id="condicaoUso"
          value={condicaoUso}
          onChange={(e) => setCondicaoUso(e.target.value as 'Boa' | 'Regular' | 'Ruim')}  // Garantimos que o valor seja válido
          className="w-full p-2 border rounded"
        >
          <option value="Boa">Boa</option>
          <option value="Regular">Regular</option>
          <option value="Ruim">Ruim</option>
        </select>
      </div>

      {/* Botão de Envio */}
      <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
        Atualizar Drone
      </Button>
    </form>
  );
};

export default EditarDroneForm;
