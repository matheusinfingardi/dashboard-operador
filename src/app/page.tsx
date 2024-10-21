import { Hourglass, Package2, PackageCheck } from 'lucide-react';
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import { ChartOverview } from '@/components/charts';
import dynamic from 'next/dynamic';

const ReactGoogleMap = dynamic(() => import('@/components/map'), { ssr: false });

export default function Home() {
  return (
    <main className='p-4 sm:ml-4'>
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Total de Pedidos
              </CardTitle>
              <Package2 className='ml-auto w-4 h-4'/>
            </div>

            <CardDescription>
              Total de pedidos nos últimos 90 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>
              42
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Pedidos em progresso
              </CardTitle>
              <Hourglass className='ml-auto w-4 h-4'/>
            </div>

            <CardDescription>
              Seus pedidos em estágio de entrega 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>
              3
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-800 select-none'>
                Pedidos concluídos
              </CardTitle>
              <PackageCheck className='ml-auto w-4 h-4'/>
            </div>

            <CardDescription>
              Seus pedidos concluídos 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>
              39
            </p>
          </CardContent>
        </Card>
      </section>

      <section className='mt-4 flex flex-col md:flex-row gap-4'>
        <ChartOverview />
        <ReactGoogleMap />
      </section>

      <section className='mt-4 flex flex-col md:flex-row gap-4'>
        {/* Espaço para conteúdo adicional */}
      </section>
    </main>
  );
}
