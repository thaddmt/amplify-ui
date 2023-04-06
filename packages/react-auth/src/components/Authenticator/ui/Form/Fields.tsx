import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';
import Field from './Field';
import { FieldsViewComponent } from './types';

const FieldsView: FieldsViewComponent = ({
  children,
  direction = 'column',
  fields,
  ...props
}) => {
  if (!fields?.length && !children) {
    return null;
  }

  return (
    <Flex {...props} data-amplify-container="" direction={direction}>
      {children ?? fields?.map(Field)}
    </Flex>
  );
};

FieldsView.displayName = createDisplayName('FieldsView');

export default FieldsView;
