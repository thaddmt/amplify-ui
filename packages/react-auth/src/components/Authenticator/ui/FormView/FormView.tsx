import React from 'react';

import { Prettify } from '@aws-amplify/ui';
import { Flex } from '@aws-amplify/ui-react';

import { FieldValues, OnSubmit } from '../../BaseForm';
import { useSubmit } from '../../hooks';

import { createDisplayName } from '../utils';

type FormViewProps<T extends FieldValues = FieldValues> = Prettify<
  Omit<Parameters<typeof Flex>[0], 'as'> & { onSubmit?: OnSubmit<T> }
>;

const FormView = ({
  children,
  // @todo move style to classes
  direction = 'column',
  ...props
}: FormViewProps): JSX.Element => {
  const { onSubmit } = useSubmit();

  return (
    <Flex {...props} as="form" direction={direction} onSubmit={onSubmit}>
      {children}
    </Flex>
  );
};

FormView.displayName = createDisplayName('FormView');

export default FormView;
