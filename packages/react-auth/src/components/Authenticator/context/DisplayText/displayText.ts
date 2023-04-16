import { capitalize } from '@aws-amplify/ui';
import { DefaultDisplayText } from './types';

export const DEFAULT_AUTHENTICATOR_DISPLAY_TEXT: DefaultDisplayText = {
  getCopyButtonText: (hasCopied) => (hasCopied ? 'Copied!' : 'Copy'),
  getFederatedProviderButtonText: (provider): string =>
    `Sign In with ${provider}`,
  getResetPasswordLinkText: () => 'Reset Password',
  getSignUpLinkText: () => 'Create Account',
  getHeadingText: (route) => capitalize(route),
  getSignInLinkText: () => 'Back to Sign In',
  getSubHeadingText: (route) => `${route} Sub Heading`,
  getSubmitButtonText: () => 'Submit Button',
};
