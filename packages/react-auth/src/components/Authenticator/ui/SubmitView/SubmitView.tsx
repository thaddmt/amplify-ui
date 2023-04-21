import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';

import SubmitButton from './SubmitButton';
import { SubmitViewProps } from './types';

const SubmitView = ({ children, ...props }: SubmitViewProps): JSX.Element => (
  <Flex {...props}>{children ? children : <SubmitButton />}</Flex>
);

SubmitView.displayName = createDisplayName('SubmitView');

export default SubmitView;
