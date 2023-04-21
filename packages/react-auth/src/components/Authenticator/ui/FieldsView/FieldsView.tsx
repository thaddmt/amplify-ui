import React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { createDisplayName } from '../utils';
import { useFieldsView } from '../../context';

import Field from './Field';
import { FieldsViewProps } from './types';

const FieldsView = ({
  children,
  direction = 'column',
  ...props
}: FieldsViewProps): JSX.Element | null => {
  const { fields } = useFieldsView();

  if (!fields?.length && !children) {
    return null;
  }

  return (
    <Flex {...props} direction={direction}>
      {children ?? fields?.map(Field)}
    </Flex>
  );
};

FieldsView.displayName = createDisplayName('FieldsView');

export default FieldsView;
