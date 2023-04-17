import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';

import TOTPQRCodeImage from './TOTPQRCodeImage';
import TOTPCopyButton from './TOTPCopyButton';
import { TOTPViewProps } from './types';

const TOTPView = ({
  alignItems = 'center',
  children,
  direction = 'column',
  ...props
}: TOTPViewProps): JSX.Element => (
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

TOTPView.displayName = createDisplayName('TOTPView');

export default TOTPView;
