import React, { useState } from 'react';
import { Drone } from '@/types/drone';
import { supabase } from '@/lib/supabaseClient';

interface RemoverDroneFormProps {
  onRemoveDrone: (id: string) => void;
}

const RemoverDroneForm: React.FC<RemoverDroneFormProps> = ({ onRemoveDrone }) => {
  const [selectedDroneId, setSelectedDroneId] = useState<string>('');

  const handleRemove = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedDroneId) {
      const { error } = await supabase.from('Drone').delete().eq('Drone_id', Number(selectedDroneId));

      if (error) {
        console.error('Erro ao remover drone:', error.message);
      } else {
        onRemoveDrone(selectedDroneId);
        alert('Drone removido com sucesso!');
      }
    }
  };

  return (
    <form onSubmit={handleRemove}>
      <select
        value={selectedDroneId}
        onChange={(e) => setSelectedDroneId(e.target.value)}
      >
        {/* Aqui, preenchemos com os drones existentes */}
      </select>

      <button type="submit">Remover Drone</button>
    </form>
  );
};

export default RemoverDroneForm;
