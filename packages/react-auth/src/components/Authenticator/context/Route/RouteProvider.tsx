import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { RouteContext } from './RouteContext';

export default function RouteProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { route } = useAuthenticator(({ route }) => [route]);

  const value = React.useMemo(() => ({ route }), [route]);

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
}
