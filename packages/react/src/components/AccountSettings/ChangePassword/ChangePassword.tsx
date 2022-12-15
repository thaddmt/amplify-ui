import React from 'react';

import { Logger } from 'aws-amplify';
import { translate } from '@aws-amplify/ui';

import { View, Flex } from '../../../primitives';
import { ComponentClassName } from '../constants';
import { ChangePasswordProps } from './types';
import useChangePassword from './useChangePassword';
import DEFAULTS from './defaults';

const logger = new Logger('ChangePassword');

function ChangePassword({
  onSuccess,
  onError,
  validators,
  components,
}: ChangePasswordProps): JSX.Element | null {
  const {
    errorMessage,
    isDisabled,
    isLoading,
    runChangePassword,
    updateFormBlur,
    updateFormValues,
    user,
    validationError,
  } = useChangePassword({ validators, onSuccess, onError });

  /* Translations */
  // TODO: add AccountSettingsTextUtil to collect these strings
  const currentPasswordLabel = translate('Current Password');
  const newPasswordLabel = translate('New Password');
  const confirmPasswordLabel = translate('Confirm Password');
  const updatePasswordText = translate('Update password');

  /* Subcomponents */
  const {
    CurrentPasswordField,
    NewPasswordField,
    ConfirmPasswordField,
    SubmitButton,
    ErrorMessage,
  } = React.useMemo(
    () => ({ ...DEFAULTS, ...(components ?? {}) }),
    [components]
  );

  /* Event Handlers */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;
    updateFormValues({ name, value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name } = event.target;
    updateFormBlur({ name });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runChangePassword();
  };

  // Return null if Auth.getCurrentAuthenticatedUser is still in progress
  if (isLoading) {
    return null;
  }

  // Return null if user isn't authenticated in the first place
  if (!user) {
    logger.warn('<ChangePassword /> requires user to be authenticated.');
    return null;
  }

  return (
    <View
      as="form"
      className={ComponentClassName.ChangePassword}
      onSubmit={handleSubmit}
    >
      <Flex direction="column">
        <CurrentPasswordField
          autoComplete="current-password"
          isRequired
          label={currentPasswordLabel}
          name="currentPassword"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <NewPasswordField
          autoComplete="new-password"
          fieldValidationErrors={validationError?.newPassword}
          isRequired
          label={newPasswordLabel}
          name="newPassword"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <ConfirmPasswordField
          autoComplete="new-password"
          fieldValidationErrors={validationError?.confirmPassword}
          isRequired
          label={confirmPasswordLabel}
          name="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <SubmitButton isDisabled={isDisabled} type="submit">
          {updatePasswordText}
        </SubmitButton>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
      </Flex>
    </View>
  );
}

ChangePassword.CurrentPasswordField = DEFAULTS.CurrentPasswordField;
ChangePassword.NewPasswordField = DEFAULTS.NewPasswordField;
ChangePassword.ConfirmPasswordField = DEFAULTS.ConfirmPasswordField;
ChangePassword.SubmitButton = DEFAULTS.SubmitButton;
ChangePassword.ErrorMessage = DEFAULTS.ErrorMessage;

export default ChangePassword;
