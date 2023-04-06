import React from 'react';

import { capitalize, FederatedProvider, isFunction } from '@aws-amplify/ui';

import FederatedProviderIcon from './FederatedProviderIcon';
import { FederatedProviderOptions } from './types';

export const getFederatedProviderOptions = (
  providers: FederatedProvider[],
  buttonText: string | ((provider: Capitalize<FederatedProvider>) => string),
  callback: (provider: FederatedProvider) => void
): (FederatedProviderOptions & { key: string })[] =>
  providers.map((provider) => ({
    children: isFunction(buttonText)
      ? buttonText(capitalize(provider))
      : buttonText,
    key: provider,
    Icon: () => <FederatedProviderIcon provider={provider} />,
    onClick: () => callback(provider),
    provider,
  }));
