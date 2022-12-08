import React from 'react';

import { AmplifyUser, getLogger, updateUserAttributes } from '@aws-amplify/ui';

import { useAuth } from '../../../internal';
import { Flex } from '../../../primitives';
import { UpdateUserAttributesProps } from './types';
import { FormValues } from '../types';
import { DefaultErrorMessage } from '../shared/Defaults';

const logger = getLogger('Auth');

function UpdateUserAttributes({
  onSuccess,
  onError,
  children,
}: UpdateUserAttributesProps): JSX.Element | null {
  const { user, isLoading } = useAuth();
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [errorMessage, setErrorMessage] = React.useState<string>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const runUpdateUserAttributes = React.useCallback(
    async ({
      user,
      attributes,
    }: {
      user: AmplifyUser;
      attributes: Record<string, string>;
    }) => {
      try {
        await updateUserAttributes({ user, attributes });
        onSuccess?.();
      } catch (e) {
        const error = e as Error;
        setErrorMessage(error.message);
        onError?.(error);
      }
    },
    [onSuccess, onError]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runUpdateUserAttributes({ user, attributes: formValues });
  };

  // Return null if Auth.getCurrentAuthenticatedUser is still in progress
  if (isLoading) {
    return null;
  }

  // Return null if user isn't authenticated
  if (!user) {
    logger.warn('<UpdateUserAttributes /> requires user to be authenticated.');
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onChange: handleChange,
          })
        )}
        {errorMessage ? (
          <DefaultErrorMessage>{errorMessage}</DefaultErrorMessage>
        ) : null}
      </Flex>
    </form>
  );
}

export default UpdateUserAttributes;
