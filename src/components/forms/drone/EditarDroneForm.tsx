import React, { useState } from 'react';
import { Drone } from '@/types/drone';

interface EditarDroneFormProps {
  drones: Drone[];
  onEditDrone: (id: string, updatedDrone: Drone) => void;
}

const EditarDroneForm: React.FC<EditarDroneFormProps> = ({ drones, onEditDrone }) => {
  const [selectedDroneId, setSelectedDroneId] = useState<string>('');
  const [updatedDrone, setUpdatedDrone] = useState<Drone>({
    Drone_id: 0,
    Drone_model: '',
    Status: '',
    Battery_level: 0,
    Owner: '',
    Latitude: 0,
    Longitude: 0,
    Altitude: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDroneId) {
      onEditDrone(selectedDroneId, updatedDrone);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Aqui, um campo para selecionar o drone a ser editado */}
      <select
        value={selectedDroneId}
        onChange={(e) => setSelectedDroneId(e.target.value)}
      >
        {drones.map((drone) => (
          <option key={drone.Drone_id} value={drone.Drone_id.toString()}>
            {drone.Drone_model}
          </option>
        ))}
      </select>

      {/* Formulário para editar as informações do drone */}
      <input
        type="text"
        value={updatedDrone.Drone_model}
        onChange={(e) =>
          setUpdatedDrone({ ...updatedDrone, Drone_model: e.target.value })
        }
        placeholder="Modelo"
      />
      {/* Outros campos do drone (Status, Bateria, etc.) */}

      <button type="submit">Salvar alterações</button>
    </form>
  );
};

export default EditarDroneForm;
