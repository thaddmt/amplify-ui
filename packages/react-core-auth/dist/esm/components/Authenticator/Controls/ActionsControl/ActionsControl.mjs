import { __rest } from '../../../../node_modules/@rollup/plugin-typescript/node_modules/tslib/tslib.es6.mjs';
import React from 'react';
import '../../Provider/DisplayText/DisplayTextContext.mjs';
import { isTypedFunction, noop } from '@aws-amplify/ui';
import '../../Provider/ComponentRoute/ComponentRouteContext.mjs';
import { useActions } from '../../Provider/hooks/useActions.mjs';
import '@aws-amplify/ui-react-core';
import '../../Provider/Machine/MachineContext.mjs';
import '@aws-amplify/core';
import 'qrcode';
import '../../Provider/Mfa/MfaContext.mjs';
import { usePlatform, isReactNative } from '../../Provider/Platform/PlatformContext.mjs';
import { usePrimitives } from '../../Provider/Primitives/PrimitivesContext.mjs';

function PrimaryButtonControl(_a) {
    var { children: _children, isDisabled: isDisabledOverride = false } = _a, props = __rest(_a, ["children", "isDisabled"]);
    const { platform } = usePlatform();
    const { Actions: { PrimaryButton }, } = usePrimitives();
    const { isPrimaryButtonDisabled, primaryButtonAction, primaryButtonText } = useActions();
    const children = _children !== null && _children !== void 0 ? _children : primaryButtonText;
    const isDisabled = isDisabledOverride || isPrimaryButtonDisabled;
    const handlePrimaryAction = isReactNative(platform)
        ? {
            onPress: (event) => {
                const { onPress } = props;
                if (isTypedFunction(onPress)) {
                    onPress(event);
                }
                primaryButtonAction(event);
            },
        }
        : undefined;
    if (!children) {
        return null;
    }
    return (React.createElement(PrimaryButton, Object.assign({}, props, handlePrimaryAction, { isDisabled: isDisabled, type: "submit" }), children));
}
function SecondaryButtonControl(_a) {
    var { children: _children } = _a, props = __rest(_a, ["children"]);
    const { platform } = usePlatform();
    const { Actions: { SecondaryButton }, } = usePrimitives();
    const { secondaryButtonAction = noop, secondaryButtonText } = useActions();
    const children = _children !== null && _children !== void 0 ? _children : secondaryButtonText;
    const handleSecondaryAction = isReactNative(platform)
        ? {
            onPress: (event) => {
                const { onPress = noop } = props;
                onPress(event);
                // `secondaryButtonAction` does not receive params
                secondaryButtonAction();
            },
        }
        : {
            onClick: (event) => {
                const { onClick = noop } = props;
                onClick(event);
                // `secondaryButtonAction` does not receive params
                secondaryButtonAction();
            },
        };
    if (!children) {
        return null;
    }
    return (React.createElement(SecondaryButton, Object.assign({}, props, handleSecondaryAction), children));
}
function ButtonGroupControl(props) {
    const { Actions: { ButtonGroup }, } = usePrimitives();
    return React.createElement(ButtonGroup, Object.assign({}, props));
}
function ActionsControlBase() {
    return (React.createElement(ButtonGroupControl, null,
        React.createElement(PrimaryButtonControl, null),
        React.createElement(SecondaryButtonControl, null)));
}
const ActionsControl = Object.assign(ActionsControlBase, {
    ButtonGroup: ButtonGroupControl,
    PrimaryButton: PrimaryButtonControl,
    SecondaryButton: SecondaryButtonControl,
});

export { ActionsControl };
