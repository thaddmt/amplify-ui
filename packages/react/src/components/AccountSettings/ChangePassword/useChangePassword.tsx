import React, { useState, useCallback, useRef } from 'react';
import isEqual from 'lodash/isEqual';

import {
  ValidatorOptions,
  getDefaultPasswordValidators,
  runFieldValidators,
  getDefaultConfirmPasswordValidators,
  AmplifyUser,
  changePassword,
} from '@aws-amplify/ui';

import { FormValues, BlurredFields, ValidationError } from '../types';
import { useAuth } from '../../../internal';
import { ValidateParams } from './types';

interface UseChangePasswordInput {
  validators: ValidatorOptions[];
  onSuccess: () => void;
  onError: (error: Error) => void;
}

interface UseChangePasswordOutput {
  errorMessage: string;
  isDisabled: boolean;
  isLoading: boolean;
  runChangePassword: () => Promise<void>;
  updateFormBlur: ({ name }: { name: string }) => void;
  updateFormValues: ({ name, value }: { name: string; value: string }) => void;
  user: AmplifyUser;
  validationError: ValidationError;
}

const getIsDisabled = (
  formValues: FormValues,
  validationError: ValidationError
): boolean => {
  const { currentPassword, newPassword, confirmPassword } = formValues;

  const hasEmptyField = !currentPassword || !newPassword || !confirmPassword;
  if (hasEmptyField) {
    return true;
  }

  const arePasswordsInvalid =
    validationError.newPassword?.length > 0 ||
    validationError.confirmPassword?.length > 0;

  return arePasswordsInvalid;
};

const useChangePassword = ({
  validators,
  onSuccess,
  onError,
}: UseChangePasswordInput): UseChangePasswordOutput => {
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [validationError, setValidationError] = useState<ValidationError>({});
  const blurredFields = useRef<BlurredFields>([]);

  const { user, isLoading } = useAuth();

  const isDisabled = getIsDisabled(formValues, validationError);

  const passwordValidators: ValidatorOptions[] = React.useMemo(() => {
    return validators ?? getDefaultPasswordValidators();
  }, [validators]);

  const validateNewPassword = useCallback(
    ({ formValues, eventType }: ValidateParams): string[] => {
      const { newPassword } = formValues;
      const hasBlurred = blurredFields.current.includes('newPassword');

      return runFieldValidators({
        value: newPassword,
        validators: passwordValidators,
        eventType,
        hasBlurred,
      });
    },
    [passwordValidators]
  );

  const validateConfirmPassword = useCallback(
    ({ formValues, eventType }: ValidateParams): string[] => {
      const { newPassword, confirmPassword } = formValues;
      const hasBlurred = blurredFields.current.includes('confirmPassword');

      const confirmPasswordValidators =
        getDefaultConfirmPasswordValidators(newPassword);

      return runFieldValidators({
        value: confirmPassword,
        validators: confirmPasswordValidators,
        eventType,
        hasBlurred,
      });
    },
    []
  );

  const runValidation = useCallback(
    (param: ValidateParams) => {
      const passwordErrors = validateNewPassword(param);
      const confirmPasswordErrors = validateConfirmPassword(param);

      const newValidationError = {
        newPassword: passwordErrors,
        confirmPassword: confirmPasswordErrors,
      };

      // only re-render if errors have changed
      if (!isEqual(validationError, newValidationError)) {
        setValidationError(newValidationError);
      }
    },
    [validateConfirmPassword, validateNewPassword, validationError]
  );

  const updateFormValues = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    const newFormValues = { ...formValues, [name]: value };
    runValidation({ formValues: newFormValues, eventType: 'change' });
    setFormValues(newFormValues);
  };

  const updateFormBlur = ({ name }: { name: string }) => {
    const newBlurredFields = [...blurredFields.current, name];
    blurredFields.current = newBlurredFields;
    runValidation({ formValues, eventType: 'blur' });
  };

  const runChangePassword = async () => {
    const { currentPassword, newPassword } = formValues;
    if (errorMessage) {
      setErrorMessage(null);
    }
    try {
      await changePassword({ user, currentPassword, newPassword });

      onSuccess?.(); // notify success to the parent
    } catch (e) {
      const error = e as Error;
      if (error.message) setErrorMessage(error.message);

      onError?.(error); // notify error to the parent
    }
  };

  return {
    errorMessage,
    isDisabled,
    user,
    isLoading,
    updateFormValues,
    updateFormBlur,
    runChangePassword,
    validationError,
  };
};

export default useChangePassword;
