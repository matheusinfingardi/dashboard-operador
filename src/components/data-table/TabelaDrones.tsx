import React from 'react';
import { Drone } from '@/types/drone';

interface DroneTableProps {
  drones: Drone[];
  onUpdateDrones: () => void;
  onConnectDrone: (droneId: string) => void;
}

const DroneTable: React.FC<DroneTableProps> = ({ drones, onUpdateDrones, onConnectDrone }) => {
  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Drone ID</th>
          <th className="px-4 py-2">Tipo de Conexão</th>
          <th className="px-4 py-2">Status da Conexão</th>
          <th className="px-4 py-2">Ação</th>
        </tr>
      </thead>
      <tbody>
        {drones.map((drone) => (
          <tr key={drone.id}>
            <td className="px-4 py-2">{drone.drone_id}</td>
            <td className="px-4 py-2">{drone.connection_type}</td>
            <td className="px-4 py-2">{drone.connection_status}</td>
            <td className="px-4 py-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => onConnectDrone(drone.drone_id)} // Chama a função de conectar
              >
                Conectar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DroneTable;
