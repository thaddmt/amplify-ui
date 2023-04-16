import React from 'react';

import { PropsType } from '@aws-amplify/ui-react-core';
import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { createDisplayName } from '../../ui/utils';

import { FederatedProviderViewContext } from './FederatedProviderViewContext';
import {
  FederatedProviderViewContextType,
  WithFederatedProviderViewProps,
} from './types';

const FederatedProviderViewProvider = ({
  children,
  providers: overrideProviders,
  toFederatedProvider: overrideToFederatedProvider,
}: FederatedProviderViewContextType & { children?: React.ReactNode }) => {
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
    <FederatedProviderViewContext.Provider value={value}>
      {children}
    </FederatedProviderViewContext.Provider>
  );
};

export default function withFederatedProviderView<
  C extends React.ComponentType<any>,
  P extends PropsType<C>,
  Props extends WithFederatedProviderViewProps<P>
>(Component: C): (props: Props) => JSX.Element {
  const FederatedProviderView = ({ providers, ...props }: Props) => (
    <FederatedProviderViewProvider providers={providers}>
      <Component {...(props as P)} />
    </FederatedProviderViewProvider>
  );
  FederatedProviderView.displayName = createDisplayName(
    'FederatedProviderView'
  );

  return FederatedProviderView;
}
