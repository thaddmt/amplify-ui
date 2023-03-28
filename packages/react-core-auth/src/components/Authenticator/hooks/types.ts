import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

export type AuthenticatorRouteComponentKey =
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'forceNewPassword'
  | 'resetPassword'
  | 'setupTOTP'
  | 'signIn'
  | 'signUp'
  | 'verifyUser';

export type AuthenticatorRouteComponentName =
  Capitalize<AuthenticatorRouteComponentKey>;

/**
 * state machine context interface
 */
export type AuthenticatorMachineContext = AuthenticatorServiceFacade;
export type AuthenticatorMachineContextKey = keyof AuthenticatorMachineContext;
