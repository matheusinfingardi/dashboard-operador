import React from 'react';
import { TabelaDeMissoes } from '@/components/data-table/TabelaDeMissoes';

const Missoes: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Gestão de Missões</h2>
          <p className="text-gray-500 mb-4">
            Utilize a tabela abaixo para acompanhar o progresso das missões e gerenciar as informações relacionadas.
          </p>
          <TabelaDeMissoes />
        </div>
      </div>

    </div>
  );
};

export default Missoes;
