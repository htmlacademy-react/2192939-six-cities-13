import { City, FullOffer, Offers } from '../../types/data-types';
import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../settings';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { getActiveCard } from '../../store/app-data/selectors';
import mapStyles from './map.module.css';

type MapProps = {
  city: City;
  offers: Offers;
  fullOffer?: FullOffer;
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

export default function Map({ city, offers, fullOffer, }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const isMainPage = !fullOffer;

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

  return (
    <div
      className={`${mapStyles.map__common} ${isMainPage ? mapStyles.map__main : mapStyles.map__offer}`}
      ref={mapRef}
      data-testid='mapElement'
    />);
}
