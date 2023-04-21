import React from 'react';
import {
  UseFormHandleSubmit,
  UseFormReset,
  UseFormProps,
} from 'react-hook-form';

export type FieldValues = Record<string, string>;

export type HandleSubmit<T extends FieldValues = FieldValues> =
  UseFormHandleSubmit<T>;

export type OnSubmit<T extends FieldValues = FieldValues> = Parameters<
  UseFormHandleSubmit<T>
>[0];

export type FormHandle<T extends FieldValues = FieldValues> = {
  // @todo maybe just type as () => void?
  getValues: () => T;
  reset: UseFormReset<T>;
};

export type FormProviderProps<T extends FieldValues = FieldValues> = {
  children?: React.ReactNode;
  defaultValues?: UseFormProps<T>['defaultValues'];
  // onSubmit?: OnSubmit<T>;
  // onReset?: UseFormReset<T>;
};

export type FormProps<T extends FieldValues = FieldValues> =
  FormProviderProps<T>;
