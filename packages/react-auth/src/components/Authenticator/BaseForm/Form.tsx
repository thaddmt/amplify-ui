import React from 'react';
import FormProvider from './FormProvider';
import { FormProps } from './types';

export default function Form({ children, ...props }: FormProps): JSX.Element {
  return <FormProvider {...props}>{children}</FormProvider>;
}
