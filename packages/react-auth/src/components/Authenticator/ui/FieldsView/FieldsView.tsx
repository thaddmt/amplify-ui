import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';
import Field from './Field';
import { FieldsViewProps } from './types';

const FieldsView = ({
  children,
  direction = 'column',
  fields,
  ...props
}: FieldsViewProps): JSX.Element | null => {
  if (!fields?.length && !children) {
    return null;
  }

  return (
    <Flex {...props} data-amplify-container="" direction={direction}>
      {children ?? fields?.map(Field)}
      <Field
        label="will"
        name="will"
        validate={(v, values) => {
          return values['will'] === 'will' ? undefined : 'should equal will';
        }}
        type="text"
      />
    </Flex>
  );
};

FieldsView.displayName = createDisplayName('FieldsView');

export default FieldsView;
