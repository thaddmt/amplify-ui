import React from 'react';

import { useAuthenticator } from '@aws-amplify/ui-react-core-auth';

import { HandleSubmit, useFormSubmit } from '../../BaseForm';

export default function useSubmit(): {
  isDisabled: boolean;
  onSubmit?: (event: any) => Promise<void>;
} {
  const { isPending: _isDisabled, submitForm: onValid } = useAuthenticator(
    ({ isPending, submitForm }) => [isPending, submitForm]
  );
  const { handleSubmit, isDisabled: __isDisabled } = useFormSubmit();

  // @todo precedence
  const isDisabled = _isDisabled || __isDisabled;

  const onSubmit = React.useCallback(
    async (e: Parameters<ReturnType<HandleSubmit>>[0]) => {
      const handler = handleSubmit(onValid);
      await handler(e);
    },
    [handleSubmit, onValid]
  );

  return { isDisabled, onSubmit };
}
