import { AuthenticatorRoute, LoginMechanism } from '@aws-amplify/ui';

import {
  CONFIRM_PASSWORD,
  DIAL_CODE,
  PASSWORD,
  PRIMARY_ALIAS,
  USERNAME_EMAIL,
  USERNAME_PHONE,
} from './constants';
import { CommonFieldOptions } from './types';

export default function getDefaultFields<Route extends AuthenticatorRoute>({
  route,
  loginMechanism = 'username',
}: {
  route: Route;
  loginMechanism?: LoginMechanism;
}): CommonFieldOptions[] {
  switch (route) {
    case 'signIn': {
      return [
        ...(loginMechanism === 'phone_number'
          ? [USERNAME_PHONE, DIAL_CODE]
          : [PRIMARY_ALIAS[loginMechanism]]),
        PASSWORD,
      ];
    }
    case 'signUp': {
      return [
        ...(loginMechanism === 'phone_number'
          ? [USERNAME_PHONE, DIAL_CODE]
          : [PRIMARY_ALIAS[loginMechanism]]),
        PASSWORD,
        CONFIRM_PASSWORD,
      ];
    }
    case 'resetPassword': {
      return [
        ...(loginMechanism === 'phone_number'
          ? [USERNAME_PHONE, DIAL_CODE]
          : [PRIMARY_ALIAS[loginMechanism]]),
        PASSWORD,
      ];
    }
    default:
      return [];
  }
}
