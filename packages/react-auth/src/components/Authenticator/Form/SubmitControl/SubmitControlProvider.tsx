import React from 'react';
import { useFormContext } from 'react-hook-form';

import { isTypedFunction } from '@aws-amplify/ui';

import { FieldValues, OnSubmit } from '../types';

import { SubmitControlContext } from './SubmitControlContext';
import { SubmitControlContextType } from './types';

export default function SubmitControlProvider<Values extends FieldValues>({
  children,
  isDisabled: _isDisabled = false,
  onSubmit,
}: SubmitControlContextType<Values> & {
  children?: React.ReactNode;
}): JSX.Element {
  const {
    formState: { isValid },
    handleSubmit: _handleSubmit,
  } = useFormContext<Values>();

  // check prop, then form internal value
  const isDisabled = _isDisabled || !isValid;

  const handleSubmit = React.useCallback(
    (_onSubmit?: OnSubmit<Values>) =>
      _handleSubmit((values) => {
        if (isTypedFunction(_onSubmit)) {
          _onSubmit(values);
        }
        if (isTypedFunction(onSubmit)) {
          onSubmit(values);
        }
      }),
    [_handleSubmit, onSubmit]
  );

  const value = React.useMemo(
    () => ({ handleSubmit, isDisabled, onSubmit }),
    [handleSubmit, isDisabled, onSubmit]
  );

  return (
    <SubmitControlContext.Provider value={value as SubmitControlContextType}>
      {children}
    </SubmitControlContext.Provider>
  );
}
