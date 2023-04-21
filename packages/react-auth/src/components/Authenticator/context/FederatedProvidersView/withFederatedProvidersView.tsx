import React from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { createDisplayName } from '../../ui/utils';

import { FederatedProvidersViewContext } from './FederatedProvidersViewContext';
import {
  FederatedProvidersViewContextType,
  WithFederatedProvidersViewProps,
} from './types';

const FederatedProvidersViewProvider = ({
  children,
  providers: overrideProviders,
  toFederatedProvider: overrideToFederatedProvider,
}: FederatedProvidersViewContextType & { children?: React.ReactNode }) => {
  const {
    socialProviders: defaultProviders,
    toFederatedSignIn: defaultToFederatedProvider,
  } = useAuthenticator(({ socialProviders }) => [socialProviders]);

  const providers = overrideProviders ?? defaultProviders;
  const toFederatedProvider =
    overrideToFederatedProvider ?? defaultToFederatedProvider;

  const value = React.useMemo(
    () => ({ providers, toFederatedProvider }),
    [providers, toFederatedProvider]
  );

  return (
    <FederatedProvidersViewContext.Provider value={value}>
      {children}
    </FederatedProvidersViewContext.Provider>
  );
};

export default function withFederatedProvidersView<
  C extends React.ComponentType<any>,
  P extends React.ComponentProps<C>,
  Props extends WithFederatedProvidersViewProps<P>
>(Component: C): (props: Props) => JSX.Element {
  const FederatedProvidersView = ({ providers, ...props }: Props) => (
    <FederatedProvidersViewProvider providers={providers}>
      <Component {...(props as P)} />
    </FederatedProvidersViewProvider>
  );
  FederatedProvidersView.displayName = createDisplayName(
    'FederatedProvidersView'
  );

  return FederatedProvidersView;
}
