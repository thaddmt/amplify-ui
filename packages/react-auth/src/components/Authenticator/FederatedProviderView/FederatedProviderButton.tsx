import React from 'react';

import { isString } from '@aws-amplify/ui';
import { RenderNothing } from '@aws-amplify/ui-react-core';
import { Button, Text } from '@aws-amplify/ui-react';
import { FederatedProviderButtonProps } from './types';

export default function SocialProviderButton({
  children,
  className = 'federated-sign-in-button',
  fontWeight = 'normal',
  gap = '1rem',
  Icon = RenderNothing,
  ...props
}: FederatedProviderButtonProps): JSX.Element {
  return (
    <Button {...props} className={className} fontWeight={fontWeight} gap={gap}>
      <Icon />
      {isString(children) ? <Text as="span">{children}</Text> : children}
    </Button>
  );
}
