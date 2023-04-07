import { Prettify, RequiredDeep } from '@aws-amplify/ui';

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

interface CommmonDisplayText {
  headingText?: string;
  submitButtonText?: string;
}

type WithCommonDisplayText<
  T extends DisplayTextTemplate = DisplayTextTemplate
> = Prettify<CommmonDisplayText & DisplayText<T>>;

type SignInDisplayText = WithCommonDisplayText<{
  getFederatedProviderButtonText?: (provider: string) => string;
  linkResetPasswordText?: string;
  linkSignUpText?: string;
}>;
type ResetPasswordDisplayText = WithCommonDisplayText<{
  linkSignInText?: string;
}>;
type SignUpDisplayText = WithCommonDisplayText<{
  getFederatedProviderButtonText?: (provider: string) => string;
  linkSignInText?: string;
}>;

type SetupTotpDisplayText = WithCommonDisplayText<{
  getCopyTooltipText?: (hasCopied: boolean) => string;
  linkSignInText?: string;
}>;

export interface AuthenticatorDisplayText {
  forceNewPassword?: WithCommonDisplayText;
  confirmResetPassword?: WithCommonDisplayText;
  confirmSignIn?: WithCommonDisplayText;
  confirmSignUp?: WithCommonDisplayText;
  confirmVerifyUser?: WithCommonDisplayText;
  verifyUser?: WithCommonDisplayText;

  // type complete
  resetPassword?: ResetPasswordDisplayText;
  setupTOTP?: SetupTotpDisplayText;
  signIn?: SignInDisplayText;
  signUp?: SignUpDisplayText;
}

export type DefaultAuthenticatorDisplayText =
  RequiredDeep<AuthenticatorDisplayText>;

export const defaultDisplayText: DefaultAuthenticatorDisplayText = {
  confirmResetPassword: {
    headingText: 'Force Reset Password',
    submitButtonText: 'FIND MY VALUE',
  },
  confirmSignIn: {
    headingText: 'Confirm Sign In',
    submitButtonText: 'FIND MY VALUE',
  },
  confirmSignUp: {
    headingText: 'Confirm Sign Up',
    submitButtonText: 'FIND MY VALUE',
  },
  confirmVerifyUser: {
    // @todo improve heading text
    headingText: 'Confirm Verify User',
    submitButtonText: 'FIND MY VALUE',
  },
  forceNewPassword: {
    headingText: 'Force Reset Password',
    submitButtonText: 'FIND MY VALUE',
  },
  resetPassword: {
    headingText: 'Reset Password',
    linkSignInText: 'Sign In',
    submitButtonText: 'Send Code',
  },
  setupTOTP: {
    getCopyTooltipText: (hasCopied) => (hasCopied ? 'Copied!' : 'Copy'),
    headingText: 'Setup TOTP',
    linkSignInText: 'Sign In',
    submitButtonText: 'Confirm',
  },
  signIn: {
    getFederatedProviderButtonText: (provider: string): string =>
      `Sign In with ${provider}`,
    headingText: 'Sign In',
    linkResetPasswordText: 'Forgot Password',
    linkSignUpText: 'Create Account',
    submitButtonText: 'Sign In',
  },
  signUp: {
    getFederatedProviderButtonText: (provider: string): string =>
      `Sign Up with ${provider}`,
    headingText: 'Create Account',
    linkSignInText: 'Sign In',
    submitButtonText: 'Create Account',
  },
  verifyUser: {
    // @todo improve heading text
    headingText: 'Verify User',
    submitButtonText: 'FIND MY VALUE',
  },
};
