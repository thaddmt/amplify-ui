import { capitalize } from '@aws-amplify/ui';
import { DefaultAuthenticatorDisplayText } from './types';

export const DEFAULT_AUTHENTICATOR_DISPLAY_TEXT: DefaultAuthenticatorDisplayText =
  {
    getCopyButtonText: (hasCopied) => (hasCopied ? 'Copied!' : 'Copy'),
    getFederatedProviderButtonText: (provider): string =>
      `Sign In with ${provider}`,
    getResetPasswordLinkText: () => 'Reset Password',
    getSignUpLinkText: () => 'Create Account',
    getHeadingText: (route) => capitalize(route),
    getSignInLinkText: () => 'Back to Sign In',
    getSubmitButtonText: () => 'Submit Button',
  };
