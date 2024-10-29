import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Configuración de la conexión con PostgreSQL utilizando la variable de entorno DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  // Genera datos simulados para el sensor
  const estado = Math.random() > 0.5 ? 'Libre' : 'Ocupado';
  const distancia = Math.floor(Math.random() * 200); // Simulación de distancia en cm (0-200 cm)
  const fecha = new Date().toISOString();

  try {
    // Inserta el dato generado en la tabla sensor_data
    await pool.query(
      'INSERT INTO sensor_data (distancia, fecha, estado) VALUES ($1, $2, $3)',
      [distancia, fecha, estado]
    );

    // Consulta para obtener todos los registros de la tabla sensor_data
    const result = await pool.query('SELECT * FROM sensor_data ORDER BY fecha DESC');

    // Devuelve todos los registros como respuesta JSON
    return NextResponse.json(result.rows);
  } catch (error) {
    // Manejo de errores en caso de falla de conexión o inserción
    console.error('Error al insertar en la base de datos:', error);
    return NextResponse.json({ error: 'Error al insertar en la base de datos' });
  }
}
