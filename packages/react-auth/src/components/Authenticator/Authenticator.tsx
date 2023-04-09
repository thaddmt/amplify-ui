import * as React from 'react';
import { configureComponent } from '@aws-amplify/ui';

import {
  AuthenticatorProvider as Provider,
  useAuthenticator,
  isAuthenticatorComponentRouteKey,
  useAuthenticatorInitMachine,
} from '@aws-amplify/ui-react-core-auth';

import { VERSION } from '../../version';

import { DEFAULT_AUTHENTICATOR_DISPLAY_TEXT } from './displayText';
import {
  ContainerView as DefaultContainerView,
  Fields as DefaultFields,
  Field,
  Form as DefaultForm,
  Heading as DefaultHeading,
  SubmitButton as DefaultSubmitButton,
  ErrorView as DefaultErrorView,
  LinkView as DefaultLinkView,
  getLinkButtonOptions,
  getFederatedProviderOptions,
  FederatedProviderView as DefaultFederatedProviderView,
  SubHeading as DefaultSubHeading,
  TOTPView as DefaultTOTPView,
} from './ui';
import { getDefaultFields } from './utils';
import { AuthenticatorProps } from './types';

// type RouteLinkButtonProps<Route extends AuthenticatorRoute> = Route extends
//   | 'signIn'
//   | 'signUp'
//   | 'resetPassword'
//   | 'forceNewPassword'
//   ? LinkButtonProps[]
//   : undefined;

// `AuthenticatorInternal` exists to give access to the context returned via `useAuthenticator`,
// which allows the `Authenticator` to just return `children` if a user is authenticated.
// Once the `Provider` is removed from the `Authenticator` component and exported as
// `AuthenticatorProvider`, this component should be renamed to `Authenticator`.
export function AuthenticatorInternal({
  // hideSignUp,
  children,
  displayText: overrideDisplayText,
  ContainerView = DefaultContainerView,
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
  const { error, isPending, route, setNavigableRoute, submitForm } =
    useAuthenticator(({ error, isPending, route }) => [
      error,
      isPending,
      route,
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
    () => ({ ...overrideDisplayText, ...DEFAULT_AUTHENTICATOR_DISPLAY_TEXT }),
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
    // @todo any componentrecieving this needs to be wrapped forwardRef
    // return () => {
    // formRef.current?.reset();
    // };
  });

  const isAuthenticatedRoute = route === 'authenticated' || route === 'signOut';

  if (isAuthenticatedRoute) {
    if (!children) {
      return null;
    }

    return <>{children}</>;
  }

  if (!isAuthenticatorComponentRouteKey(route)) {
    return null;
  }

  const {
    getCopyButtonText,
    getHeadingText,
    getSubmitButtonText,
    getFederatedProviderButtonText,
    ...linkButtonDisplayText
  } = displayText;
  const submitButtonText = getSubmitButtonText(route);
  const headingText = getHeadingText(route);

  const hasFederatedProviders = route === 'signIn' || route === 'signUp';

  const totpProps = {
    copyButtonText: getCopyButtonText,
    totpSecretCode: 'Secret!',
    // totpSecretCode: undefined,
    totpIssuer: 'AWSCognito',
    totpUsername: 'username',
  };

  const links = getLinkButtonOptions({
    linkButtonDisplayText,
    route,
    setNavigableRoute,
  });
  const providers = hasFederatedProviders
    ? getFederatedProviderOptions(
        socialProviders,
        getFederatedProviderButtonText,
        (provider) => {
          // eslint-disable-next-line no-console
          console.log('provider', provider);
        }
      )
    : undefined;

  const handleSubmit = (data: Record<string, string>) => {
    // eslint-disable-next-line no-console
    console.log('Sbbbbbbbbmit', data);

    submitForm(data);
  };

  // const Override = components?.[route];
  // if (Override) {
  //   return <Override {...props} />;
  // }

  return (
    <ContainerView variation={variation}>
      {/* <CustomHeaderProp /> */}
      <Form onSubmit={handleSubmit} ref={formRef}>
        {/* <Heading level={3}>{headingText ?? calbbacl}</Heading> */}
        <DefaultHeading>{headingText}</DefaultHeading>
        <DefaultSubHeading>Sub title</DefaultSubHeading>
        <FederatedProviderView providerOptions={providers} />
        <TOTPView {...totpProps} />
        <DefaultFields fields={fields} />
        <ErrorView>{error}</ErrorView>
        <DefaultForm.ButtonControl type="submit">
          <SubmitButton isDisabled={isPending}>{submitButtonText}</SubmitButton>
        </DefaultForm.ButtonControl>
        <LinkView links={links} />
      </Form>
    </ContainerView>
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

Authenticator.ErrorView = DefaultErrorView;
Authenticator.Field = Field;
Authenticator.FederatedProviderView = DefaultFederatedProviderView;
Authenticator.Form = DefaultForm;
Authenticator.Heading = DefaultHeading;
Authenticator.Provider = Provider;
Authenticator.SubmitButton = DefaultSubmitButton;
Authenticator.SubHeading = DefaultSubHeading;
Authenticator.TOTPView = DefaultTOTPView;

// Authenticator.Container = ...;

// should these take children?
// Authenticator.Field = ...;
