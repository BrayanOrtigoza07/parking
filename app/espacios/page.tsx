"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Espacio = {
  id: number;
  distancia: number;
  fecha: string;
  estado: string;
};

export default function EspaciosPage() {
  const [espacios, setEspacios] = useState<Espacio[]>([]);

  useEffect(() => {
    const fetchEspacios = async () => {
      const res = await fetch('/api/sensores');
      const data = await res.json();
      setEspacios(data); // Guarda todos los registros en el estado
    };

    fetchEspacios();
    const interval = setInterval(fetchEspacios, 5000); // Actualización cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-bold mb-4 text-blue-700">Disponibilidad de Espacio de Parqueo</h1>
      <p className="mb-8 text-lg text-gray-600">Visualización en tiempo real de la disponibilidad de espacios en el parqueo.</p>

      {/* Contenedor de dos columnas */}
      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        
        {/* Columna izquierda: Cuadro de espacio (último registro) */}
        <div className="flex-1 p-4 border-r border-gray-200">
          {espacios.length > 0 && (
            <div
              className={`p-6 rounded-lg shadow-md text-center ${
                espacios[0].estado === 'Libre' ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'
              }`}
            >
              <h2 className="text-3xl font-semibold mb-2 text-gray-700">Espacio 1</h2>
              <p className="text-lg font-medium text-gray-500">Muestra ID: {espacios[0].id}</p>
              <p className={`text-2xl font-bold ${
                espacios[0].estado === 'Libre' ? 'text-green-600' : 'text-red-600'
              }`}>
                {espacios[0].estado}
              </p>
              <p className="mt-4 text-xl text-gray-500">Distancia: {espacios[0].distancia} cm</p>
              <p className="mt-2 text-sm text-gray-400">Actualizado: {new Date(espacios[0].fecha).toLocaleString()}</p>
            </div>
          )}
        </div>

        {/* Columna derecha: Tabla de datos acumulativos */}
        <div className="flex-1 p-4 overflow-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="px-6 py-3 border-b">ID</th>
                <th className="px-6 py-3 border-b">Distancia (cm)</th>
                <th className="px-6 py-3 border-b">Fecha</th>
                <th className="px-6 py-3 border-b">Estado</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {espacios.map((espacio) => (
                <tr key={espacio.id} className="hover:bg-gray-100 border-b border-gray-200">
                  <td className="px-6 py-3 text-center">{espacio.id}</td>
                  <td className="px-6 py-3 text-center">{espacio.distancia}</td>
                  <td className="px-6 py-3 text-center">{new Date(espacio.fecha).toLocaleString()}</td>
                  <td className={`px-6 py-3 text-center font-semibold ${
                    espacio.estado === 'Libre' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {espacio.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón para volver a la página de inicio */}
      <Link href="/">
        <button className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
          Volver a la Página de Inicio
        </button>
      </Link>
    </div>
  );
}
