import * as React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';
import LinkButton from './LinkButton';
import { LinkViewComponent } from './types';

const LinkView: LinkViewComponent = ({
  children,
  links,
  justifyContent = 'space-around',
  ...props
}): JSX.Element | null => {
  if (!links?.length && !children) {
    return null;
  }

  return (
    <Flex {...props} justifyContent={justifyContent}>
      {children ? children : links?.map(LinkButton)}
    </Flex>
  );
};

LinkView.displayName = createDisplayName('LinkView');

export default LinkView;
