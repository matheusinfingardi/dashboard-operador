// src/components/TabelaDrones.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

interface Drone {
  id: string;
  status: string;
  local: string;
  nivelBateria: number;
  condicaoUso: string;
}

interface TabelaDronesProps {
  drones: Drone[];
}

export const TabelaDrones: React.FC<TabelaDronesProps> = ({ drones }) => {
  return (
    <Card className="max-w-7xl mx-auto p-6 shadow-lg rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Lista de Drones</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Local</TableCell>
              <TableCell>Bateria (%)</TableCell>
              <TableCell>Condição</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drones.map((drone) => (
              <TableRow key={drone.id}>
                <TableCell>{drone.id}</TableCell>
                <TableCell>{drone.status}</TableCell>
                <TableCell>{drone.local}</TableCell>
                <TableCell>{drone.nivelBateria}</TableCell>
                <TableCell>{drone.condicaoUso}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
