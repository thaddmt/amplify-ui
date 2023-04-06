import * as React from 'react';
import {
  AuthenticatorMachineOptions,
  AuthenticatorRoute,
  AmplifyUser,
  configureComponent,
  isFunction,
  Prettify,
  RequiredDeep,
} from '@aws-amplify/ui';

import {
  AuthenticatorProvider as Provider,
  useAuthenticator,
  UseAuthenticator,
  isAuthenticatorComponentRouteKey,
  // useAuthenticatorProps,
  // UseAuthenticatorProps,
  useAuthenticatorInitMachine,
  AuthenticatorRouteComponentKey,
} from '@aws-amplify/ui-react-core-auth';

import { Heading } from '@aws-amplify/ui-react';

import { VERSION } from '../../version';

import { Container as DefaultContainer, ContainerComponent } from './Container';
import {
  FieldOptions,
  Fields as DefaultFields,
  Field,
  Form as DefaultForm,
  FormComponent,
  SubmitButton as DefaultSubmitButton,
  SubmitButtonComponent,
} from './Form';
import { ErrorView as DefaultErrorView, ErrorViewComponent } from './ErrorView';
import {
  LinkView as DefaultLinkView,
  LinkButtonProps,
  LinkViewComponent,
} from './LinkView';
import {
  getFederatedProviderOptions,
  FederatedProviderView as DefaultFederatedProviderView,
  FederatedProviderViewComponent,
} from './FederatedProviderView';
import { TOTPView as DefaultTOTPView, TOTPViewComponent } from './TOTPView';
import { getDefaultFields } from './utils';

export type Fields = Partial<
  Record<
    AuthenticatorRouteComponentKey,
    FieldOptions[] | ((fields: FieldOptions[]) => FieldOptions[])
  >
>;

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

interface AuthenticatorDisplayText {
  forceNewPassword?: WithCommonDisplayText;
  confirmResetPassword?: WithCommonDisplayText;
  confirmSignIn?: WithCommonDisplayText;
  confirmSignUp?: WithCommonDisplayText;
  confirmVerifyUser?: WithCommonDisplayText;
  verifyUser?: WithCommonDisplayText;

  resetPassword?: ResetPasswordDisplayText;
  setupTOTP?: SetupTotpDisplayText;
  signIn?: SignInDisplayText;
  signUp?: SignUpDisplayText;
}

type DefaultAuthenticatorDisplayText = RequiredDeep<AuthenticatorDisplayText>;

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

export type SignOut = UseAuthenticator['signOut'];
export type AuthenticatorProps = Partial<AuthenticatorMachineOptions> & {
  children?:
    | React.ReactNode
    | ((props: { signOut?: SignOut; user?: AmplifyUser }) => JSX.Element);
  displayText?: AuthenticatorDisplayText;
  // fields?: Fields;

  Container?: ContainerComponent;
  Form?: FormComponent;
  ErrorView?: ErrorViewComponent;
  LinkView?: LinkViewComponent;
  SubmitButton?: SubmitButtonComponent;
  FederatedProviderView?: FederatedProviderViewComponent;
  TOTPView?: TOTPViewComponent;

  variation?: 'default' | 'modal';
};

// type RouteLinkButtonProps<Route extends AuthenticatorRoute> = Route extends
//   | 'signIn'
//   | 'signUp'
//   | 'resetPassword'
//   | 'forceNewPassword'
//   ? LinkButtonProps[]
//   : undefined;

function getLinks<Route extends AuthenticatorRoute>({
  displayText,
  route,
  setNavigableRoute,
}: {
  displayText: DefaultAuthenticatorDisplayText;
  route: Route;
  setNavigableRoute: UseAuthenticator['setNavigableRoute'];
}): LinkButtonProps[] | undefined {
  if (!isAuthenticatorComponentRouteKey(route)) {
    return undefined;
  }

  switch (route) {
    case 'resetPassword': {
      const { linkSignInText } = displayText.resetPassword;

      const buttons: LinkButtonProps[] = [
        {
          children: linkSignInText,
          key: 'signIn',
          onClick: () => setNavigableRoute('signIn'),
        },
      ];

      return buttons;
    }
    case 'signIn': {
      const { linkResetPasswordText, linkSignUpText } = displayText.signIn;

      const buttons: LinkButtonProps[] = [
        {
          children: linkResetPasswordText,
          key: 'resetPassword',
          onClick: () => setNavigableRoute('resetPassword'),
        },
        {
          children: linkSignUpText,
          key: 'signUp',
          onClick: () => setNavigableRoute('signUp'),
        },
      ];

      return buttons;
    }
    case 'setupTOTP': {
      const { linkSignInText } = displayText.setupTOTP;
      const buttons: LinkButtonProps[] = [
        {
          children: linkSignInText,
          key: 'signIn',
          onClick: () => setNavigableRoute('signIn'),
        },
      ];

      return buttons;
    }
    case 'signUp': {
      const { linkSignInText } = displayText.signUp;

      const buttons: LinkButtonProps[] = [
        {
          children: linkSignInText,
          key: 'signIn',
          onClick: () => setNavigableRoute('signIn'),
        },
      ];

      return buttons;
    }
    default: {
      return [];
    }
  }
}

// `AuthenticatorInternal` exists to give access to the context returned via `useAuthenticator`,
// which allows the `Authenticator` to just return `children` if a user is authenticated.
// Once the `Provider` is removed from the `Authenticator` component and exported as
// `AuthenticatorProvider`, this component should be renamed to `Authenticator`.
export function AuthenticatorInternal({
  // hideSignUp,
  children,
  displayText: overrideDisplayText,
  Container = DefaultContainer,
  ErrorView = DefaultErrorView,
  FederatedProviderView = DefaultFederatedProviderView,
  Form = DefaultForm,
  formFields,
  initialState,
  LinkView = DefaultLinkView,
  loginMechanisms,
  TOTPView = DefaultTOTPView,
  services,
  signUpAttributes,
  socialProviders,
  SubmitButton = DefaultSubmitButton,
  variation,
}: AuthenticatorProps): JSX.Element | null {
  // @todo rename error to submitError (or similar)?
  const {
    error,
    isPending,
    route,
    setNavigableRoute,
    signOut,
    submitForm,
    user,
  } = useAuthenticator(({ error, isPending, route, signOut, user }) => [
    error,
    isPending,
    route,
    signOut,
    user,
  ]);

  React.useEffect(() => {
    configureComponent({
      packageName: '@aws-amplify/ui-react',
      version: VERSION,
    });
  }, []);

  useAuthenticatorInitMachine({
    initialState,
    // @todo how to surface this back to the UI for passing to getDefaultFields
    loginMechanisms,
    services,
    signUpAttributes,
    socialProviders,
    formFields,
  });

  // const props = useAuthenticatorProps({ route });

  const displayText = React.useMemo(
    () => ({ ...overrideDisplayText, ...defaultDisplayText }),
    [overrideDisplayText]
  );

  const fields = React.useMemo(
    () => getDefaultFields({ route, loginMechanism: loginMechanisms?.[0] }),
    [route, loginMechanisms]
  );

  const formRef = React.useRef<React.ElementRef<typeof DefaultForm>>(null);

  // @todo clear `Form` on initial mount or unmount
  // @todo prevemt reset on submit events
  React.useEffect(() => {
    // return () => {
    // formRef.current?.reset();
    // };
  });

  const isAuthenticatedRoute = route === 'authenticated' || route === 'signOut';

  if (isAuthenticatedRoute) {
    if (!children) {
      return null;
    }

    return (
      <>
        {isFunction(children)
          ? // @todo remove render props
            children({ signOut, user }) // children is a render prop
          : children}
      </>
    );
  }

  if (!isAuthenticatorComponentRouteKey(route)) {
    return null;
  }

  // const Override = components?.[route];
  // if (Override) {
  //   return <Override {...props} />;
  // }

  const { headingText, submitButtonText } = displayText[route];

  const renderQRCode = route === 'setupTOTP';
  const renderFederatedProviders = route === 'signIn' || route === 'signUp';
  const handleSubmit = (data: Record<string, string>) => {
    // eslint-disable-next-line no-console
    console.log('Sbbbbbbbbmit', data);

    submitForm(data);
  };

  return (
    <Container variation={variation}>
      {/* <CustomHeaderProp /> */}
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Heading level={3}>{headingText}</Heading>
        {renderFederatedProviders ? (
          <FederatedProviderView
            providerOptions={getFederatedProviderOptions(
              ['amazon'],
              displayText[route].getFederatedProviderButtonText,
              (provider) => {
                // eslint-disable-next-line no-console
                console.log('provider', provider);
              }
            )}
          />
        ) : null}
        {renderQRCode ? (
          <TOTPView
            copyTooltipText={displayText[route].getCopyTooltipText}
            totpSecretCode="Secret!"
            totpIssuer="AWSCognito"
            totpUsername="username"
          />
        ) : null}
        <DefaultFields fields={fields} />
        <ErrorView>{error}</ErrorView>
        <DefaultForm.ButtonControl type="submit">
          <SubmitButton isDisabled={isPending}>{submitButtonText}</SubmitButton>
        </DefaultForm.ButtonControl>
        <LinkView links={getLinks({ displayText, route, setNavigableRoute })} />
      </Form>
    </Container>
  );
}

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator)
 */
export function Authenticator(props: AuthenticatorProps): JSX.Element {
  return (
    <Provider>
      <AuthenticatorInternal {...props} />
    </Provider>
  );
}

Authenticator.Provider = Provider;
Authenticator.Field = Field;
Authenticator.Form = DefaultForm;
Authenticator.ErrorView = DefaultErrorView;
Authenticator.SubmitButton = DefaultSubmitButton;
Authenticator.TOTPView = DefaultTOTPView;
Authenticator.FederatedProviderView = DefaultFederatedProviderView;

// Authenticator.Container = ...;

// should these take children?
// Authenticator.Field = ...;
