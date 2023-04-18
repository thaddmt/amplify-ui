import React from 'react';
import {
  useForm,
  FormProvider as ReactHookFormProvider,
} from 'react-hook-form';

import { FieldValues, FormHandle } from './types';

const FormProvider = React.forwardRef<
  FormHandle,
  { children?: React.ReactNode }
>(function FormProvider<Values extends FieldValues>(
  { children }: { children?: React.ReactNode },
  ref: React.ForwardedRef<FormHandle<Values>>
) {
  const formProviderProps = useForm<Values>({
    // @todo make configurable
    // @todo add back defaultValues prop
    mode: 'all',
  });

  const { reset } = formProviderProps;
  React.useImperativeHandle(ref, () => ({ reset }), [reset]);

  return (
    <ReactHookFormProvider {...formProviderProps}>
      {children}
    </ReactHookFormProvider>
  );
});

export default FormProvider;
