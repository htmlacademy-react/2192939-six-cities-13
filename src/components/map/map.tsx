import { City, FullOffer, Offers, StylesForMap } from '../../types/data-types';
import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../settings';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { getActiveCard } from '../../store/app-data/selectors';

type MapProps = {
  city: City;
  offers: Offers;
  styles: StylesForMap;
  fullOffer?: FullOffer | null;
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
  styles,
  fullOffer = null,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const selectedPlace = useAppSelector(getActiveCard);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom,
      );
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          selectedPlace && selectedPlace.id === offer.id
            ? currentCustomIcon
            : defaultCustomIcon
        ).addTo(markerLayer);
      });
      if (fullOffer) {
        const marker = new Marker({
          lat: fullOffer.location.latitude,
          lng: fullOffer.location.longitude,
        });
        marker.setIcon(currentCustomIcon).addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPlace, city, fullOffer]);

  return <div style={styles} ref={mapRef} />;
}
