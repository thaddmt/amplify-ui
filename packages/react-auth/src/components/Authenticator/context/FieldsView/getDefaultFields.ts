import { AuthenticatorRoute, LoginMechanism } from '@aws-amplify/ui';

import {
  PASSWORD,
  USERNAME_EMAIL,
  USERNAME_PHONE,
  PRIMARY_ALIAS,
  CONFIRM_PASSWORD,
} from './constants';
import { CommonFieldOptions } from './types';

export default function getDefaultFields<Route extends AuthenticatorRoute>({
  route,
  loginMechanism = 'phone_number',
}: {
  route: Route;
  loginMechanism?: LoginMechanism;
}): CommonFieldOptions[] {
  switch (route) {
    case 'signIn': {
      return [PRIMARY_ALIAS[loginMechanism], PASSWORD];
    }
    case 'signUp': {
      return [PRIMARY_ALIAS[loginMechanism], PASSWORD, CONFIRM_PASSWORD];
    }
    case 'resetPassword': {
      return [
        loginMechanism === 'phone_number' ? USERNAME_PHONE : USERNAME_EMAIL,
        PASSWORD,
      ];
    }
    default:
      return [];
  }
}
