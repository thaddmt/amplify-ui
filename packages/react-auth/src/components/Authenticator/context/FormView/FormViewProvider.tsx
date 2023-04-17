import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { isTypedFunction } from '@aws-amplify/ui';

import { FormViewContext } from './FormViewContext';
import {
  FieldValues,
  FormHandle,
  FormViewContextType,
  OnSubmit,
} from './types';

const FormViewProvider = React.forwardRef(function FormViewProvider<
  Values extends FieldValues
>(
  {
    children,
    isDisabled: _isDisabled = false,
    onSubmit,
  }: FormViewContextType<Values>,
  ref: React.ForwardedRef<FormHandle<Values>>
) {
  const formProviderProps = useForm<Values>({
    // @todo make configurable
    mode: 'all',
  });

  const { reset } = formProviderProps;
  React.useImperativeHandle(ref, () => ({ reset }), [reset]);

  const {
    handleSubmit: _handleSubmit,
    formState: { isValid },
  } = formProviderProps;

  // check prop, then form internal value
  const isDisabled = _isDisabled || !isValid;

  const handleSubmit = React.useCallback(
    (_onSubmit?: OnSubmit<Values>) =>
      _handleSubmit((e) => {
        if (isTypedFunction(_onSubmit)) {
          _onSubmit(e);
        }
        if (isTypedFunction(onSubmit)) {
          onSubmit(e);
        }
      }),
    [_handleSubmit, onSubmit]
  );

  const value = React.useMemo(
    () => ({ handleSubmit, isDisabled, onSubmit }),
    [handleSubmit, isDisabled, onSubmit]
  );

  return (
    <FormProvider {...formProviderProps}>
      <FormViewContext.Provider value={value as FormViewContextType}>
        {children}
      </FormViewContext.Provider>
    </FormProvider>
  );
});

export default FormViewProvider;
