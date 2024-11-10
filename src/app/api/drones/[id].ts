// src/pages/api/drones/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Drone } from '@/types/drone'; // Tipo do drone

// Mock de dados, substitua com acesso ao seu banco de dados (Supabase, Prisma, etc)
let drones: Drone[] = [
  { id: '1', status: 'Disponível', local: 'Base A', nivelBateria: 100, condicaoUso: 'Boa' },
  { id: '2', status: 'Em uso', local: 'Base B', nivelBateria: 80, condicaoUso: 'Boa' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Id do drone na URL

  // Encontrar o drone pelo ID
  const droneIndex = drones.findIndex((drone) => drone.id === id);
  if (droneIndex === -1) {
    return res.status(404).json({ message: 'Drone não encontrado' });
  }

  if (req.method === 'PUT') {
    // Editar um drone
    const { status, local, nivelBateria, condicaoUso } = req.body;
    drones[droneIndex] = {
      ...drones[droneIndex],
      status,
      local,
      nivelBateria,
      condicaoUso,
    };
    return res.status(200).json(drones[droneIndex]);
  }

  if (req.method === 'DELETE') {
    // Remover um drone
    drones = drones.filter((drone) => drone.id !== id);
    return res.status(200).json({ message: 'Drone removido com sucesso' });
  }

  res.status(405).json({ message: 'Método não permitido' });
}
