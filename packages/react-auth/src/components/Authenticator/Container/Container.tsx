import React from 'react';
import { View } from '@aws-amplify/ui-react';
import { createDisplayName } from '../utils/index';

type ContainerProps = Parameters<typeof View>[0] & {
  // @todo add full-screen maybe? Make modal cancelable?
  variation?: 'default' | 'modal';
};
export type ContainerComponent<P = {}> = React.ComponentType<
  ContainerProps & P
>;

const Container: ContainerComponent = ({
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

Container.displayName = createDisplayName('Container');

export default Container;
