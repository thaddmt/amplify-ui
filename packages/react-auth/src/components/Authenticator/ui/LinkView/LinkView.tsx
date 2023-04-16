import * as React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';
import LinkButtons from './LinkButtons';
import { LinkViewProps } from './types';

const LinkView = ({
  children,
  justifyContent = 'space-around',
  ...props
}: LinkViewProps): JSX.Element | null => {
  return (
    <Flex {...props} justifyContent={justifyContent}>
      {children ? children : <LinkButtons />}
    </Flex>
  );
};

LinkView.displayName = createDisplayName('LinkView');

export default LinkView;
