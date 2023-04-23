import { useFormContext } from 'react-hook-form';

import { FieldValues } from '../types';
import { UseFormHandleSubmit } from './types';

export function useFormSubmit<
  Values extends FieldValues
>(): UseFormHandleSubmit<Values> {
  const {
    handleSubmit,
    formState: { isValid },
  } = useFormContext<Values>();
  return { handleSubmit, isDisabled: !isValid };
}
