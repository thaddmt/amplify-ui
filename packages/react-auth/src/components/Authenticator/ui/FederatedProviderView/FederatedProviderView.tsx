import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';
import FederatedProviderButton from './FederatedProviderButton';
import { FederatedProviderViewComponent } from './types';

const FederatedProviderView: FederatedProviderViewComponent = ({
  children,
  className = 'federated-sign-in-container',
  direction = 'column',
  padding = '0 0 1rem 0',
  providerOptions,
  ...props
}): JSX.Element | null => {
  if (!providerOptions?.length && !children) {
    return null;
  }

  return (
    <Flex
      {...props}
      className={className}
      direction={direction}
      padding={padding}
    >
      {children ? children : providerOptions?.map(FederatedProviderButton)}
    </Flex>
  );
};

FederatedProviderView.displayName = createDisplayName('FederatedProviderView');

export default FederatedProviderView;
