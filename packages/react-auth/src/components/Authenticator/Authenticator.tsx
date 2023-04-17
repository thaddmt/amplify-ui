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
  FormHandle,
  withErrorView,
  withFederatedProvidersView,
  withFormView,
  withLinksView,
  withTOTPView,
} from './context';
import {
  ContainerView as DefaultContainerView,
  Fields as DefaultFields,
  Field,
  Heading as DefaultHeading,
  SubmitButton as DefaultSubmitButton,
  ErrorView as BaseErrorView,
  LinksView as BaseLinksView,
  FederatedProvidersView as BaseFederatedProvidersView,
  SubHeading as DefaultSubHeading,
  TOTPView as BaseTOTPView,
  FormView as BaseFormView,
} from './ui';
import { getDefaultFields } from './utils';
import { AuthenticatorProps } from './types';

// const createAUthenticator = ({ views, options }) => {
//   const DefaultTOTPView = createTOTPView(BaseTOTPView);

//   Authenticator
// }

const DefaultErrorView = withErrorView(BaseErrorView);
const DefaultFormView = withFormView(BaseFormView);
const DefaultLinksView = withLinksView(BaseLinksView);
const DefaultFederatedProvidersView = withFederatedProvidersView(
  BaseFederatedProvidersView
);
const DefaultTOTPView = withTOTPView(BaseTOTPView);

export function AuthenticatorInternal({
  // @todo create example showing how to do this without prop
  // hideSignUp,
  children,
  displayText: overrideDisplayText,
  ContainerView: OverrideContainerView,
  // ErrorView = DefaultErrorView,
  // FederatedProvidersView = DefaultFederatedProvidersView,
  // Form = DefaultForm,
  formFields,
  initialState,
  // LinksView = DefaultLinksView,
  loginMechanisms,
  TOTPView: OverrideTOTPView,
  services,
  signUpAttributes,
  socialProviders,
  SubmitButton = DefaultSubmitButton,
  variation,
}: AuthenticatorProps): JSX.Element | null {
  // eslint-disable-next-line no-console
  console.count('A.Render');

  const { ContainerView, TOTPView } = React.useMemo(
    () => ({
      ContainerView: OverrideContainerView ?? DefaultContainerView,
      TOTPView: OverrideTOTPView
        ? withTOTPView(OverrideTOTPView)
        : DefaultTOTPView,
    }),
    [OverrideContainerView, OverrideTOTPView]
  );

  const { route, submitForm } = useAuthenticator(
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

  const routeValue = React.useMemo(
    () => (isAuthenticatorComponentRouteKey(route) ? { route } : null),
    [route]
  );

  // @todo can "default fields" be shared across platforms
  const fields = React.useMemo(
    () => getDefaultFields({ route, loginMechanism: loginMechanisms?.[0] }),
    [route, loginMechanisms]
  );

  const formRef = React.useRef<FormHandle>(null);

  // @todo clear `Form` on initial mount or unmount
  // @todo prevemt reset on submit events
  React.useEffect(() => {
    // console.log('HIHIHIHI', formRef);
    // @todo so brokennnnnnnn
    // formRef.current?.reset();
  }, [route]);

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

  // const totpProps = {
  //   totpSecretCode: 'Secret!',
  //   // totpSecretCode: undefined,
  //   totpIssuer: 'AWSCognito',
  //   totpUsername: 'username',
  // };

  const handleSubmit = (data: Record<string, string>) => {
    // eslint-disable-next-line no-console
    console.log('Sbbbbbbbbmit', data);

    submitForm(data);
  };

  // const Override = components?.[route];
  // if (Override) {
  //   // @todo "props" will match the context value that is passed to ContainerView Context
  //   // DisplayTextProvider and RouteContext.Provider will wrap both
  //   return <Override {...props} />;
  // }

  return (
    <DefaultFormView onSubmit={handleSubmit} ref={formRef}>
      <RouteContext.Provider value={routeValue}>
        <DisplayTextProvider displayText={overrideDisplayText}>
          <ContainerView route={route} variation={variation}>
            {/* <CustomHeaderProp /> */}

            <DefaultHeading />
            <DefaultSubHeading />
            <DefaultFederatedProvidersView />
            <TOTPView />
            <DefaultFields fields={fields} />
            <DefaultErrorView />
            <SubmitButton />
            <DefaultLinksView />
          </ContainerView>
        </DisplayTextProvider>
      </RouteContext.Provider>
    </DefaultFormView>
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

// @todo should Form be part of the wrapping component, and not a static property

// do not require a View context
Authenticator.Provider = Provider;
Authenticator.Heading = DefaultHeading;
Authenticator.SubHeading = DefaultSubHeading;

// require a View context
Authenticator.ContainerView = DefaultContainerView;
Authenticator.ErrorView = DefaultErrorView;
Authenticator.TOTPView = DefaultTOTPView;
Authenticator.FederatedProvidersView = DefaultFederatedProvidersView;

Authenticator.Field = Field;
Authenticator.SubmitButton = DefaultSubmitButton;
