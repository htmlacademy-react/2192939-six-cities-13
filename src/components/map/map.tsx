import { City, Offer, Offers } from '../../types/types';
import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../settings';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offers;
  selectedPlace?: Offer;
};

function setIcon(urlMarker: string) {
  return new Icon({
    iconUrl: urlMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
}

const defaultCustomIcon = setIcon(URL_MARKER_DEFAULT);

const currentCustomIcon = setIcon(URL_MARKER_CURRENT);

export default function Map({
  city,
  offers,
  selectedPlace,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedPlace && selectedPlace.id === offer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPlace]);

  return <div style={{ width: '100%', height: '100%' }} ref={mapRef} />;
}
