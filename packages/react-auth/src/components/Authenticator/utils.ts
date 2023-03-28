import { AuthenticatorRoute, LoginMechanism } from '@aws-amplify/ui';

import {
  FieldOptions,
  // FieldControlProps
} from './Form';
import {
  PASSWORD,
  USERNAME_EMAIL,
  USERNAME_PHONE,
  PRIMARY_ALIAS,
  CONFIRM_PASSWORD,
} from './constants';

export const isSignInOrSignUpRoute = (route: string): boolean =>
  route === 'signIn' || route === 'signUp';

// type Validate = FieldControlProps['validate'];
// type Predicate = (value: string) => boolean;

// // const validators: Record<string, FieldControlProps['validate']> = {};

// const createValidate =
//   (predicate: Predicate, message: string): Validate =>
//   (value: string) =>
//     predicate(value) ? undefined : message;

// const requiredPredicate: Predicate = (value) => !!value;
// const lengthPredicate: Predicate = (value) => value?.length >= 8;

// const usernameRequired = createValidate(requiredPredicate, 'Username is required');

export function getDefaultFields<Route extends AuthenticatorRoute>({
  route,
  loginMechanism = 'phone_number',
}: {
  route: Route;
  loginMechanism?: LoginMechanism;
}): FieldOptions[] {
  switch (route) {
    case 'signIn': {
      // const username =
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
