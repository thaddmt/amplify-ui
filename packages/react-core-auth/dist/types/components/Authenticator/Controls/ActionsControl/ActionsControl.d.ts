import React from 'react';
import { ButtonGroupComponent, PrimaryButtonComponent, SecondaryButtonComponent } from '../../Provider';
type ButtonGroupProps = React.ComponentProps<ButtonGroupComponent>;
type PrimaryButtonProps<P = unknown> = React.ComponentProps<PrimaryButtonComponent<P>>;
type SecondaryButtonProps<P = unknown> = React.ComponentProps<SecondaryButtonComponent<P>>;
declare function PrimaryButtonControl({ children: _children, isDisabled: isDisabledOverride, ...props }: PrimaryButtonProps): JSX.Element | null;
declare function SecondaryButtonControl({ children: _children, ...props }: SecondaryButtonProps): JSX.Element | null;
declare function ButtonGroupControl(props: ButtonGroupProps): JSX.Element;
declare function ActionsControlBase(): JSX.Element;
export declare const ActionsControl: typeof ActionsControlBase & {
    ButtonGroup: typeof ButtonGroupControl;
    PrimaryButton: typeof PrimaryButtonControl;
    SecondaryButton: typeof SecondaryButtonControl;
};
export {};
