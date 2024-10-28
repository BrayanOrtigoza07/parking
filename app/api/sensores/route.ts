import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  const numero = 1;
  const estado = Math.random() > 0.5 ? 'Libre' : 'Ocupado';
  const distancia = Math.floor(Math.random() * 200); // Simulación de distancia en cm
  const fecha = new Date().toISOString();

  try {
    // Inserta el dato en la tabla sensor_data
    await pool.query(
      'INSERT INTO sensor_data (distancia, fecha, estado) VALUES ($1, $2, $3)',
      [distancia, fecha, estado]
    );

    // Devuelve el dato recién insertado para mostrarlo en la interfaz
    const espacio = {
      numero,
      estado,
      distancia,
      fecha,
    };

    return NextResponse.json(espacio);
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    return NextResponse.json({ error: 'Error al insertar en la base de datos' });
  }
}
