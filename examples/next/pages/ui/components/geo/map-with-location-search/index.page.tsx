import * as amplifyMapLibre from 'maplibre-gl-js-amplify'; // 173.8
import * as mapLibreGl from 'maplibre-gl'; // 724.7

import { GeoProvider, MapView, LocationSearch } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function MapWithLocationSearch() {
  return (
    <GeoProvider modules={{ amplifyMapLibre, mapLibreGl }}>
      <MapView>
        <LocationSearch />
      </MapView>
    </GeoProvider>
  );
}
