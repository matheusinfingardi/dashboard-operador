// InfoCard.tsx
import { Card } from '@/components/ui/card';

export default function InfoCard() {
  return (
    <Card className="p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-2">Como Funciona a Entrega</h2>
      <p className="mb-4">
        A entrega de pacotes por drone é uma maneira rápida e eficiente de enviar itens. 
        Ao escolher um modelo de entrega, você terá opções de locais de partida e entrega.
      </p>
      <h3 className="font-semibold">Passos para a Entrega:</h3>
      <ol className="list-decimal list-inside">
        <li>Selecione o modelo de entrega que melhor se adequa às suas necessidades.</li>
        <li>Escolha o local de partida e o destino para o seu pacote.</li>
        <li>Informe o peso do pacote.</li>
        <li>Clique em &quot;Enviar&quot; para processar a entrega.</li> {/* Corrigido */}
      </ol>
    </Card>
  );
}