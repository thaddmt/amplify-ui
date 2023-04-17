import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

import { WithContextProps } from '@aws-amplify/ui-react-core';

export type FieldValues = Record<string, string>;

export type HandleSubmit<T extends FieldValues = FieldValues> =
  UseFormHandleSubmit<T>;
export type OnSubmit<T extends FieldValues = FieldValues> = Parameters<
  UseFormHandleSubmit<T>
>[0];

export type FormHandle = { reset: () => void };

export type FormViewContextType<T extends FieldValues = FieldValues> = {
  children?: React.ReactNode;

  // onReset?: (values: T) => void;
  handleSubmit?: UseFormHandleSubmit<T>;
  onSubmit?: OnSubmit<T> | undefined;
  // defaultValues?: InitialValues<T>;
  isDisabled?: boolean | undefined;
};

export type WithFormViewProps<P> = WithContextProps<FormViewContextType, P>;
