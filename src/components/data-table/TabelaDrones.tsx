'use client';

import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Drone } from '@/types/drone';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

interface DroneTableProps {
  drones: Drone[];
  onUpdateDrones: () => void;
}

const DroneTable = ({ drones, onUpdateDrones }: DroneTableProps) => {
  const [loading, setLoading] = useState<string | null>(null); // Controla o estado de loading de cada drone

  // Função para alterar o status de um drone para "conectado"
  const handleConnectDrone = async (droneId: string) => {
    setLoading(droneId); // Inicia o carregamento para o drone específico

    try {
      // Faz a requisição para conectar ao microsserviço de MAVLink
      const response = await fetch('/api/connect-drone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ droneId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Atualiza o status no banco de dados se a conexão for bem-sucedida
        const { error } = await supabase
          .from('drones')
          .update({ connection_status: 'connected' })
          .match({ drone_id: droneId });

        if (error) {
          throw new Error(error.message);
        }

        console.log('Drone conectado com sucesso!');
        onUpdateDrones(); // Atualiza a lista de drones
      } else {
        throw new Error(result.message || 'Falha ao conectar o drone');
      }
    } catch (error) {
      // Verificando se o erro é uma instância de Error antes de acessar 'message'
      if (error instanceof Error) {
        alert('Erro ao conectar o drone: ' + error.message);
      } else {
        alert('Erro desconhecido ao conectar o drone');
      }
    } finally {
      setLoading(null); // Remove o carregamento
    }
  };

  // Função para alterar o status de um drone para "desconectado"
  const handleDisconnectDrone = async (droneId: string) => {
    setLoading(droneId); // Inicia o carregamento para o drone específico

    try {
      const response = await fetch('/api/disconnect-drone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ droneId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const { error } = await supabase
          .from('drones')
          .update({ connection_status: 'disconnected' })
          .match({ drone_id: droneId });

        if (error) {
          throw new Error(error.message);
        }

        console.log('Drone desconectado com sucesso!');
        onUpdateDrones(); // Atualiza a lista de drones
      } else {
        throw new Error(result.message || 'Falha ao desconectar o drone');
      }
    } catch (error) {
      // Verificando se o erro é uma instância de Error antes de acessar 'message'
      if (error instanceof Error) {
        alert('Erro ao desconectar o drone: ' + error.message);
      } else {
        alert('Erro desconhecido ao desconectar o drone');
      }
    } finally {
      setLoading(null); // Remove o carregamento
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <Table className="min-w-full table-auto border-collapse" style={{ tableLayout: 'fixed' }}>
        {/* Colocando <TableHead> dentro de <thead> */}
        <thead>
          <TableRow className="bg-gray-100 text-sm text-gray-600">
            <TableCell className="px-6 py-3 text-left font-semibold w-1/4">ID do Drone</TableCell>
            <TableCell className="px-6 py-3 text-left font-semibold w-1/4">Tipo de Conexão</TableCell>
            <TableCell className="px-6 py-3 text-left font-semibold w-1/4">Status</TableCell>
            <TableCell className="px-6 py-3 text-left font-semibold w-1/4">Data de Conexão</TableCell>
            <TableCell className="px-6 py-3 text-left font-semibold w-1/4">Ações</TableCell>
          </TableRow>
        </thead>

        {/* Corpo da tabela com <tbody> */}
        <TableBody>
          {drones.map((drone, index) => (
            <TableRow
              key={drone.drone_id}
              className={`border-t transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <TableCell className="px-6 py-4 text-sm">{drone.drone_id}</TableCell>
              <TableCell className="px-6 py-4 text-sm">{drone.connection_type}</TableCell>
              <TableCell className="px-6 py-4 text-sm">{drone.connection_status}</TableCell>
              <TableCell className="px-6 py-4 text-sm">
                {new Date(drone.created_at).toLocaleString()}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm flex space-x-2">
                {drone.connection_status === 'disconnected' && (
                  <Button
                    onClick={() => handleConnectDrone(drone.drone_id)}
                    variant="outline"
                    className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                    disabled={loading === drone.drone_id} // Desativa o botão enquanto está carregando
                  >
                    {loading === drone.drone_id ? 'Conectando...' : 'Conectar'}
                  </Button>
                )}
                {drone.connection_status === 'connected' && (
                  <Button
                    onClick={() => handleDisconnectDrone(drone.drone_id)}
                    className="bg-red-600 text-white hover:bg-red-700"
                    disabled={loading === drone.drone_id} // Desativa o botão enquanto está carregando
                  >
                    {loading === drone.drone_id ? 'Desconectando...' : 'Desconectar'}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DroneTable;
