import React from 'react';
import { View } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';

type ContainerViewProps = Parameters<typeof View>[0] & {
  // @todo add full-screen maybe? Make modal cancelable?
  variation?: 'default' | 'modal';
};
export type ContainerViewComponent<P = {}> = React.ComponentType<
  ContainerViewProps & P
>;

const ContainerView: ContainerViewComponent = ({
  children,
  variation = 'default',
  ...props
}) => {
  return (
    <View
      {...props}
      data-amplify-authenticator=""
      // @todo all styles converted to classname
      data-variation={variation}
      style={{ justifyContent: 'center' }}
    >
      {children}
    </View>
  );
};

ContainerView.displayName = createDisplayName('ContainerView');

export default ContainerView;
