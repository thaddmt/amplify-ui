import { UseFormHandleSubmit as RHFUseFormHandleSubmit } from 'react-hook-form';

import { FieldValues } from '../types';

export type UseFormHandleSubmit<T extends FieldValues = FieldValues> = {
  handleSubmit: RHFUseFormHandleSubmit<T>;
  isDisabled: boolean;
};
