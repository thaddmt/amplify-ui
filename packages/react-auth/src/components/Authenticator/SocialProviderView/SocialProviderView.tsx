import React from 'react';

import {
  capitalize,
  isFunction,
  FederatedIdentityProviders,
} from '@aws-amplify/ui';
import { Flex } from '@aws-amplify/ui-react';

import SocialProviderButton from './SocialProviderButton';
import ProviderIcons from './ProviderIcons';
import { SocialProviderViewComponent } from './types';

const EMPTY_STRING = '';

const SocialProviderView: SocialProviderViewComponent = ({
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
            <SocialProviderButton
              key={provider}
              Icon={
                ProviderIcons[FederatedIdentityProviders[capitalize(provider)]]
              }
            >
              {isFunction(providerButtonText)
                ? providerButtonText(capitalize(provider))
                : providerButtonText}
            </SocialProviderButton>
          ))}
    </Flex>
  );
};

SocialProviderView.displayName = 'SocialProviderView';

export default SocialProviderView;
