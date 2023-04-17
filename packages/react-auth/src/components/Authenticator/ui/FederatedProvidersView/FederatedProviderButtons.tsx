import React from 'react';

import { capitalize } from '@aws-amplify/ui';

import { useDisplayText, useFederatedProvidersView } from '../../context';
import { createDisplayName } from '../utils';

import FederatedProviderButton from './FederatedProviderButton';
import FederatedProviderIcon from './FederatedProviderIcon';

const FederatedProviderButtons = (): JSX.Element | null => {
  const { providers, toFederatedProvider } = useFederatedProvidersView();
  const { getFederatedProviderButtonText } = useDisplayText();

  if (!Array.isArray(providers)) {
    return null;
  }

  return (
    <>
      {providers.map((provider) => (
        <FederatedProviderButton
          onClick={() => {
            toFederatedProvider({ provider });
          }}
          key={provider}
          Icon={() => <FederatedProviderIcon provider={provider} />}
        >
          {getFederatedProviderButtonText(capitalize(provider))}
        </FederatedProviderButton>
      ))}
    </>
  );
};

FederatedProviderButtons.displayName = createDisplayName(
  'FederatedProviderButtons'
);

export default FederatedProviderButtons;
