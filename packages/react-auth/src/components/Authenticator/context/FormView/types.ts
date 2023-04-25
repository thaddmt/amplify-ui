import { WithContextProps } from '@aws-amplify/ui-react-core';

import {
  FieldValues,
  FormHandle,
  HandleSubmit,
  FormProps,
  OnSubmit,
} from '@aws-amplify/ui-react-core-auth';
import { DisplayTextProviderProps } from '../../DisplayText';

export type FormViewContextType<T extends FieldValues = FieldValues> = {
  isDisabled: boolean;
  onSubmit?: OnSubmit<T>;
  handleSubmit?: HandleSubmit<T>;
};

export type WithFormView<P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<FormHandle>
>;

export type FormViewProps<T extends FieldValues = FieldValues> = Omit<
  FormProps<T>,
  'defaultValues'
>;

export type WithFormViewProps<P> = WithContextProps<
  FormViewProps & DisplayTextProviderProps,
  P
>;
