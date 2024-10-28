import { NextResponse } from 'next/server';

export async function GET() {
  const numero = 1; // Número fijo del espacio
  const estado = Math.random() > 0.5 ? 'Disponible' : 'Ocupado';
  const distancia = Math.floor(Math.random() * 200); // Simulación de distancia en cm (0-200 cm)
  const fecha = new Date().toISOString();

  const espacio = {
    numero,
    estado,
    distancia,
    fecha,
  };

  return NextResponse.json(espacio); // Envía un solo objeto en lugar de un array
}
