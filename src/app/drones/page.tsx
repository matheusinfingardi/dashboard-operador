// pages/drones.tsx

'use client';

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
          <DroneTable drones={drones} onUpdateDrones={handleAddDrone} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Drones;
