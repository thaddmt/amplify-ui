import React from 'react';
import { AuthenticatorProps as AuthenticatorPropsBase } from '@aws-amplify/ui-react-core-auth';
import { RenderNothing } from '@aws-amplify/ui-react-core';
import { ButtonProps, MessageColorTheme, MessageProps } from '@aws-amplify/ui-react';
declare function PrimaryButton(props: ButtonProps & {
    type?: 'submit';
}): JSX.Element;
declare function SecondaryButton(props: ButtonProps): JSX.Element;
declare function ProviderButton(props: ButtonProps): JSX.Element;
export declare const PRIMITIVES: {
    Actions: {
        ButtonGroup: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseButtonGroupProps, "div">;
        PrimaryButton: typeof PrimaryButton;
        SecondaryButton: typeof SecondaryButton;
    };
    Container: typeof RenderNothing;
    Description: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseTextProps, "p">;
    FederatedProviders: {
        ButtonGroup: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseButtonGroupProps, "div">;
        Button: typeof ProviderButton;
        Divider: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseDividerProps, "hr">;
    };
    Field: typeof RenderNothing;
    Fieldset: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseFieldsetProps, "fieldset">;
    Form: React.ForwardRefExoticComponent<Pick<import("@aws-amplify/ui-react-core").MergeProps<Omit<import("@aws-amplify/ui-react").PrimitivePropsWithAs<import("@aws-amplify/ui-react").BaseViewProps, "form">, "ref"> & React.RefAttributes<HTMLFormElement>, Pick<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "key" | keyof React.FormHTMLAttributes<HTMLFormElement>>>, "as" | keyof import("@aws-amplify/ui-react").BaseViewProps | "key" | "slot" | "title" | "acceptCharset" | "action" | "autoComplete" | "encType" | "method" | "name" | "noValidate" | "target" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "contentEditable" | "contextMenu" | "dir" | "draggable" | "hidden" | "lang" | "placeholder" | "spellCheck" | "tabIndex" | "translate" | "radioGroup" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "inputMode" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture"> & React.RefAttributes<HTMLFormElement>>;
    Message: (props: Omit<MessageProps, 'colorScheme'> & {
        messageType?: MessageColorTheme;
    }) => JSX.Element;
    Title: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseHeadingProps, import("@aws-amplify/ui-react").HeadingTag>;
    Links: {
        Button: typeof RenderNothing;
        ButtonGroup: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseButtonGroupProps, "div">;
    };
    SetupTotp: {
        Container: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseViewProps, "div">;
        CopyButton: typeof RenderNothing;
        InstructionTextOne: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseTextProps, "p">;
        InstructionTextTwo: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseTextProps, "p">;
        InstructionTextThree: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseTextProps, "p">;
        Loader: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseLoaderProps, "svg">;
        Image: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseImageProps, "img">;
    };
    VerifyContactMethod: {
        Container: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseViewProps, "div">;
        RadioGroup: typeof RenderNothing;
    };
};
export interface AuthenticatorProps extends AuthenticatorPropsBase<'react'> {
}
export declare const Authenticator: import("@aws-amplify/ui-react-core-auth/dist/types/components/Authenticator/types").AuthenticatorComponent<import("@aws-amplify/ui-react-core-auth/dist/types/components/Authenticator/Provider").PrimitivesDefault<"react">>;
export declare const AuthenticatorComposable: import("@aws-amplify/ui-react-core-auth/dist/types/components/Authenticator/types").AuthenticatorComposable<{
    Actions: {
        ButtonGroup: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseButtonGroupProps, "div">;
        PrimaryButton: typeof PrimaryButton;
        SecondaryButton: typeof SecondaryButton;
    };
    Container: typeof RenderNothing;
    Description: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseTextProps, "p">;
    FederatedProviders: {
        ButtonGroup: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseButtonGroupProps, "div">;
        Button: typeof ProviderButton;
        Divider: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseDividerProps, "hr">;
    };
    Field: typeof RenderNothing;
    Fieldset: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseFieldsetProps, "fieldset">;
    Form: React.ForwardRefExoticComponent<Pick<import("@aws-amplify/ui-react-core").MergeProps<Omit<import("@aws-amplify/ui-react").PrimitivePropsWithAs<import("@aws-amplify/ui-react").BaseViewProps, "form">, "ref"> & React.RefAttributes<HTMLFormElement>, Pick<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "key" | keyof React.FormHTMLAttributes<HTMLFormElement>>>, "as" | keyof import("@aws-amplify/ui-react").BaseViewProps | "key" | "slot" | "title" | "acceptCharset" | "action" | "autoComplete" | "encType" | "method" | "name" | "noValidate" | "target" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "contentEditable" | "contextMenu" | "dir" | "draggable" | "hidden" | "lang" | "placeholder" | "spellCheck" | "tabIndex" | "translate" | "radioGroup" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "inputMode" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture"> & React.RefAttributes<HTMLFormElement>>;
    Message: (props: Omit<MessageProps, 'colorScheme'> & {
        messageType?: MessageColorTheme;
    }) => JSX.Element;
    Title: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseHeadingProps, import("@aws-amplify/ui-react").HeadingTag>;
    Links: {
        Button: typeof RenderNothing;
        ButtonGroup: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseButtonGroupProps, "div">;
    };
    SetupTotp: {
        Container: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseViewProps, "div">;
        CopyButton: typeof RenderNothing;
        InstructionTextOne: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseTextProps, "p">;
        InstructionTextTwo: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseTextProps, "p">;
        InstructionTextThree: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseTextProps, "p">;
        Loader: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseLoaderProps, "svg">;
        Image: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseImageProps, "img">;
    };
    VerifyContactMethod: {
        Container: import("@aws-amplify/ui-react").ForwardRefPrimitive<import("@aws-amplify/ui-react").BaseViewProps, "div">;
        RadioGroup: typeof RenderNothing;
    };
}>;
export {};
