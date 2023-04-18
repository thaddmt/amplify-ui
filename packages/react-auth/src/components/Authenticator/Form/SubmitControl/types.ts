import { UseFormHandleSubmit } from 'react-hook-form';

import { WithContextProps } from '@aws-amplify/ui-react-core';

import { FieldValues, OnSubmit } from '../types';

export type SubmitControlContextType<T extends FieldValues = FieldValues> = {
  // defaultValues?: InitialValues<T>;
  handleSubmit?: UseFormHandleSubmit<T>;
  isDisabled?: boolean | undefined;
  // onReset?: (values: T) => void;
  onSubmit?: OnSubmit<T> | undefined;
};

export type WithSubmitControlProps<P> = WithContextProps<
  SubmitControlContextType,
  P
>;
