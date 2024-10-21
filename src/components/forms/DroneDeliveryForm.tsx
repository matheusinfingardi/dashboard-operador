"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { formSchema } from '../../schemas/formSchema';
import { Card } from '@/components/ui/card';

// Define a interface para os dados de entrega
interface DeliveryData {
  model: string;
  departure: string;
  destination: string;
  weight: string;
}

export default function DroneDeliveryForm() {
  const [model, setModel] = useState<string>('');
  const [departure, setDeparture] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<DeliveryData | null>(null); // Use DeliveryData aqui
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleModelChange = (value: string) => {
    setModel(value);
    setDeparture('');
    setDestination('');
  };

  const selectedModel = formSchema.modelOptions.find(option => option.value === model);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Validação básica
    if (!model || !departure || !destination || !weight) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const data: DeliveryData = {  // Tipagem dos dados
      model,
      departure,
      destination,
      weight,
    };

    // Enviar dados para a API
    try {
      const response = await fetch('/api/delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados');
      }

      const result = await response.json();
      setSubmittedData(result.data); // Armazena os dados recebidos da API
      setSuccessMessage('Entrega criada com sucesso!'); // Mensagem de sucesso
      setError(null); // Limpa qualquer erro anterior

      // Limpa os campos após o envio
      setModel('');
      setDeparture('');
      setDestination('');
      setWeight('');
    } catch (err) {
      setError((err as Error).message); // Armazena a mensagem de erro
      console.error(err);
    }
  };

  return (
    <Card className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Entrega de Pacotes por Drone</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Modelo de Entrega</label>
          <Select onValueChange={handleModelChange} value={model}>
            <SelectTrigger className="flex justify-between items-center border rounded-md p-2 mt-1">
              <SelectValue placeholder="Selecione um modelo" />
            </SelectTrigger>
            <SelectContent>
              {formSchema.modelOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedModel && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Local de Partida</label>
              <Select onValueChange={setDeparture} value={departure}>
                <SelectTrigger className="flex justify-between items-center border rounded-md p-2 mt-1">
                  <SelectValue placeholder="Selecione um local" />
                </SelectTrigger>
                <SelectContent>
                  {selectedModel.departureOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Local de Entrega</label>
              <Select onValueChange={setDestination} value={destination}>
                <SelectTrigger className="flex justify-between items-center border rounded-md p-2 mt-1">
                  <SelectValue placeholder="Selecione um local" />
                </SelectTrigger>
                <SelectContent>
                  {selectedModel.destinationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Peso do Pacote (kg)</label>
          <input 
            type="number" 
            placeholder="Digite o peso do pacote" 
            value={weight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(e.target.value)} 
            className="block w-full mt-1 border rounded-md p-2 shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>

        <Button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Enviar
        </Button>
      </form>

      {/* Exibe os dados enviados se houver */}
      {submittedData && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h2 className="text-lg font-semibold">Dados Enviados:</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}

      {/* Exibe mensagem de sucesso, se houver */}
      {successMessage && (
        <div className="mt-6 p-4 border rounded-md bg-green-100 text-green-700">
          <h2 className="text-lg font-semibold">Sucesso:</h2>
          <p>{successMessage}</p>
        </div>
      )}

      {/* Exibe mensagem de erro, se houver */}
      {error && (
        <div className="mt-6 p-4 border rounded-md bg-red-100 text-red-700">
          <h2 className="text-lg font-semibold">Erro:</h2>
          <p>{error}</p>
        </div>
      )}
    </Card>
  );
}
