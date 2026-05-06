import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useMap} from '../../hooks/use-map';
import {City, Offer, FullOffer} from '../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, MARKER_SIZE, MIN_MAP_HEIGHT} from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: (Offer | FullOffer)[];
  selectedOffer: Offer | FullOffer | null;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [MARKER_SIZE.Width, MARKER_SIZE.Height],
  iconAnchor: [MARKER_SIZE.AnchorWidth, MARKER_SIZE.AnchorHeight]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [MARKER_SIZE.Width, MARKER_SIZE.Height],
  iconAnchor: [MARKER_SIZE.AnchorWidth, MARKER_SIZE.AnchorHeight]
});

export function Map({city, offers, selectedOffer, className}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      map.invalidateSize();
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== null && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, city, offers, selectedOffer, city.location.latitude, city.location.longitude, city.location.zoom]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
      style={{height: '100%', minHeight: MIN_MAP_HEIGHT}}
    />
  );
}
