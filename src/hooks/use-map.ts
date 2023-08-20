import { useRef, useState, useEffect, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/data-types';
import { MAP_OPTIONS_ATTRIBUTION, MAP_URL_TEMPLATE } from '../settings';

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(
        MAP_URL_TEMPLATE,
        {
          attribution: MAP_OPTIONS_ATTRIBUTION
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}
