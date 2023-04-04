import React from 'react';

import { isString } from '@aws-amplify/ui';
import { RenderNothing } from '@aws-amplify/ui-react-core';
import { Button, Text } from '@aws-amplify/ui-react';
import { SocialProviderButtonProps } from './types';

export default function SocialProviderButton({
  children,
  // @todo rename to social-provider-button?
  className = 'federated-sign-in-button',
  fontWeight = 'normal',
  gap = '1rem',
  Icon = RenderNothing,
  ...props
}: SocialProviderButtonProps): JSX.Element {
  return (
    <Button {...props} className={className} fontWeight={fontWeight} gap={gap}>
      <Icon />
      {isString(children) ? <Text as="span">{children}</Text> : children}
    </Button>
  );
}
