import React from 'react';

import {
  capitalize,
  isFunction,
  FederatedIdentityProviders,
} from '@aws-amplify/ui';
import { Flex } from '@aws-amplify/ui-react';

import FederatedProviderButton from './FederatedProviderButton';
import ProviderIcons from './ProviderIcons';
import { FederatedProviderViewComponent } from './types';

const EMPTY_STRING = '';

const FederatedProviderView: FederatedProviderViewComponent = ({
  children,
  className = 'federated-sign-in-container',
  direction = 'column',
  padding = '0 0 1rem 0',
  providerButtonText = EMPTY_STRING,
  providers,
  ...props
}): JSX.Element | null => {
  if (!providers && !children) {
    return null;
  }

  return (
    <Flex
      {...props}
      className={className}
      direction={direction}
      padding={padding}
    >
      {children
        ? children
        : providers?.map((provider) => (
            <FederatedProviderButton
              key={provider}
              Icon={
                ProviderIcons[FederatedIdentityProviders[capitalize(provider)]]
              }
            >
              {isFunction(providerButtonText)
                ? providerButtonText(capitalize(provider))
                : providerButtonText}
            </FederatedProviderButton>
          ))}
    </Flex>
  );
};

FederatedProviderView.displayName = 'FederatedProviderView';

export default FederatedProviderView;
