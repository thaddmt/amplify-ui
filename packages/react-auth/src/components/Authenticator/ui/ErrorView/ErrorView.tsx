import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import ErrorAlert from './ErrorAlert';
import { FlexProps } from './types';

const ErrorView = ({
  // @todo add classname
  children,
  direction = 'column',
  ...props
}: FlexProps): JSX.Element => (
  <Flex direction={direction} {...props}>
    {children ? children : <ErrorAlert />}
  </Flex>
);

export default ErrorView;
