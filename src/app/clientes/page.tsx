import React from 'react';
import { DataTable } from '@/components/data-table/DataTable';

const Clientes: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Gestão de Clientes</h2>
          <p className="text-gray-500 mb-4">
            Utilize a tabela abaixo para acompanhar o histórico de pedidos e gerenciar os clientes
          </p>
          <DataTable />
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-500">
          Para mais informações, entre em contato com nosso suporte.
        </p>
      </div>
    </div>
  );
};

export default Clientes;
