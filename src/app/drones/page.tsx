'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddDroneForm from '@/components/forms/drone/AdicionarDroneForm';
import DroneTable from '@/components/data-table/TabelaDrones';
import { Drone } from '@/types/drone';

const Drones = () => {
  const [drones, setDrones] = useState<Drone[]>([]);

  // Carrega os drones do banco de dados
  useEffect(() => {
    const fetchDrones = async () => {
      const { data, error } = await supabase
        .from('drones')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar drones:', error);
      } else {
        setDrones(data);
      }
    };

    fetchDrones();
  }, []);

  // Função para atualizar a lista de drones
  const handleAddDrone = async () => {
    const { data, error } = await supabase
      .from('drones')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao atualizar drones:', error);
    } else {
      setDrones(data); // Atualiza a lista de drones
    }
  };

  // Função para conectar o drone
  const connectDrone = async (droneId: string) => {
    try {
      const response = await fetch(`https://four2-drone-microsservices.onrender.com/connect?drone_id=${droneId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Drone ${droneId} conectado com sucesso!`);
        handleAddDrone(); // Atualiza a lista de drones para refletir a nova conexão
      } else {
        alert(`Erro ao conectar drone: ${result.detail}`);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Erro ao tentar conectar o drone.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-6xl mx-auto bg-white shadow-lg rounded-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Conexões de Drones</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formulário para adicionar drones */}
          <AddDroneForm onAddDrone={handleAddDrone} />
          
          {/* Tabela de drones */}
          <DroneTable 
            drones={drones} 
            onUpdateDrones={handleAddDrone} 
            onConnectDrone={connectDrone} // Passa a função para a tabela
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Drones;
