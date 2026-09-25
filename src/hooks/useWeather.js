import { useState } from 'react';

//aquí se maneja los estados en los que estará la pagina para el clima, si está cargando, si hay error o si hay datos.

export function useWeather() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lng) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
      );

      if (!response.ok) {
        throw new Error('No se pudo obtener la información del clima');
      }

      const result = await response.json();
      
      // La API entrega el clima actual dentro del objeto 'current_weather'
      setData(result.current_weather);
    } catch (err) {
      setError(err.message || 'Error al conectar con el servicio');
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchWeather };
}