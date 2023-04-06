import React from 'react';

import { isString } from '@aws-amplify/ui';
import { Button, Text } from '@aws-amplify/ui-react';
import { RenderNothing } from '@aws-amplify/ui-react-core';

import { createDisplayName } from '../utils/index';

import { FederatedProviderButtonProps } from './types';

const FederatedProviderButton = ({
  children,
  className = 'federated-sign-in-button',
  fontWeight = 'normal',
  gap = '1rem',
  Icon = RenderNothing,
  ...props
}: FederatedProviderButtonProps): JSX.Element => (
  <Button {...props} className={className} fontWeight={fontWeight} gap={gap}>
    <Icon />
    {isString(children) ? <Text as="span">{children}</Text> : children}
  </Button>
);

FederatedProviderButton.displayName = createDisplayName(
  'FederatedProviderButton'
);

export default FederatedProviderButton;
