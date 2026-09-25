//Renderizado de estado
//Aquí la pantalla reaccionará solo si hay datos entregados por useWeather
//si no hay datos no sirve la wea

// Función auxiliar para convertir el código de clima a texto amigable
function getWeatherDescription(code) {
  const codes = {
    0: 'Cielo despejado ☀️',
    1: 'Principalmente despejado 🌤️',
    2: 'Parcialmente nublado ⛅',
    3: 'Nublado ☁️',
    45: 'Niebla 🌫️',
    48: 'Niebla con escarcha 🌫️❄️',
    51: 'Llovizna ligera 🌧️',
    53: 'Llovizna moderada 🌧️',
    61: 'Lluvia ligera 🌧️',
    63: 'Lluvia moderada 🌧️',
    65: 'Lluvia fuerte 🌧️⚡',
    71: 'Nevada ligera ❄️',
    95: 'Tormenta eléctrica 🌩️',
  };
  return codes[code] || `Código de tiempo: ${code}`;
}

export default function WeatherPanel({ data, isLoading, error }) {
  return (
    <div style={{ 
      padding: '1.5rem', 
      border: '1px solid #e0e0e0', 
      borderRadius: '8px', 
      marginTop: '1rem',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ marginTop: 0 }}>Clima Actual</h3>

      {isLoading && (
        <p style={{ color: '#0066cc', fontWeight: 'bold' }}>
          ⏳ Consultando el clima en Open-Meteo...
        </p>
      )}

      {error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          ❌ Error: {error}
        </p>
      )}

      {data && !isLoading && (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <p><strong>Estado:</strong> {getWeatherDescription(data.weathercode)}</p>
          <p><strong>Temperatura:</strong> {data.temperature} °C</p>
          <p><strong>Velocidad del viento:</strong> {data.windspeed} km/h</p>
          <p><strong>Dirección del viento:</strong> {data.winddirection}°</p>
        </div>
      )}

      {!isLoading && !data && !error && (
        <p style={{ color: '#666' }}>
          👉 Haz clic en cualquier parte del mapa para consultar la temperatura de esa zona.
        </p>
      )}
    </div>
  );
}