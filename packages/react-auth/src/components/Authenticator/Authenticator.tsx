import * as React from 'react';
import { configureComponent } from '@aws-amplify/ui';

import {
  AuthenticatorProvider as Provider,
  useAuthenticator,
  isAuthenticatorComponentRouteKey,
  useAuthenticatorInitMachine,
} from '@aws-amplify/ui-react-core-auth';

import { VERSION } from '../../version';

import { DisplayTextProvider, RouteContext } from './context';
import {
  DEFAULT_AUTHENTICATOR_DISPLAY_TEXT,
  withErrorView,
  withFederatedProviderView,
  withLinkView,
  withTOTPView,
} from './context';
import {
  ContainerView as DefaultContainerView,
  Fields as DefaultFields,
  Field,
  Form as DefaultForm,
  Heading as DefaultHeading,
  SubmitButton as DefaultSubmitButton,
  ErrorView as BaseErrorView,
  LinkView as BaseLinkView,
  FederatedProviderView as BaseFederatedProviderView,
  SubHeading as DefaultSubHeading,
  TOTPView as TOTPViewPrimitive,
} from './ui';
import { getDefaultFields } from './utils';
import { AuthenticatorProps } from './types';

// const createAUthenticator = ({ views, options }) => {
//   const DefaultTOTPView = createTOTPView(TOTPViewPrimitive);

//   Authenticator
// }

const DefaultLinkView = withLinkView(BaseLinkView);
const DefaultErrorView = withErrorView(BaseErrorView);
const DefaultTOTPView = withTOTPView(TOTPViewPrimitive);
const DefaultFederatedProviderView = withFederatedProviderView(
  BaseFederatedProviderView
);

export function AuthenticatorInternal({
  // @todo create example showing how to do this without prop
  // hideSignUp,
  children,
  displayText: overrideDisplayText,
  ContainerView: OverrideContainerView,
  // ErrorView = DefaultErrorView,
  // FederatedProviderView = DefaultFederatedProviderView,
  Form = DefaultForm,
  formFields,
  initialState,
  // LinkView = DefaultLinkView,
  loginMechanisms,
  TOTPView: OverrideTOTPView,
  services,
  signUpAttributes,
  socialProviders,
  SubmitButton = DefaultSubmitButton,
  variation,
}: AuthenticatorProps): JSX.Element | null {
  const { ContainerView, TOTPView } = React.useMemo(
    () => ({
      ContainerView: OverrideContainerView ?? DefaultContainerView,
      TOTPView: OverrideTOTPView
        ? withTOTPView(OverrideTOTPView)
        : DefaultTOTPView,
    }),
    [OverrideContainerView, OverrideTOTPView]
  );

  const { isPending, route, submitForm } = useAuthenticator(
    ({ error, isPending, route }) => [error, isPending, route]
  );

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

  const displayTextValue = React.useMemo(
    () => ({ ...DEFAULT_AUTHENTICATOR_DISPLAY_TEXT, ...overrideDisplayText }),
    [overrideDisplayText]
  );
  const routeValue = React.useMemo(
    () => (isAuthenticatorComponentRouteKey(route) ? { route } : null),
    [route]
  );

  // const props = useAuthenticatorProps({ route });

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

  const { getSubmitButtonText } = displayTextValue;
  const submitButtonText = getSubmitButtonText(route);

  const totpProps = {
    totpSecretCode: 'Secret!',
    // totpSecretCode: undefined,
    totpIssuer: 'AWSCognito',
    totpUsername: 'username',
  };

  const handleSubmit = (data: Record<string, string>) => {
    // eslint-disable-next-line no-console
    console.log('Sbbbbbbbbmit', data);

    submitForm(data);
  };

  // eslint-disable-next-line no-console
  console.count('A.Render');

  // const Override = components?.[route];
  // if (Override) {
  //   // @todo "props" will match the context value that is passed to ContainerView Context
  //   // DisplayTextProvider and RouteContext.Provider will wrap both
  //   return <Override {...props} />;
  // }

  return (
    <RouteContext.Provider value={routeValue}>
      <DisplayTextProvider value={displayTextValue}>
        <ContainerView route={route} variation={variation}>
          {/* <CustomHeaderProp /> */}

          <Form onSubmit={handleSubmit} ref={formRef}>
            <DefaultHeading />
            <DefaultSubHeading />
            <DefaultFederatedProviderView providers={['amazon']} />
            <TOTPView {...totpProps} />
            <DefaultFields fields={fields} />
            <DefaultErrorView />
            <DefaultForm.ButtonControl type="submit">
              <SubmitButton isDisabled={isPending}>
                {submitButtonText}
              </SubmitButton>
            </DefaultForm.ButtonControl>
            <DefaultLinkView />
          </Form>
        </ContainerView>
      </DisplayTextProvider>
    </RouteContext.Provider>
  );
}

// const TextComp = (_: { children?: React.ReactNode; style?: string }) => (
//   <>LOL</>
// );
// <AuthenticatorInternal ContainerView={TextComp} />;

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

// do not require a View context
Authenticator.Heading = DefaultHeading;
Authenticator.SubHeading = DefaultSubHeading;
Authenticator.Provider = Provider;

// require a View context
Authenticator.Container = DefaultContainerView;
Authenticator.TOTPView = DefaultTOTPView;

Authenticator.ErrorView = DefaultErrorView;
Authenticator.Field = Field;
Authenticator.FederatedProviderView = DefaultFederatedProviderView;

// @todo should Form be part of the wrapping component, and not s static property
Authenticator.Form = DefaultForm;

Authenticator.SubmitButton = DefaultSubmitButton;
