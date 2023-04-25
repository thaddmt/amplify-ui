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
  loginMechanism = 'phone_number',
}: {
  route: Route;
  loginMechanism?: LoginMechanism;
}): CommonFieldOptions[] {
  switch (route) {
    case 'confirmSignIn':
      return [
        {
          label: 'Confirmation Code',
          name: 'confirmation_code',
          placeholder: 'Enter your Confirmation Code',
          type: 'text',
          autoComplete: 'one-time-code',
          isRequired: true,
        },
      ];
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
