import { Prettify, RequiredDeep } from '@aws-amplify/ui';
import { AuthenticatorRouteComponentKey } from '@aws-amplify/ui-react-core';

// @todo do template types go in react-core or ui?
type GetDisplayTextKey = `get${string}Text`;
type DisplayTextKey = `${string}Text`;

type DisplayTextTemplate = Record<GetDisplayTextKey | DisplayTextKey, any>;
type DisplayText<T extends DisplayTextTemplate = DisplayTextTemplate> = {
  [K in keyof T]: K extends GetDisplayTextKey
    ? (value: Parameters<T[K]>[0]) => string
    : K extends DisplayTextKey
    ? string
    : never;
};

type TypedDisplayText<T extends DisplayTextTemplate = DisplayTextTemplate> =
  Prettify<DisplayText<T>>;

// Template types end here
type GetCopyButtonText = (hasCopied: boolean) => string;

type GetFederatedProviderButtonText = (provider: string) => string;

type GetSubmitButtonText = (route: AuthenticatorRouteComponentKey) => string;

type GetHeadingText = (route: AuthenticatorRouteComponentKey) => string;

type GetSignInLinkText = (
  route: 'resetPassword' | 'signUp' | 'setupTOTP'
) => string;

type GetResetPasswordLinkText = (route: 'signIn') => string;

type GetSignUpLinkText = (route: 'signIn') => string;

export type AuthenticatorDisplayText = TypedDisplayText<{
  getCopyButtonText?: GetCopyButtonText;
  getFederatedProviderButtonText?: GetFederatedProviderButtonText;
  getHeadingText?: GetHeadingText;
  getResetPasswordLinkText: GetResetPasswordLinkText;
  getSignInLinkText?: GetSignInLinkText;
  getSignUpLinkText?: GetSignUpLinkText;
  getSubmitButtonText?: GetSubmitButtonText;
}>;

export type DefaultAuthenticatorDisplayText =
  RequiredDeep<AuthenticatorDisplayText>;
