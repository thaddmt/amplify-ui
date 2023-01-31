import React, { useEffect, useRef } from 'react';
// import maplibregl from 'maplibre-gl';

import AmplifyMapLibre from 'maplibre-gl-js-amplify'; // 173.8

import { LocationSearchProps } from '@maplibre/maplibre-gl-geocoder'; // not a real package
import { useControl, useMap } from 'react-map-gl';
import type { IControl } from 'react-map-gl';

import { useGeoContext } from '../GeoProvider';

const LOCATION_SEARCH_OPTIONS = {
  // maplibregl, // do we need this?
  marker: { color: '#3FB1CE' },
  popup: true,
  showResultMarkers: { color: '#3FB1CE' },
  showResultsWhileTyping: true,
};

const LOCATION_SEARCH_CONTAINER = 'geocoder-container';

type AmplifyLocationSearch = IControl & {
  addTo: (container: string) => void;
};

interface ExtendedLocationSearchProps extends LocationSearchProps {
  amplifyMapLibre: typeof AmplifyMapLibre;
}

const LocationSearchControl = ({
  amplifyMapLibre: { createAmplifyGeocoder },
  position = 'top-right',
  ...props
}: ExtendedLocationSearchProps) => {
  useControl(
    () => createAmplifyGeocoder(props) as unknown as AmplifyLocationSearch,
    {
      position,
    }
  );

  return null;
};

const LocationSearchStandalone = ({
  amplifyMapLibre: { createAmplifyGeocoder },
  ...props
}: ExtendedLocationSearchProps) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      (createAmplifyGeocoder(props) as unknown as AmplifyLocationSearch).addTo(
        `#${LOCATION_SEARCH_CONTAINER}`
      );

      hasMounted.current = true;
    }
  }, [createAmplifyGeocoder, props]);

  return <div id={LOCATION_SEARCH_CONTAINER} />;
};

/**
 * The `<LocationSearch>` component provides location search.
 *
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/geo#location-search)
 *
 * @example
 * // Used as a map control:
 * function App() {
 *   return (
 *     <MapView>
 *       <LocationSearch />
 *     </MapView>
 *   );
 * }
 *
 * @example
 * // Used as a standalone component:
 * function App() {
 *   return <LocationSearch />;
 * }
 */
export const LocationSearch = (props: LocationSearchProps): JSX.Element => {
  const { modules } = useGeoContext();
  const { current: map } = useMap();

  /**
   * This logic determines whether the LocationSearch exists as part of a Map component or if it is a standalone component.
   * The `useControl` hook inside `LocationSearchControl` from `react-map-gl` makes it easy to add a control to a map,
   * but throws an error if that map doesn't exist. If the map doesn't exist, the LocationSearch is mounted to a container
   * upon rendering inside the `LocationSearchStandalone`.
   */
  if (map) {
    return (
      <LocationSearchControl
        {...LOCATION_SEARCH_OPTIONS}
        {...modules}
        {...props}
      />
    );
  }

  return (
    <LocationSearchStandalone
      {...LOCATION_SEARCH_OPTIONS}
      {...modules}
      {...props}
    />
  );
};

export const Geocoder = LocationSearch;
