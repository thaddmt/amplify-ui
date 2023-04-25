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
import {
  FormFieldProvider,
  useFormField,
} from '@aws-amplify/ui-react-core-auth';

import {
  BaseFieldComponent,
  CheckboxFieldOptions,
  FieldProps,
  PasswordFieldOptions,
  PhoneNumberFieldOptions,
  RadioGroupFieldOptions,
  SelectFieldOptions,
  TextFieldOptions,
} from './types';

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
  const { name, onBlur, onChange, ref } = useFormField();

  // @todo combine handlers, merge ref?
  const combinedProps = { ...props, name, onBlur, onChange, ref };
  return <PhoneNumberField.DialCodeSelect {...combinedProps} />;
};

const ComposedDialCodeSelect = (props: DialCodeSelectProps) => (
  <FormFieldProvider name="dial_code">
    <DialCodeSelect {...props} />
  </FormFieldProvider>
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

// type FieldElementType<Type extends FormFieldProviderType> = Type extends
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
// type FieldPropsRef<Type extends FormFieldProviderType> = UnwrapRef<FieldProps<Type>['ref']>;

// const Field = React.forwardRef(function Field<Type extends FormFieldProviderType>(
const BaseField: BaseFieldComponent = (
  props
  // @todo mergeRefs?
  // ref: React.ForwardedRef<any>
) => {
  const { error, name, onBlur, onChange, ref } = useFormField();
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
};
// });

export function Field({
  Control = BaseField,
  name,
  validate,
  ...rest
}: FieldProps): JSX.Element {
  return (
    <FormFieldProvider key={name} name={name} validate={validate}>
      <Control {...rest} name={name} />
    </FormFieldProvider>
  );
}

export default Field;
