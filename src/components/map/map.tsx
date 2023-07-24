import { TCity, TOffer, TOffers } from '../../types/offers';
import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../settings';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type TMapProps = {
  city: TCity;
  offers: TOffers;
  selectedPlace?: TOffer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map({
  city,
  offers,
  selectedPlace = undefined,
}: TMapProps): JSX.Element {
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
            selectedPlace !== undefined && selectedPlace.id === offer.id
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
