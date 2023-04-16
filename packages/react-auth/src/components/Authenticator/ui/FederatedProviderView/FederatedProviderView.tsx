import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';

import { FederatedProviderViewProps } from './types';
import FederatedProviderButtons from './FederatedProviderButtons';

const FederatedProviderView = ({
  children,
  className = 'federated-sign-in-container',
  direction = 'column',
  padding = '0 0 1rem 0',
  ...props
}: FederatedProviderViewProps): JSX.Element => (
  <Flex
    {...props}
    className={className}
    direction={direction}
    padding={padding}
  >
    {children ? children : <FederatedProviderButtons />}
  </Flex>
);

FederatedProviderView.displayName = createDisplayName('FederatedProviderView');

export default FederatedProviderView;
