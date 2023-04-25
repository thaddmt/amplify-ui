import React from 'react';

import { Heading } from '@aws-amplify/ui-react';

import { useSubHeadingText } from '../../hooks';

import { createDisplayName } from '../utils';

type SubHeadingProps = Parameters<typeof Heading>[0];
export type SubHeadingComponent<P = {}> = React.ComponentType<
  SubHeadingProps & P
>;

const DEFAULT_LEVEL: SubHeadingProps['level'] = 4;

const SubHeading: SubHeadingComponent = ({
  children,
  level = DEFAULT_LEVEL,
  ...props
}) => {
  const subHeadingText = useSubHeadingText();

  return (
    <Heading {...props} level={level}>
      {children ? children : subHeadingText}
    </Heading>
  );
};

SubHeading.displayName = createDisplayName('SubHeading');

export default SubHeading;
