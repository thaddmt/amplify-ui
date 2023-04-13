import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import TOTPQRCodeImage from './TOTPQRCodeImage';
import TOTPCopyButton from './TOTPCopyButton';
import { FlexProps } from './types';

const DefaultView = ({
  alignItems = 'center',
  children,
  direction = 'column',
  ...props
}: FlexProps): JSX.Element => (
  <Flex alignItems={alignItems} direction={direction} {...props}>
    {children ? (
      children
    ) : (
      <>
        <TOTPQRCodeImage />
        <TOTPCopyButton />
      </>
    )}
  </Flex>
);

export default DefaultView;
