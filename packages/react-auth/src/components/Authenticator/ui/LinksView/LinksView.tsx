import * as React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';
import LinkButtons from './LinkButtons';
import { LinksProps } from './types';

const LinksView = ({
  children,
  justifyContent = 'space-around',
  ...props
}: LinksProps): JSX.Element | null => {
  return (
    <Flex {...props} justifyContent={justifyContent}>
      {children ? children : <LinkButtons />}
    </Flex>
  );
};

LinksView.displayName = createDisplayName('LinksView');

export default LinksView;
