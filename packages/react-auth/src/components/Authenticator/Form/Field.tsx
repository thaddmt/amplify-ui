import React from 'react';
import { Prettify } from '@aws-amplify/ui';

import {
  CheckboxField,
  PasswordField,
  PhoneNumberField,
  Radio,
  RadioGroupField,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';
import { default as Form, FieldControlType, useFieldControl } from './Form';

type BaseFieldOptions<Type extends FieldControlType> = {
  label: string;
  name: string;
  type: Type;
};

export type PhoneNumberFieldOptions = Prettify<
  Parameters<typeof PhoneNumberField>[0] & BaseFieldOptions<'tel'>
>;

export type CheckboxFieldOptions = Prettify<
  Parameters<typeof CheckboxField>[0] & BaseFieldOptions<'checkbox'>
>;

export type TextFieldOptions = Prettify<
  Parameters<typeof TextField>[0] & BaseFieldOptions<'text' | 'email'>
>;

export type PasswordFieldOptions = Prettify<
  Parameters<typeof PasswordField>[0] & BaseFieldOptions<'password'>
>;

export type SelectFieldOptions = Prettify<
  Parameters<typeof SelectField>[0] & BaseFieldOptions<'select'>
>;

export type RadioGroupFieldOptions = Prettify<
  Parameters<typeof RadioGroupField>[0] &
    BaseFieldOptions<'radio'> & { options: string[] }
>;

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

type DialCodeSelectProps = Parameters<
  typeof PhoneNumberField.DialCodeSelect
>[0];

const DialCodeSelect = (props: DialCodeSelectProps) => {
  const { name, onBlur, onChange, ref } = useFieldControl();

  // @todo combine handlers, merge ref?
  const combinedProps = { ...props, name, onBlur, onChange, ref };
  return <PhoneNumberField.DialCodeSelect {...combinedProps} />;
};

const ComposedDialCodeSelect = (props: DialCodeSelectProps) => (
  <Form.FieldControlProvider name="dial_code">
    <DialCodeSelect {...props} />
  </Form.FieldControlProvider>
);

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupFieldOptions>(
  function RadioGroup({ options, ...props }, ref) {
    return (
      <RadioGroupField {...props} ref={ref}>
        {options.map((option) => (
          // @todo do Radio options also need the ref?
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </RadioGroupField>
    );
  }
);

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

// const Field = React.forwardRef(function Field<Type extends FieldControlType>(

function Field<Type extends FieldControlType>(
  props: FieldProps<Type>
  // @todo mergeRefs?
  // ref: React.ForwardedRef<any>
): JSX.Element | null {
  const { error, name, onBlur, onChange, ref } = useFieldControl();
  const errorMessage = (error as { message?: string })?.message;

  const hasError = !!errorMessage;

  // @todo combine handlers, add util
  const combinedProps = {
    ...props,
    name,
    onBlur,
    onChange,
    ref,
    errorMessage,
    hasError,
  };

  return isSelectFieldOptions(combinedProps) ? (
    <SelectField {...combinedProps} />
  ) : isTextFieldOptions(combinedProps) ? (
    <TextField {...combinedProps} />
  ) : isPasswordFieldOptions(combinedProps) ? (
    <PasswordField {...combinedProps} />
  ) : isCheckboxFieldOptions(combinedProps) ? (
    <CheckboxField {...combinedProps} />
  ) : isPhoneNumberFieldOptions(combinedProps) ? (
    <PhoneNumberField
      {...combinedProps}
      DialCodeSelect={ComposedDialCodeSelect}
    />
  ) : isRadioGroupFieldOptions(combinedProps) ? (
    <RadioGroup {...combinedProps} />
  ) : null;
}
// });
export default Field;
