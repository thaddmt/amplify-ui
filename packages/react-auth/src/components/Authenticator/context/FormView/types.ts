import { WithContextProps } from '@aws-amplify/ui-react-core';

import { DisplayTextProviderProps } from '../DisplayText';
import { FieldValues, FormHandle, HandleSubmit, OnSubmit } from '../../Form';

export type FormViewContextType<T extends FieldValues = FieldValues> = {
  // onReset?: () => void;
  onSubmit?: OnSubmit<T>;
  handleSubmit?: HandleSubmit<T>;
  // defaultValues?: InitialValues<T>;
  isDisabled?: boolean;
};

export type WithFormViewProps<P> = WithContextProps<
  FormViewContextType & DisplayTextProviderProps,
  P
>;

export type WithFormView<P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<FormHandle>
>;

export interface FormViewProps {
  children?: React.ReactNode;
}
