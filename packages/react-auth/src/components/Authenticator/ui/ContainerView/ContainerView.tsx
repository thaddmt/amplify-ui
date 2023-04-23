import React from 'react';

import { View } from '@aws-amplify/ui-react';

import { ViewProps } from './types';

const ContainerView = ({ children, ...props }: ViewProps): JSX.Element => {
  return (
    <View
      {...props}
      // @todo all styles converted to classname
      style={{ justifyContent: 'center', backgroundColor: 'white' }}
    >
      {children}
    </View>
  );
};

export default ContainerView;
