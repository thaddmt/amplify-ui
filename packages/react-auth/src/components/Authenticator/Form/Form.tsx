import React, { createContext, isValidElement } from 'react';
import {
  useForm,
  UseFormProps,
  useFormContext,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
  UseFormGetFieldState,
  FormProvider,
  // UseFormRegister,
  // UseFormReturn,
} from 'react-hook-form';

import { Button, Flex } from '@aws-amplify/ui-react';

function mergeRefs<T = unknown>(
  refs: (
    | React.MutableRefObject<T>
    | React.LegacyRef<T>
    | React.RefCallback<T>
  )[]
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

// type InferValues<T extends Record<string, string>> = T extends Record<
//   infer Key,
//   infer Value
// >
//   ? Record<Key, Value>
//   : never;
// type Hehe = InferValues<{ name: string }>;

// type FormData = { [key: string]: string };

// @todo should these types just have only common props?
type ButtonControlChildProps = Parameters<typeof Button>[0];

// interface BaseOption<
//   Name extends string = string,
//   Type extends ControlType = ControlType,
//   ElementType = OptionElementType<Type>
// > extends Omit<FieldControlProps, "children"> {
//   label: string;
//   name: Name;
//   placeholder?: string;
//   onBlur?: React.FocusEventHandler<ElementType>;
//   onChange?: React.FocusEventHandler<ElementType>;
// }
type FieldElementType<Type extends FieldControlType> = Type extends
  | 'text'
  | 'password'
  | 'tel'
  ? HTMLInputElement
  : Type extends 'select'
  ? HTMLSelectElement
  : never;

type FieldControlChildProps<
  Name extends string = string,
  Type extends FieldControlType = FieldControlType,
  ElementType = FieldElementType<Type>
> = {
  // added for radio
  children?: React.ReactNode | React.ReactNode;
  onBlur?: React.FocusEventHandler<ElementType>;
  onChange?: React.ChangeEventHandler<ElementType>;
  name: Name;
  ref: React.Ref<ElementType>;
  type: Type;
};

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

type FormHandle = {
  reset: () => void;
};

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

export interface FieldControlProps {
  children?: React.ReactNode;
  isDisabled?: boolean;
  isReadonly?: boolean;
  isRequired?: boolean;
  validate?: Validator | Record<string, Validator>;
  type: FieldControlType;
}

interface ButtonControlProps {
  children?: React.ReactNode;
  isDisabled?: boolean;
  type: 'button' | 'reset' | 'submit';
}

export type FieldControlContextType<Values extends FieldValues = FieldValues> =
  UseFormRegisterReturn & ReturnType<UseFormGetFieldState<Values>>;

const FieldControlContext = createContext<FieldControlContextType | null>(null);

export function useFieldControl(): FieldControlContextType {
  const context = React.useContext(FieldControlContext);

  if (!context) {
    // @todo maybe this is just a silent failure?
    // eslint-disable-next-line no-console
    throw new Error('No context access here :(');
  }
  return context;
}

export function FieldControlProvider({
  children,
  name,
  // setValueAs,
  validate,
}: {
  children: React.ReactNode;
  name: string;
  // setValueAs?: (value: string) => string;
  validate?: Validator | Record<string, Validator>;
}): JSX.Element {
  const { formState, getFieldState, register } = useFormContext();
  // @todo explain destructure
  const { error, isDirty, isTouched, invalid } = getFieldState(name, formState);

  // @todo explain this
  const valueRef = React.useRef(register(name, { validate }));
  const value = React.useMemo(
    () => ({ ...valueRef.current, error, invalid, isDirty, isTouched }),
    [error, invalid, isDirty, isTouched]
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

const FieldControl = React.forwardRef<HTMLInputElement, FieldControlProps>(
  function FieldControl({ children, type, validate }, controlRef) {
    const { getFieldState, register, formState } = useFormContext();

    const cloneChildElement = React.useCallback(
      (child: React.ReactNode) => {
        if (Array.isArray(child)) {
          // eslint-disable-next-line no-console
          console.warn(
            'Form.Control children should be a single React element'
          );
          return null;
        }

        if (!React.isValidElement<FieldControlChildProps>(child)) {
          return null;
        }
        const { children, name, onBlur, onChange } = child.props;

        if (type === 'radio') {
          // radio group options may have be nested within a parent view

          const radioRegisterProps = register(name, { validate });

          const handleChange: FieldControlChildProps['onChange'] = (e) => {
            if (onChange) {
              // pass the event regardless of shape to child onChange
              onChange(e);
            }

            // in components that do not have an HTML element equivalent such as radio groups,
            // a standard practice is to pass a string value as the event param of onChange, which
            // conflicts with the shape of the event required by react-hook-form. In order to
            // achieve the correct behavior for validation and change events, wrap...
            const changeEvent =
              typeof e === 'string' ? { target: { value: e } } : e;

            radioRegisterProps.onChange(changeEvent);
          };

          const clonedChildren = Array.isArray(children)
            ? (children as React.ReactNode[]).map((radioChild) => {
                if (isValidElement<FieldControlChildProps>(radioChild)) {
                  return React.cloneElement(radioChild, {
                    ...radioChild.props,
                    ...radioRegisterProps,
                    onChange: handleChange,
                    ref: mergeRefs([controlRef, radioRegisterProps.ref]),
                  });
                }
                return null;
              })
            : null;

          return React.cloneElement(child, {
            ...child.props,
            ...radioRegisterProps,
            children: clonedChildren,
            onChange: handleChange,
          });
        }

        const { error } = getFieldState(name, formState);

        const registerProps = register(name, { validate });

        const handleBlur: FieldControlChildProps['onBlur'] = (e) => {
          if (onBlur) {
            onBlur(e);
          }
          registerProps.onBlur(e);
        };

        const handleChange: FieldControlChildProps['onChange'] = (e) => {
          if (onChange) {
            onChange(e);
          }
          registerProps.onChange(e);
        };

        const props = {
          ...child.props,
          ...registerProps,
          errorMessage: error?.message,
          hasError: !!error,
          onBlur: handleBlur,
          onChange: handleChange,
          ref: mergeRefs([controlRef, registerProps.ref]),
        };

        return React.cloneElement(child, props);
      },
      [controlRef, getFieldState, formState, register, type, validate]
    );

    return cloneChildElement(children);
  }
);

type FormComponent = React.ForwardRefExoticComponent<
  FormProps<FieldValues> & React.RefAttributes<FormHandle>
> & {
  ButtonControl: typeof ButtonControl;
  FieldControl: typeof FieldControl;
  FieldControlProvider: typeof FieldControlProvider;
};

// ignore missing control elements assigned below declaration
// @ts-expect-error
const Form: FormComponent = React.forwardRef(function Form<
  Init extends FieldValues
>(
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

  const handleSubmit = React.useMemo(
    () => _handleSubmit(onSubmit ?? (() => null)),
    [_handleSubmit, onSubmit]
  );

  if (!children) {
    return null;
  }

  return (
    <FormProvider {...formProviderProps}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit}>{children}</form>
    </FormProvider>
  );
});

Form.FieldControl = FieldControl;
Form.FieldControlProvider = FieldControlProvider;
Form.ButtonControl = ButtonControl;

export default Form;
