import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';

import { FederatedProvidersViewProps } from './types';
import FederatedProviderButtons from './FederatedProviderButtons';

const FederatedProvidersView = ({
  children,
  className = 'federated-sign-in-container',
  direction = 'column',
  padding = '0 0 1rem 0',
  ...props
}: FederatedProvidersViewProps): JSX.Element => (
  <Flex
    {...props}
    className={className}
    direction={direction}
    padding={padding}
  >
    {children ? children : <FederatedProviderButtons />}
  </Flex>
);

FederatedProvidersView.displayName = createDisplayName(
  'FederatedProvidersView'
);

export default FederatedProvidersView;
