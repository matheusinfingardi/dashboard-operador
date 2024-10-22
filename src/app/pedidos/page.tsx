import React from 'react';
import { TabelaDePedidos } from '@/components/data-table/TabelaDePedidos'; // Verifique se o caminho está correto

const Pedidos: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Gestão de Pedidos</h2>
          <p className="text-gray-500 mb-4">
            Utilize a tabela abaixo para acompanhar o status dos pedidos e gerenciar as informações relacionadas.
          </p>
          <TabelaDePedidos /> {/* Certifique-se de que este componente está implementado corretamente */}
        </div>
      </div>

    </div>
  );
};

export default Pedidos;
