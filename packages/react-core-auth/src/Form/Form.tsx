import React from 'react';
import FormProvider from './FormProvider';
import { DefaultValuesProvider } from './DefaultValues';
import { FormProps } from './types';

export default function Form({
  children,
  defaultValues,
  ...props
}: FormProps): JSX.Element {
  return (
    <FormProvider {...props} defaultValues={defaultValues}>
      <DefaultValuesProvider defaultValues={defaultValues}>
        {children}
      </DefaultValuesProvider>
    </FormProvider>
  );
}
