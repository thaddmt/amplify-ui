import React from 'react';
import { UseFormHandleSubmit, UseFormReset } from 'react-hook-form';

export type FieldValues = Record<string, string>;

export type HandleSubmit<T extends FieldValues = FieldValues> =
  UseFormHandleSubmit<T>;

export type OnSubmit<T extends FieldValues = FieldValues> = Parameters<
  UseFormHandleSubmit<T>
>[0];

export type FormHandle<T extends FieldValues = FieldValues> = {
  // @todo maybe just type as () => void?
  reset: UseFormReset<T>;
};

export type FormViewContextType<T extends FieldValues = FieldValues> = {
  children?: React.ReactNode;
  // onReset?: (values: T) => void;
  handleSubmit?: UseFormHandleSubmit<T>;
  onSubmit?: OnSubmit<T> | undefined;
  // defaultValues?: InitialValues<T>;
  isDisabled?: boolean | undefined;
};
