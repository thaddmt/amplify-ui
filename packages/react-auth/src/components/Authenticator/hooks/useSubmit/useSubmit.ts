import React from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { OnSubmit, useFormHandleSubmit } from '@aws-amplify/ui-react-core-auth';

export interface UseSubmit {
  isDisabled: boolean;
  onSubmit?: OnSubmit;
}

export default function useSubmit(): UseSubmit {
  const { isPending, submitForm: onValid } = useAuthenticator(
    ({ isPending, submitForm }) => [isPending, submitForm]
  );
  const { handleSubmit, isDisabled: _isDisabled } = useFormHandleSubmit();

  // @todo precedence
  const isDisabled = isPending || _isDisabled;

  const onSubmit: OnSubmit = React.useCallback(
    async (e) => {
      const handler = handleSubmit(onValid);
      await handler(e);
    },
    [handleSubmit, onValid]
  );

  return { isDisabled, onSubmit };
}
