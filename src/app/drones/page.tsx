import React from 'react';
import { TabelaDrones } from '@/components/data-table/TabelaDrones';

const Drones: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Gestão de Drones</h2>
          <p className="text-gray-500 mb-4">
            Utilize a tabela abaixo para gerenciar os drones e acompanhar suas condições de uso e status.
          </p>
          <TabelaDrones />
        </div>
      </div>

    </div>
  );
};

export default Drones;
