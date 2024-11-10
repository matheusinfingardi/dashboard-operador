// src/pages/api/drones/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Drone } from '@/types/drone'; // Supondo que você tenha esse tipo

// Mock de dados, substitua com acesso ao seu banco de dados (Supabase, Prisma, etc)
let drones: Drone[] = [
  { id: '1', status: 'Disponível', local: 'Base A', nivelBateria: 100, condicaoUso: 'Boa' },
  { id: '2', status: 'Em uso', local: 'Base B', nivelBateria: 80, condicaoUso: 'Boa' },
];

// Função que manipula as rotas GET e POST para drones
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Retornar todos os drones
    return res.status(200).json(drones);
  }

  if (req.method === 'POST') {
    // Adicionar um novo drone
    const { id, status, local, nivelBateria, condicaoUso } = req.body;
    const newDrone: Drone = { id, status, local, nivelBateria, condicaoUso };

    drones.push(newDrone); // Aqui você faria a inserção no banco de dados
    return res.status(201).json(newDrone);
  }

  res.status(405).json({ message: 'Método não permitido' });
}
