// components/forms/AdicionarDroneForm.tsx

'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddDroneFormProps {
  onAddDrone: () => void; // Função para atualizar a lista de drones após adicionar um novo
}

const AddDroneForm: React.FC<AddDroneFormProps> = ({ onAddDrone }) => {
  const [droneId, setDroneId] = useState('');
  const [connectionType, setConnectionType] = useState('SITL'); // Default connection type
  const [error, setError] = useState<string | null>(null); // Para exibir erros

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Valida se o campo droneId foi preenchido
    if (!droneId) {
      setError('Por favor, preencha o ID do Drone!');
      return;
    }

    // Envia os dados para o Supabase
    const { data, error } = await supabase
      .from('drones')
      .insert([{
        drone_id: droneId,
        connection_type: connectionType,
        connection_status: 'disconnected', // Status padrão ao criar
      }]);

    if (error) {
      alert('Erro ao adicionar o drone: ' + error.message);
      setError('Erro ao adicionar o drone. Tente novamente.');
    } else {
      // Atualiza a tabela no frontend
      onAddDrone();
      // Limpa o formulário
      setDroneId('');
      setConnectionType('SITL'); // Reset to default connection type
      setError(null); // Limpa a mensagem de erro
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <label htmlFor="drone_id" className="block text-sm font-semibold">ID do Drone</label>
        <Input
          id="drone_id"
          type="text"
          value={droneId}
          onChange={(e) => setDroneId(e.target.value)}
          placeholder="ID único do drone"
          className="mt-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="connection_type" className="block text-sm font-semibold">Tipo de Conexão</label>
        <select
          id="connection_type"
          value={connectionType}
          onChange={(e) => setConnectionType(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border rounded-md"
        >
          <option value="SITL">SITL</option>
          <option value="TTY">TTY</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>} {/* Exibe a mensagem de erro */}

      <Button type="submit" className="w-full mt-4">Adicionar Drone</Button>
    </form>
  );
};

export default AddDroneForm;
