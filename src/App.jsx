import { useState } from 'react';
import MapView from './components/MapView';
import WeatherPanel from './components/WeatherPanel';
import { useWeather } from './hooks/useWeather';

//Puente de comunicacion de mi app
//El mapa y el clima no se conocen, así que desde aquí se van conectando todo

export default function App() {
  const [selectedCoords, setSelectedCoords] = useState(null);
  const { data, isLoading, error, fetchWeather } = useWeather();

  // Función para manejar la selección de ubicación en el mapa
  const handleLocationSelect = (coords) => {
    setSelectedCoords(coords);
    fetchWeather(coords.lat, coords.lng);
  };

  // Función para obtener la ubicación actual del usuario mediante el navegador
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          handleLocationSelect(coords);
        },
        (err) => {
          alert('No se pudo acceder a tu ubicación: ' + err.message);
        }
      );
    } else {
      alert('La geolocalización no está soportada por tu navegador.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Weather Map 🌤️</h1>
        
        {/* Botón de Geolocalización Explícita */}
        <button 
          onClick={handleUseMyLocation}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s'
          }}
        >
          📍 Usar mi ubicación
        </button>
      </header>

      {/* Componente del Mapa */}
      <MapView 
        onLocationSelect={handleLocationSelect} 
        selectedCoords={selectedCoords} 
      />

      {/* Panel de Información del Clima */}
      <WeatherPanel 
        data={data} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
}