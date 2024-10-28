"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      {/* Encabezado */}
      <header className="w-full bg-green-900 h-24 flex items-center justify-between px-6">
        {/* Escudo en la parte izquierda */}
        <div className="flex items-center">
          <Image
            src="/escudo-udec.png"
            alt="Escudo de la Universidad de Cundinamarca"
            width={80} 
            height={80} 
            className="object-contain"
          />
        </div>
        
        {/* Título centrado */}
        <h1 className="text-4xl font-extrabold text-white tracking-wide font-serif absolute inset-x-0 text-center">
          Parqueadero Universidad de Cundinamarca
        </h1>
      </header>
      
      {/* Contenido Principal */}
      <main className="flex flex-col items-center justify-center flex-grow p-8">
        {/* Imagen de fondo estilo parqueadero */}
        <div className="w-full max-w-4xl bg-gray-300 p-8 rounded-lg shadow-lg">
          <div className="relative w-full h-80 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/parqueadero-fondo.png')" }}>
            <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-lg" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h2 className="text-4xl font-bold mb-4">Consulta los Espacios Disponibles</h2>
              <p className="text-lg mb-6">Revisa en tiempo real el estado del parqueadero.</p>
              <Link href="/espacios">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors hover:bg-blue-700">
                  Ver Espacios de Parqueo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
