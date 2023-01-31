import React, { createContext, useContext, useMemo } from 'react';

import * as MapLibreGl from 'maplibre-gl'; // 724.7
import * as AmplifyMapLibre from 'maplibre-gl-js-amplify'; // 173.8

type GeoModules = {
  amplifyMapLibre: typeof AmplifyMapLibre;
  mapLibreGl: typeof MapLibreGl;
};

type GeoContextType = { modules: GeoModules };

export interface GeoProviderProps extends GeoContextType {
  children: React.ReactNode;
}

const GeoContext = createContext<GeoContextType | null>(null);

export default function GeoProvider({
  children,
  modules: { amplifyMapLibre, mapLibreGl },
}: GeoProviderProps): JSX.Element {
  const value = useMemo(
    () => ({ modules: { amplifyMapLibre, mapLibreGl } }),
    [amplifyMapLibre, mapLibreGl]
  );
  return <GeoContext.Provider value={value}>{children}</GeoContext.Provider>;
}

export const useGeoContext = (): GeoContextType => {
  const context = useContext(GeoContext);
  if (!context) {
    throw new Error('no context');
  }

  if (!context.modules?.amplifyMapLibre) {
    throw new Error('no amplifyMapLibre');
  }

  if (!context.modules?.mapLibreGl) {
    throw new Error('no mapLibreGl');
  }

  return context;
};
