import React from 'react';
import { Drone } from '@/types/drone';

interface VerDroneFormProps {
  drones: Drone[];
}

const VerDroneForm: React.FC<VerDroneFormProps> = ({ drones }) => {
  return (
    <div>
      <h3>Lista de Drones</h3>
      <ul>
        {drones.map((drone) => (
          <li key={drone.Drone_id}>
            {drone.Drone_model} - {drone.Status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerDroneForm;
