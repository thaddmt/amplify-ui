import * as React from 'react';

import { Button } from '@aws-amplify/ui-react';
import { LinkButtonProps } from './types';

export default function LinkButton({
  children,
  fontWeight = 'normal',
  type = 'button',
  variation = 'link',
  ...props
}: LinkButtonProps): JSX.Element {
  return (
    <Button
      {...props}
      fontWeight={fontWeight}
      type={type}
      variation={variation}
    >
      {children}
    </Button>
  );
}
