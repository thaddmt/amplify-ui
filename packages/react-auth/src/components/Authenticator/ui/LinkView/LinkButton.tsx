import * as React from 'react';

import { Button } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';
import { LinkButtonProps } from './types';

const LinkButton = ({
  children,
  fontWeight = 'normal',
  type = 'button',
  variation = 'link',
  ...props
}: LinkButtonProps): JSX.Element => (
  <Button {...props} fontWeight={fontWeight} type={type} variation={variation}>
    {children}
  </Button>
);

LinkButton.displayName = createDisplayName('LinkButton');

export default LinkButton;
