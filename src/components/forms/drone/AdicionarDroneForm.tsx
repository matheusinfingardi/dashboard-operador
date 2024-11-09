// src/components/forms/drone/AdicionarDroneForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';  // Botão importado do shadcn
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdicionarDroneFormProps {
  onAddDrone: (id: string) => void;
}

const AdicionarDroneForm: React.FC<AdicionarDroneFormProps> = ({ onAddDrone }) => {
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDrone(id);
    setId('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="id">ID do Drone</Label>
        <Input
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Digite o ID do drone"
          required
        />
      </div>
      <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
        Adicionar Drone
      </Button>
    </form>
  );
};

export default AdicionarDroneForm;
