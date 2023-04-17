import React, { createContext, isValidElement } from 'react';
import {
  useForm,
  UseFormProps,
  useFormContext,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
  UseFormGetFieldState,
  FormProvider as ReactHookFormProvider,
  useFormState as useReactHookFormState,
  FormState,
  // UseFormRegister,
  // UseFormReturn,
} from 'react-hook-form';

import { Button, Flex } from '@aws-amplify/ui-react';
import { Prettify } from '@aws-amplify/ui';

// @todo should these types just have only common props?
type ButtonControlChildProps = Parameters<typeof Button>[0];

type FieldValues = Record<string, string>;

type HandleSubmit<T extends FieldValues> = Parameters<
  UseFormHandleSubmit<T>
>[0];
type InitialValues<T extends FieldValues> = UseFormProps<T>['defaultValues'];

export type FormProps<T extends FieldValues> = {
  onReset?: (values: T) => void;
  onSubmit?: HandleSubmit<T>;
  children: React.ReactNode;
  Container?: typeof Flex;
  initialValues?: InitialValues<T>;
};

type FormHandle = { reset: () => void };

type Validator = (
  value: string,
  values: Record<string, string>
) => string | undefined;

export type FieldControlType =
  | 'checkbox'
  | 'email'
  | 'password'
  | 'tel'
  | 'select'
  | 'radio'
  | 'text';

export interface ButtonControlProps {
  children?: React.ReactNode;
  isDisabled?: boolean;
  type: 'button' | 'reset' | 'submit';
}

export interface ButtonControlProviderProps {
  children?: React.ReactNode;
}

type FormStateContextType<Values extends FieldValues = FieldValues> =
  FormState<Values> & { handleSubmit: UseFormHandleSubmit<Values> };

type ButtonControlContextType = { isValid: boolean };

export type FieldControlContextType<Values extends FieldValues = FieldValues> =
  Prettify<UseFormRegisterReturn & ReturnType<UseFormGetFieldState<Values>>>;

const ButtonControlContext = createContext<ButtonControlContextType | null>(
  null
);
const FieldControlContext = createContext<FieldControlContextType | null>(null);
const FormStateContext = createContext<FormStateContextType | null>(null);

export function useFieldControl(): FieldControlContextType {
  const context = React.useContext(FieldControlContext);

  if (!context) {
    // @todo add better error message
    throw new Error('No context access here :(');
  }
  return context;
}

export function useButtonControl(): ButtonControlContextType {
  const context = React.useContext(ButtonControlContext);

  if (!context) {
    // @todo add better error message
    throw new Error('No context access here :(');
  }
  return context;
}

export function useFormState(): FormStateContextType {
  const context = React.useContext(FormStateContext);

  if (!context) {
    // @todo add better error message
    throw new Error('No context access here :(');
  }
  return context;
}

export interface FieldControlProviderProps {
  children: React.ReactNode;
  name: string;
  // setValueAs?: (value: string) => string;
  validate?: Validator | Record<string, Validator>;
}
// @todo Control prop?
export function FieldControlProvider({
  children,
  name,
  // setValueAs,
  validate,
}: FieldControlProviderProps): JSX.Element {
  const { formState, getFieldState, register } = useFormContext();
  // @todo explain destructure
  const { error, isDirty, isTouched, invalid } = getFieldState(name, formState);

  // @todo don't think the ref is needed but keeping the code in case it all falls apart again
  // const valueRef = React.useRef(register(name, { validate }));
  const value = React.useMemo(
    // () => ({ ...valueRef.current, error, invalid, isDirty, isTouched }),
    () => ({
      ...register(name, { validate }),
      error,
      invalid,
      isDirty,
      isTouched,
    }),
    // [error, invalid, isDirty, isTouched]
    [error, invalid, isDirty, isTouched, name, register, validate]
  );

  return (
    <FieldControlContext.Provider value={value}>
      {children}
    </FieldControlContext.Provider>
  );
}

// @todo wrap with forwardRef, merge refs?
const ButtonControl = ({ children, type }: ButtonControlProps) => {
  const {
    formState: { isValid },
  } = useFormContext();

  if (!children || Array.isArray(children)) {
    // eslint-disable-next-line no-console
    console.warn('Form.Control children should be a single React element');
    return null;
  }

  if (isValidElement<ButtonControlChildProps>(children)) {
    const { isDisabled, type: childrenType } = children.props;
    return React.cloneElement(children, {
      ...children.props,
      isDisabled: isDisabled ?? !isValid,
      type: childrenType ?? type,
    });
  }

  return <>{children}</>;
};

const ButtonControlProvider = ({ children }: ButtonControlProviderProps) => {
  const {
    formState: { isValid },
  } = useFormContext();

  const value = React.useMemo(() => ({ isValid }), [isValid]);

  return (
    <ButtonControlContext.Provider value={value}>
      {children}
    </ButtonControlContext.Provider>
  );
};

const FormStateProvider = ({ children }: ButtonControlProviderProps) => {
  const value = useReactHookFormState();
  const { handleSubmit } = useFormContext();

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <FormStateContext.Provider value={{ ...value, handleSubmit }}>
      {children}
    </FormStateContext.Provider>
  );
};

export type FormComponent = React.ForwardRefExoticComponent<
  FormProps<FieldValues> & React.RefAttributes<FormHandle>
>;

const FormFlex = ({
  children,
  onSubmit,
}: {
  children?: React.ReactNode;
  onSubmit?: FormProps<FieldValues>['onSubmit'];
}) => {
  const { handleSubmit: _handleSubmit } = useFormState();

  const handleSubmit = React.useMemo(
    () => _handleSubmit(onSubmit ?? (() => null)),
    [_handleSubmit, onSubmit]
  );

  return (
    <Flex
      // @todo move style to classes
      data-amplify-container=""
      direction="column"
      as="form"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
    >
      {children}
    </Flex>
  );
};

const Form = React.forwardRef(function Form<Init extends FieldValues>(
  {
    children,
    initialValues: defaultValues,
    // onReset,
    onSubmit,
  }: FormProps<Init>,
  ref: React.ForwardedRef<FormHandle>
): JSX.Element | null {
  const formProviderProps = useForm<Init>({
    defaultValues,
    mode: 'all',
  });

  const { reset } = formProviderProps;
  React.useImperativeHandle(ref, () => ({ reset }), [reset]);

  const { handleSubmit: _handleSubmit } = formProviderProps;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = React.useMemo(
    () => _handleSubmit(onSubmit ?? (() => null)),
    [_handleSubmit, onSubmit]
  );

  if (!children) {
    return null;
  }

  return (
    <ReactHookFormProvider {...formProviderProps}>
      <FormFlex>{children}</FormFlex>
    </ReactHookFormProvider>
  );
});

// Form.FieldControlProvider = FieldControlProvider;
// Form.ButtonControl = ButtonControl;

export default Object.assign(Form, {
  FieldControlProvider,
  FormStateProvider,
  ButtonControl,
  ButtonControlProvider,
});
