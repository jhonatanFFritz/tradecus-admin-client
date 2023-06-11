import GraficBarchart from '../components/Grafic/GraficBarchart'; 
import GraficLinechart from '../components/Grafic/GraficLinechart'; 

export default function Home() {
  return (
    <div style={{ overflow: 'auto' }}>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-white h-auto shadow-sm border-2 border-gray-200">
          <GraficLinechart />
        </div>
        <div className="rounded bg-white h-auto shadow-sm border-2 border-gray-200 ">
          <GraficBarchart />
        </div>
        <div className="rounded bg-white h-auto shadow-sm border-2 border-gray-200 ">
          {/* Tercer gráfico pequeño irá aquí */}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-7">
        <div className="rounded bg-white h-auto shadow-sm border-2 border-gray-200 p-4">
          {/* Primer gráfico mediano irá aquí */}
        </div>
        <div className="rounded bg-white h-auto shadow-sm border-2 border-gray-200 p-4">
          {/* Segundo gráfico mediano irá aquí */}
        </div>
      </div>
    </div>
  );
}
