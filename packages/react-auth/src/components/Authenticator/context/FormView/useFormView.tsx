import React from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { useFormSubmit } from '../../Form';

import { FormViewContextType } from './types';

export const useFormView = (): Required<FormViewContextType> => {
  const { isPending: _isDisabled, submitForm: onSubmit } = useAuthenticator();

  const { handleSubmit, isDisabled: __isDisabled } = useFormSubmit();

  // @todo precedence
  const isDisabled = _isDisabled || __isDisabled;

  const value = React.useMemo(
    () => ({ handleSubmit, isDisabled, onSubmit }),
    [handleSubmit, isDisabled, onSubmit]
  );

  return value;
};
