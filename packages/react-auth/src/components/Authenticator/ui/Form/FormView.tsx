import React from 'react';

import { Prettify, isTypedFunction } from '@aws-amplify/ui';
import { Flex } from '@aws-amplify/ui-react';

import { FieldValues, OnSubmit, useFormView } from '../../context';

import { createDisplayName } from '../utils';

type FormViewProps<T extends FieldValues> = Prettify<
  Omit<Parameters<typeof Flex>[0], 'as'> & { onSubmit?: OnSubmit<T> }
>;

// READT FOR HOC
function FormView<T extends FieldValues>({
  children,
  // @todo move style to classes
  direction = 'column',
  onSubmit,
}: FormViewProps<T>): JSX.Element {
  const { handleSubmit: _handleSubmit } = useFormView();

  const handleSubmit = React.useMemo(
    () =>
      _handleSubmit((e) => {
        if (isTypedFunction(onSubmit)) {
          onSubmit(e as T);
        }
      }),
    [_handleSubmit, onSubmit]
  );

  return (
    <Flex
      as="form"
      direction={direction}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
    >
      {children}
    </Flex>
  );
}

FormView.displayName = createDisplayName('FormView');

export default FormView;
