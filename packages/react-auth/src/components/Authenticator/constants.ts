import { countryDialCodes, LoginMechanism } from '@aws-amplify/ui';
import { AuthenticatorRouteComponentKey } from '@aws-amplify/ui-react-core';
import {
  FieldOptions,
  PasswordFieldOptions,
  TextFieldOptions,
  PhoneNumberFieldOptions,
} from './Form';

const USERNAME_BASE = {
  isRequired: true,
  name: 'username',
};

export const USERNAME_EMAIL: TextFieldOptions = {
  ...USERNAME_BASE,
  label: 'Email',
  placeholder: 'Enter your Email',
  type: 'email',
  autoComplete: 'username',
  isRequired: true,
};

export const USERNAME_TEXT: TextFieldOptions = {
  ...USERNAME_BASE,
  label: 'Username',
  placeholder: 'Enter your Username',
  autoComplete: 'username',
  type: 'text',
  // validate: (value?: string) => (!value ? 'Username is required' : undefined),
};

export const USERNAME_PHONE: PhoneNumberFieldOptions = {
  ...USERNAME_BASE,
  autoComplete: 'tel',
  defaultDialCode: '+1',
  dialCodeList: countryDialCodes,
  isRequired: true,
  label: 'Phone Number',
  placeholder: 'Enter your Phone Number',
  type: 'tel',
  // validate: (value?: string) =>
  //   !value ? 'Phone Number is required' : undefined,
};

export const PASSWORD: PasswordFieldOptions = {
  autoComplete: 'current-password',
  isRequired: true,
  label: 'Password',
  name: 'password',
  placeholder: 'Enter your Password',
  type: 'password',
  // validate: {
  //   required: (value) => (!value ? 'Password is required' : undefined),
  //   includesNumber: (value) =>
  //     /\d+/.test(value) ? undefined : 'Password must contain a number',
  //   minLength: (value) =>
  //     value?.length >= 8
  //       ? undefined
  //       : 'Password length must exceed 8 characters',
  // },
};

export const PRIMARY_ALIAS: Record<LoginMechanism, FieldOptions> = {
  email: USERNAME_EMAIL,
  phone_number: USERNAME_PHONE,
  username: USERNAME_TEXT,
};

// label: 'Confirm Password',
//     placeholder: 'Please confirm your Password',
//     type: 'password',
//     autocomplete: 'new-password',
//     isRequired: true,
export const CONFIRM_PASSWORD: FieldOptions = {
  label: 'Confirm Password',
  name: 'confirmPassword',
  placeholder: 'Confirm password',
  type: 'password',
  // validate: {
  //   confirm: (value, values) => {
  //     if (value !== values['password']) {
  //       return 'Passwords do not match';
  //     }
  //   },
  // },
};

const SIGN_IN_FIELDS: FieldOptions[] = [USERNAME_TEXT, PASSWORD];

export const DEFAULT_FIELDS: Partial<
  Record<AuthenticatorRouteComponentKey, FieldOptions[]>
> = {
  signIn: SIGN_IN_FIELDS,
  // signUp: [{ type: 'text', label: }]
};

export const radioOptions: FieldOptions = {
  label: 'Choose a cat',
  name: 'radio',
  options: ['Calico', 'Russian Blue'],
  type: 'radio',
  // validate: (value) => {
  //   return value ? undefined : 'Must select a cat';
  // },
};

export const selectOptions: FieldOptions = {
  label: 'Level of Excitement',
  name: 'excitement',
  options: ['High', 'Very High'],
  placeholder: 'Select a level',
  type: 'select',
};

export const checkboxOptions: FieldOptions = {
  type: 'checkbox',
  label: 'Click to acknowledge',
  name: 'acknowledgement',
  value: 'true',
  // validate: (value) => (value ? undefined : 'Acknowledge me'),
};
