import { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './map.css';
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map = ({ location }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(12);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  function formatString(inputString, separator) {
    if (!inputString || typeof inputString !== 'string') {
        
        return ''; 
    }
    return inputString.replace(/\s+/g, separator);
  }

  let query = formatString(location, '-')

  useEffect(() => {
    const getLatAndLong = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.length > 0) {
          setLatitude(data[0].lat);
          setLongitude(data[0].lon);
        } else {
          console.error('No results found for the location:', location);
        }
      } catch (error) {
        console.error('Error getting map coordinates from given location:', error);
      }
    };

    getLatAndLong();
  }, [location]);

  useEffect(() => {
    if (!latitude || !longitude || map.current) return;

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(latitude, longitude),
      zoom: zoom
    });

    const mtLayer = new MaptilerLayer({
      apiKey: `${apiKey}`,
    }).addTo(map.current);

    // Create a custom icon using the SVG markup
    const customIcon = L.icon({
      iconUrl: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>',
      iconSize: [46, 56],
      iconAnchor: [23, 56],
    });

    // Create a marker with the custom icon at the specified coordinates
    L.marker([latitude, longitude], { icon: customIcon }).addTo(map.current);
    
    return () => {
      map.current.remove();
    };
  }, [latitude, longitude, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default Map;
