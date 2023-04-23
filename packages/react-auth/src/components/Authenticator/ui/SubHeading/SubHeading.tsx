import React from 'react';

import { Heading as BaseHeading } from '@aws-amplify/ui-react';

import { useDisplayText } from '../../context';
import { useRoute } from '../../hooks';
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
  const { route } = useRoute();
  const { getSubHeadingText } = useDisplayText();

  return (
    <BaseHeading {...props} level={level}>
      {children ? children : getSubHeadingText(route)}
    </BaseHeading>
  );
};

SubHeading.displayName = createDisplayName('SubHeading');

export default SubHeading;
