"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Espacio = {
  numero: number;
  estado: string;
  distancia: number;
  fecha: string;
};

export default function EspaciosPage() {
  const [espacio, setEspacio] = useState<Espacio | null>(null);

  useEffect(() => {
    const fetchEspacio = async () => {
      const res = await fetch('/api/sensores');
      const data = await res.json();
      setEspacio(data);
    };

    fetchEspacio();
    const interval = setInterval(fetchEspacio, 5000); // Actualización cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-4">Disponibilidad de Espacio de Parqueo</h1>
      <p className="mb-6 text-lg">A continuación, se muestra el espacio disponible en tiempo real.</p>

      {espacio && (
        <div
          className={`p-4 rounded-lg shadow-md ${
            espacio.estado === 'Disponible' ? 'bg-green-300' : 'bg-red-300'
          }`}
        >
          <h2 className="text-2xl font-semibold">Espacio #{espacio.numero}</h2>
          <p className={`mt-2 text-lg ${espacio.estado === 'Disponible' ? 'text-green-900' : 'text-red-900'}`}>
            {espacio.estado}
          </p>
          <p className="mt-2 text-lg">Distancia: {espacio.distancia} cm</p>
          <p className="mt-2 text-sm text-gray-500">Última actualización: {new Date(espacio.fecha).toLocaleString()}</p>
        </div>
      )}

      <Link href="/">
        <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors hover:bg-blue-700">
          Volver a la Página de Inicio
        </button>
      </Link>
    </div>
  );
}
