import React from 'react';
import ReactNative from 'react-native';
/********************************/
/** Platform primitive helpers **/
/********************************/
export type ButtonHandler<T> = T extends 'react' ? {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} : T extends 'react-native' ? {
    onPress?: (event: ReactNative.GestureResponderEvent) => void;
} : unknown;
type ImgSrc<T> = T extends 'react' ? {
    src?: string;
} : T extends 'react-native' ? {
    source?: string;
} : unknown;
interface BlurHandler<T> {
    onBlur?: (event: T extends 'react' ? React.FocusEvent<HTMLInputElement> : T extends 'react-native' ? ReactNative.NativeSyntheticEvent<ReactNative.TextInputFocusEventData> : unknown) => void;
}
interface ChangeHandler<T> {
    onChange?: (event: T extends 'react' ? React.ChangeEvent<HTMLInputElement> : T extends 'react-native' ? ReactNative.NativeSyntheticEvent<ReactNative.TextInputChangeEventData> : unknown) => void;
}
interface ChangeTextHandler<T> {
    onChangeText?: T extends 'react-native' ? (event: string) => void : never;
}
export interface SubmitHandler<T> {
    onSubmit?: (e: T extends 'react' ? React.FormEvent<HTMLFormElement> : React.BaseSyntheticEvent) => void;
}
/*******************************/
/** Primitive component types **/
/*******************************/
export type ButtonComponent<P, V extends ButtonVariants> = React.ComponentType<ButtonHandler<P> & {
    children?: React.ReactNode;
    isDisabled?: boolean;
    type?: ButtonType<V>;
}>;
type ButtonVariants = 'copy' | 'link' | 'outline' | 'primary' | 'secondary';
type ButtonType<V extends ButtonVariants> = V extends 'primary' ? 'submit' : 'button';
export type CopyButtonComponent<T> = ButtonComponent<T, 'copy'>;
export type LinkButtonComponent<T> = ButtonComponent<T, 'link'>;
export type PrimaryButtonComponent<T> = ButtonComponent<T, 'primary'>;
export type ProviderButtonComponent<T> = ButtonComponent<T, 'outline'>;
export type SecondaryButtonComponent<T> = ButtonComponent<T, 'secondary'>;
export type ButtonGroupComponent = React.ComponentType;
export type ImageComponent<T> = React.ComponentType<{
    children?: React.ReactNode;
} & ImgSrc<T>>;
export type MessageComponent = React.ComponentType<{
    messageType?: 'info' | 'error';
}>;
export type ContainerViewComponent = React.ComponentType<{
    variation?: 'default' | 'modal';
}>;
export type LoaderComponent = React.ComponentType;
export type ViewComponent = React.ComponentType;
export type FormComponent<T> = React.ComponentType<SubmitHandler<T>>;
export type FieldsetComponent = React.ComponentType<{
    isDisabled?: boolean;
}>;
type FieldType = 'checkbox' | 'email' | 'password' | 'radio' | 'select' | 'tel' | 'text';
interface FieldProps<P, T> extends ChangeHandler<P>, ChangeTextHandler<P>, BlurHandler<P> {
    errorMessage?: boolean;
    hasError?: boolean;
    name: string;
    type?: T;
}
export type FieldComponent<P, T extends FieldType = FieldType> = React.ComponentType<FieldProps<P, T>>;
export type RadioGroupComponent<P = unknown> = FieldComponent<P, 'radio'>;
/*****************************/
/** Control component types **/
/*****************************/
export type ComplexControlName = 'Actions' | 'Links' | 'SetupTotp' | 'FederatedProviders' | 'VerifyContactMethod';
export type PrimitiveControlName = 'Container' | 'Description' | 'Field' | 'Fieldset' | 'Form' | 'Message' | 'Title';
export type ControlComponents = Record<ControlName, any>;
export type PrimitiveControlComponents = Record<PrimitiveControlName, any>;
/**
 * `Top level Control Component Names
 */
export type ControlName = PrimitiveControlName | ComplexControlName;
export interface ActionsComponents<P> {
    ButtonGroup: ButtonGroupComponent;
    PrimaryButton: PrimaryButtonComponent<P>;
    SecondaryButton: SecondaryButtonComponent<P>;
}
export interface LinksComponents<P> {
    Button: LinkButtonComponent<P>;
    ButtonGroup: ButtonGroupComponent;
}
export interface FederatedProvidersComponents<P> {
    Button: ProviderButtonComponent<P>;
    ButtonGroup: ButtonGroupComponent;
    Divider: ViewComponent;
}
export interface SetupTotpComponents<P> {
    Container: ViewComponent;
    CopyButton: CopyButtonComponent<P>;
    Image: ImageComponent<P>;
    InstructionTextOne: ViewComponent;
    InstructionTextTwo: ViewComponent;
    InstructionTextThree: ViewComponent;
    Loader: LoaderComponent;
}
export interface VerifyContactMethodComponents<P> {
    Container: ViewComponent;
    RadioGroup: RadioGroupComponent<P>;
}
/**
 * Primitive and complex Control Components. Provide optional `Platform` generic
 * for `platform` specific types
 */
export interface PrimitivesDefault<Platform = unknown> extends ControlComponents {
    Actions: ActionsComponents<Platform>;
    Container: ContainerViewComponent;
    Description: ViewComponent;
    Field: FieldComponent<Platform>;
    Fieldset: FieldsetComponent;
    FederatedProviders: FederatedProvidersComponents<Platform>;
    Form: FormComponent<Platform>;
    Links: LinksComponents<Platform>;
    Message: MessageComponent;
    SetupTotp: SetupTotpComponents<Platform>;
    Title: ViewComponent;
    VerifyContactMethod: VerifyContactMethodComponents<Platform>;
}
export interface PrimitiveControls<Platform = unknown> {
    Container: ContainerViewComponent;
    Description: ViewComponent;
    Field: FieldComponent<Platform>;
    Fieldset: FieldsetComponent;
    Form: FormComponent<Platform>;
    Message: MessageComponent;
    Title: ViewComponent;
}
export {};
