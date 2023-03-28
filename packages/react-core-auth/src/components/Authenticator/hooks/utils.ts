import { AuthenticatorRoute } from '@aws-amplify/ui';

import { COMPONENT_ROUTE_KEYS } from './constants';
import { AuthenticatorRouteComponentKey } from './types';

export const isComponentRouteKey = (
  route: AuthenticatorRoute
): route is AuthenticatorRouteComponentKey =>
  COMPONENT_ROUTE_KEYS.some((componentRoute) => componentRoute === route);
