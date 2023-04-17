import { NavigationRoute, Prettify, RequiredDeep } from '@aws-amplify/ui';
import { AuthenticatorRouteComponentKey } from '@aws-amplify/ui-react-core';

// @todo do template types go in /ui-react-core or /ui?
type GetDisplayTextKey = `get${string}Text`;
type DisplayTextKey = `${string}Text`;

type Template = Record<GetDisplayTextKey | DisplayTextKey, any>;
type TypedDisplayText<T extends Template = Template> = Prettify<{
  [K in keyof T]: K extends GetDisplayTextKey
    ? (value: Parameters<T[K]>[0]) => string
    : K extends DisplayTextKey
    ? string
    : never;
}>;

// Template types end here
type GetCopyButtonText = (hasCopied: boolean) => string;

type GetFederatedProviderButtonText = (provider: string) => string;

type GetSubmitButtonText = (route: AuthenticatorRouteComponentKey) => string;

type GetHeadingText = (route: AuthenticatorRouteComponentKey) => string;

type GetSubHeadingText = (route: AuthenticatorRouteComponentKey) => string;

type GetSignInLinkText = (route: NavigationRoute) => string;

type GetResetPasswordLinkText = (route: NavigationRoute) => string;

type GetSignUpLinkText = (route: NavigationRoute) => string;

/**
 * Authenticator display text
 */
export type DisplayText = TypedDisplayText<{
  getCopyButtonText?: GetCopyButtonText;
  getFederatedProviderButtonText?: GetFederatedProviderButtonText;
  getHeadingText?: GetHeadingText;
  getResetPasswordLinkText?: GetResetPasswordLinkText;
  getSignInLinkText?: GetSignInLinkText;
  getSignUpLinkText?: GetSignUpLinkText;
  getSubHeadingText?: GetSubHeadingText;
  getSubmitButtonText?: GetSubmitButtonText;
}>;

export type DefaultDisplayText = RequiredDeep<DisplayText>;

export interface DisplayTextProviderProps {
  children?: React.ReactNode;
  displayText?: DisplayText;
}
