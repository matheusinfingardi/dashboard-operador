// app/api/delivery/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { model, departure, destination, weight } = await request.json();

  try {
    const delivery = await prisma.delivery.create({
      data: {
        model,
        departure,
        destination,
        weight: parseFloat(weight), // Certifique-se de que weight é um número
      },
    });

    return NextResponse.json({ success: true, data: delivery });
  } catch (error) {
    console.error("Erro ao criar entrega:", error); // Log do erro
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}