// src/components/forms/drone/RemoverDroneForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';  // Botão importado do shadcn
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RemoverDroneFormProps {
  onRemoveDrone: (id: string) => void;
}

const RemoverDroneForm: React.FC<RemoverDroneFormProps> = ({ onRemoveDrone }) => {
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRemoveDrone(id);
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
          placeholder="Digite o ID do drone para remover"
          required
        />
      </div>
      <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
        Remover Drone
      </Button>
    </form>
  );
};

export default RemoverDroneForm;
