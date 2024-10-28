"use client";

type EspacioParqueoProps = {
  numero: number;
  estado: boolean;
};

export default function EspacioParqueo({ numero, estado }: EspacioParqueoProps) {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
        estado ? 'bg-green-500' : 'bg-red-500'
      } text-white text-center border-2 border-gray-200`}
    >
      <h3 className="text-xl font-bold">Espacio #{numero}</h3>
      <p className="mt-2">{estado ? 'Disponible' : 'Ocupado'}</p>
    </div>
  );
}
