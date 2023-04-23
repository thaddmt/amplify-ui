import React from 'react';

import { useRoute } from '../useRoute';

import {
  isAuthenticatorComponentRouteKey,
  UseAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-core-auth';

import { NAVIGABLE_ROUTES } from './constants';
import { NavigableRoute } from '@aws-amplify/ui';

type UseLinks = { links: NavigableRoute[] | undefined } & Pick<
  UseAuthenticator,
  'setNavigableRoute'
>;

export default function useLinks(): UseLinks {
  const { setNavigableRoute } = useAuthenticator(({ setNavigableRoute }) => [
    setNavigableRoute,
  ]);
  const { route } = useRoute();

  const links = React.useMemo(
    () =>
      isAuthenticatorComponentRouteKey(route)
        ? NAVIGABLE_ROUTES[route]
        : undefined,
    [route]
  );

  return { links, setNavigableRoute };
}
