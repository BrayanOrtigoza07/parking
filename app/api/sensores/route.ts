import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Configuración de la conexión con PostgreSQL utilizando la variable de entorno DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Asegura la conexión SSL
  },
});

// Método GET: Obtener todos los registros de la tabla sensor_data
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM sensor_data ORDER BY fecha DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos de la base de datos:', error);
    return NextResponse.json({ error: 'Error al obtener datos de la base de datos' }, { status: 500 });
  }
}

// Método POST: Recibir datos desde Arduino y almacenarlos en la base de datos
export async function POST(request: Request) {
  try {
    const { distancia, estado } = await request.json();
    const fecha = new Date().toISOString(); // Generar la fecha actual en formato ISO

    // Insertar el dato en la base de datos
    await pool.query(
      'INSERT INTO sensor_data (distancia, fecha, estado) VALUES ($1, $2, $3)',
      [distancia, fecha, estado]
    );

    return NextResponse.json({ message: 'Datos insertados correctamente' });
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    return NextResponse.json({ error: 'Error al insertar en la base de datos' }, { status: 500 });
  }
}
