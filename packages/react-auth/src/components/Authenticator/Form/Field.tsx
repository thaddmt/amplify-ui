import React from 'react';

import {
  CheckboxField,
  PasswordField,
  PhoneNumberField,
  Radio,
  RadioGroupField,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';
import { FieldControlType } from './Form';

type BaseFieldOptions<Type extends FieldControlType> = {
  label: string;
  name: string;
  type: Type;
};

export type PhoneNumberFieldOptions = Parameters<typeof PhoneNumberField>[0] &
  BaseFieldOptions<'tel'>;

export type CheckboxFieldOptions = Parameters<typeof CheckboxField>[0] &
  BaseFieldOptions<'checkbox'>;

export type TextFieldOptions = Parameters<typeof TextField>[0] &
  BaseFieldOptions<'text' | 'email'>;

export type PasswordFieldOptions = Parameters<typeof PasswordField>[0] &
  BaseFieldOptions<'password'>;

export type SelectFieldOptions = Parameters<typeof SelectField>[0] &
  BaseFieldOptions<'select'>;

export type RadioGroupFieldOptions = Parameters<typeof RadioGroupField>[0] &
  BaseFieldOptions<'radio'> & { options: string[] };

export type FieldOptions =
  | TextFieldOptions
  | SelectFieldOptions
  | PasswordFieldOptions
  | PhoneNumberFieldOptions
  | CheckboxFieldOptions
  | RadioGroupFieldOptions;

type FieldProps<Type extends FieldControlType> = {
  type: Type;
} & FieldOptions;

const isSelectFieldOptions = (props: unknown): props is SelectFieldOptions =>
  (props as SelectFieldOptions).type === 'select';

const isTextFieldOptions = (props: unknown): props is TextFieldOptions =>
  (props as TextFieldOptions).type === 'text' ||
  (props as TextFieldOptions).type === 'email';

const isPasswordFieldOptions = (
  props: unknown
): props is PasswordFieldOptions =>
  (props as PasswordFieldOptions).type === 'password';

const isCheckboxFieldOptions = (
  props: unknown
): props is CheckboxFieldOptions =>
  (props as CheckboxFieldOptions).type === 'checkbox';

const isRadioGroupFieldOptions = (
  props: unknown
): props is RadioGroupFieldOptions =>
  (props as RadioGroupFieldOptions).type === 'radio';

const isPhoneNumberFieldOptions = (
  props: unknown
): props is PhoneNumberFieldOptions =>
  (props as PhoneNumberFieldOptions).type === 'tel';

// type FieldElementType<Type extends FieldControlType> = Type extends
//   | 'tel'
//   | 'text'
//   ? HTMLInputElement
//   : Type extends 'select'
//   ? HTMLSelectElement
//   : HTMLDivElement;

// maybe needs to extend from React.MutableRefObject?
// type UnwrapRef<T extends React.Ref<any>> = T extends React.Ref<
//   infer ElementType
// >
//   ? ElementType
//   : never;
// type FieldPropsRef<Type extends FieldControlType> = UnwrapRef<FieldProps<Type>['ref']>;

const Field = React.forwardRef(function Field<Type extends FieldControlType>(
  props: FieldProps<Type>,
  ref: React.ForwardedRef<any>
): JSX.Element | null {
  return isSelectFieldOptions(props) ? (
    <SelectField {...props} ref={ref} />
  ) : isTextFieldOptions(props) ? (
    <TextField {...props} ref={ref} />
  ) : isPasswordFieldOptions(props) ? (
    <PasswordField {...props} ref={ref} />
  ) : isCheckboxFieldOptions(props) ? (
    <CheckboxField {...props} ref={ref} />
  ) : isPhoneNumberFieldOptions(props) ? (
    <PhoneNumberField {...props} outerStartComponent={null} ref={ref} />
  ) : isRadioGroupFieldOptions(props) ? (
    <RadioGroupField {...props} ref={ref}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.options.map((option) => (
        // @todo do Radio options also need the ref?
        <Radio key={option} value={option}>
          {option}
        </Radio>
      ))}
    </RadioGroupField>
  ) : null;
});

export default Field;
