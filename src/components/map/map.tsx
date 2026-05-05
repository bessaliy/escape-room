import {ReactElement, useEffect, useRef} from 'react';
import leaflet, {Map as LeafletMap, LayerGroup} from 'leaflet';
import {Booking, Location} from '../../types/booking.ts';
import {MAP_DEFAULT_COORDINATES} from '../../const.ts';

type MapProps = {
  bookings: Booking[];
  selectedLocation?: Location | null;
  onMarkerClick?: (location: Location) => void;
}

const defaultIcon = leaflet.icon({
  iconUrl: '/img/svg/pin-default.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = leaflet.icon({
  iconUrl: '/img/svg/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({bookings, selectedLocation, onMarkerClick}: MapProps): ReactElement {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<LeafletMap | null>(null);
  const markersLayerRef = useRef<LayerGroup | null>(null);
  const defaultCoords: [number, number] = bookings[0]?.location.coords ?? MAP_DEFAULT_COORDINATES;

  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) {
      return;
    }

    map.setView(
      [defaultCoords[0], defaultCoords[1]],
      10
    );
  }, [defaultCoords]);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) {
      return;
    }

    const map = leaflet.map(mapRef.current, {
      center: [defaultCoords[0], defaultCoords[1]],
      zoom: 10,
    });
    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      })
      .addTo(map);

    leafletMapRef.current = map;
    markersLayerRef.current = leaflet.layerGroup().addTo(map);

    return () => {
      map.remove();
      leafletMapRef.current = null;
    };

  }, [defaultCoords]);

  useEffect(() => {
    const layer = markersLayerRef.current;

    if (!layer) {
      return;
    }

    layer.clearLayers();

    bookings.forEach((booking) => {
      const marker = leaflet.marker(
        [booking.location.coords[0], booking.location.coords[1]],
        {
          icon: selectedLocation?.address === booking.location.address ? activeIcon : defaultIcon,
        });
      marker.on('click', () => {
        onMarkerClick?.(booking.location);
      });

      marker.addTo(layer);
    });
  }, [bookings, selectedLocation, onMarkerClick]);

  return (
    <div className='map'>
      <div className="map__container" ref={mapRef} />
    </div>
  );
}
export default Map;
