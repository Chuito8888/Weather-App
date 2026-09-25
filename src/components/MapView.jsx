import { useEffect, useState} from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents, useMap } from 'react-leaflet';

//Aquí contiene todo lo relacionado con el mapa, para apartarlo de la lógica global de la app

//Se define el centro por defecto donde aparecerá el mapa, en este caso Pto. Montt
const defaultCenter = [-41.469, -72.942];

function MapClickHandler({ onLocationSelect }) {
    useMapEvents({
        //Se guardan las coordenadas al hacer click
        click(e) {
            const {lat, lng} = e.latlng;
            onLocationSelect({lat, lng});
        },
    });
    return null 
}

function AutomaticLocation({ setInitialLocation }) {
    const map = useMap(); //acceso al mapa

    useEffect(() => {
        map.locate({ setView: true, maxZoom: 13}).on('locationfound', function (e) {
            setInitialLocation(e.latlng);
        });
    }, [map, setInitialLocation]);

    return null;
}

export default function MapView({ onLocationSelect, selectedCoords }) {
  // Estado local para guardar si ya intentamos geolocalizar
  const [initialLocationAttempted, setInitialLocationAttempted] = useState(false);

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Captura clicks */}
        <MapClickHandler onLocationSelect={onLocationSelect} />
        
        {/* Geolocalización automática al inicio */}
        {!initialLocationAttempted && (
          <AutomaticLocation setInitialLocation={(coords) => {
            // También notificamos a App.jsx si se encuentra la ubicación inicial
            onLocationSelect(coords);
            setInitialLocationAttempted(true);
          }} />
        )}

        {/* 4. Mostrar CircleMarker donde se hizo click */}
        {selectedCoords && (
          <CircleMarker 
            center={[selectedCoords.lat, selectedCoords.lng]} 
            radius={8}
            pathOptions={{ color: 'orange', fillColor: 'orange', fillOpacity: 0.7 }}
          >
            <Popup>
              Ubicación seleccionada: <br />
              Lat: {selectedCoords.lat.toFixed(4)} <br />
              Lon: {selectedCoords.lng.toFixed(4)}
            </Popup>
          </CircleMarker>
        )}
      </MapContainer>
    </div>
  );
}
