import React from 'react';
import {
  useForm,
  FormProvider as ReactHookFormProvider,
} from 'react-hook-form';

import { FieldValues, FormHandle, FormProviderProps } from './types';

const FormProvider = React.forwardRef<FormHandle, FormProviderProps>(
  function FormProvider<Values extends FieldValues>(
    { children, defaultValues }: FormProviderProps<Values>,
    // NO disabled prop - not an html prop
    ref: React.ForwardedRef<FormHandle<Values>>
  ) {
    const formProviderProps = useForm<Values>({
      // @todo make configurable
      defaultValues,
      mode: 'all',
    });

    const { getValues, reset } = formProviderProps;
    React.useImperativeHandle(ref, () => ({ getValues, reset }), [
      getValues,
      reset,
    ]);

    return (
      <ReactHookFormProvider {...formProviderProps}>
        {children}
      </ReactHookFormProvider>
    );
  }
);

export default FormProvider;
