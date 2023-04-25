import React from 'react';
import {
  DefaultValues as BaseDefaultValues,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';

export type FieldValues = Record<string, string>;

export type DefaultValues<T extends FieldValues = FieldValues> =
  BaseDefaultValues<T>;

export type HandleSubmit<T extends FieldValues = FieldValues> =
  UseFormHandleSubmit<T>;

export type OnReset<T extends FieldValues = FieldValues> = UseFormReset<T>;

export type OnSubmit<T extends FieldValues = FieldValues> = ReturnType<
  HandleSubmit<T>
>;

export type FormHandle<T extends FieldValues = FieldValues> = {
  getValues: () => T;
  reset: UseFormReset<T>;
};

export type FormProviderProps<T extends FieldValues = FieldValues> = {
  children?: React.ReactNode;
  defaultValues?: DefaultValues<T>;
  onSubmit?: OnSubmit<T>;
  onReset?: OnReset<T>;
};

export type FormProps<T extends FieldValues = FieldValues> =
  FormProviderProps<T>;
