import React from 'react';

import { Heading as BaseHeading } from '@aws-amplify/ui-react';
import { createDisplayName } from '../utils';

type SubHeadingProps = Parameters<typeof BaseHeading>[0];
export type SubHeadingComponent<P = {}> = React.ComponentType<
  SubHeadingProps & P
>;

const DEFAULT_LEVEL: SubHeadingProps['level'] = 4;

const SubHeading: SubHeadingComponent = ({
  children,
  level = DEFAULT_LEVEL,
  ...props
}) => {
  return (
    <BaseHeading {...props} level={level}>
      {children}
    </BaseHeading>
  );
};

SubHeading.displayName = createDisplayName('SubHeading');

export default SubHeading;
