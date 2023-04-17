import React from 'react';

import { PropsType } from '@aws-amplify/ui-react-core';

import { createDisplayName } from '../../ui/utils';

import FormViewProvider from './FormViewProvider';

import { FormHandle, WithFormViewProps } from './types';

export default function withFormView<
  C extends React.ComponentType<any>,
  P extends PropsType<C>,
  Props extends WithFormViewProps<P>
>(
  Component: C
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Props> & React.RefAttributes<FormHandle>
> {
  const FormView = React.forwardRef<FormHandle, Props>(
    ({ isDisabled, onSubmit, ...props }, ref) => (
      <FormViewProvider isDisabled={isDisabled} onSubmit={onSubmit} ref={ref}>
        <Component {...(props as P)} />
      </FormViewProvider>
    )
  );

  FormView.displayName = createDisplayName('FormView');

  return FormView;
}
