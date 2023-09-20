/// <reference types="react" />
import { DescriptionControl } from './DescriptionControl';
import { FormControl } from './FormControl';
import { TitleControl } from './TitleControl';
export declare const Controls: {
    Actions: (() => JSX.Element) & {
        ButtonGroup: (props: {} | {
            children?: import("react").ReactNode;
        }) => JSX.Element;
        PrimaryButton: ({ children: _children, isDisabled: isDisabledOverride, ...props }: {
            children?: import("react").ReactNode;
            isDisabled?: boolean | undefined;
            type?: "submit" | undefined;
        } | ({
            children?: import("react").ReactNode;
            isDisabled?: boolean | undefined;
            type?: "submit" | undefined;
        } & {
            children?: import("react").ReactNode;
        })) => JSX.Element | null;
        SecondaryButton: ({ children: _children, ...props }: {
            children?: import("react").ReactNode;
            isDisabled?: boolean | undefined;
            type?: "button" | undefined;
        } | ({
            children?: import("react").ReactNode;
            isDisabled?: boolean | undefined;
            type?: "button" | undefined;
        } & {
            children?: import("react").ReactNode;
        })) => JSX.Element | null;
    };
    Description: typeof DescriptionControl;
    Form: typeof FormControl;
    Title: typeof TitleControl;
    SetupTotp: (() => JSX.Element) & import("../Provider").SetupTotpComponents<unknown>;
};
