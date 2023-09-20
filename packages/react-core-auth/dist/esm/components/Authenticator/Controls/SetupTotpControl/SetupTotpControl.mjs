import { __rest } from '../../../../node_modules/@rollup/plugin-typescript/node_modules/tslib/tslib.es6.mjs';
import React from 'react';
import { noop } from '@aws-amplify/ui';
import '../../Provider/DisplayText/DisplayTextContext.mjs';
import '../../Provider/ComponentRoute/ComponentRouteContext.mjs';
import '../../Provider/Machine/MachineContext.mjs';
import '@aws-amplify/ui-react-core';
import { useSetupTotp } from '../../Provider/hooks/useSetupTotp.mjs';
import { usePlatform, isReactNative } from '../../Provider/Platform/PlatformContext.mjs';
import { usePrimitives } from '../../Provider/Primitives/PrimitivesContext.mjs';
import '../../Provider/Mfa/MfaContext.mjs';

function ContainerControl(_a) {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { SetupTotp: { Container }, } = usePrimitives();
    const { totpCodeUrl } = useSetupTotp();
    if (!children || !totpCodeUrl) {
        return null;
    }
    return React.createElement(Container, Object.assign({}, props), children);
}
function CopyButtonControl(_a) {
    var { children: _children } = _a, props = __rest(_a, ["children"]);
    const { platform } = usePlatform();
    const { SetupTotp: { CopyButton }, } = usePrimitives();
    const { copyButtonText, handleCopy } = useSetupTotp();
    const handlePress = isReactNative(platform)
        ? {
            onPress: (event) => {
                const { onPress = noop } = props;
                onPress(event);
                // `handleCopy` does not receive params
                handleCopy();
            },
        }
        : {
            onClick: (event) => {
                const { onClick = noop } = props;
                onClick(event);
                // `handleCopy` does not receive params
                handleCopy();
            },
        };
    const children = _children !== null && _children !== void 0 ? _children : copyButtonText;
    if (!children) {
        return null;
    }
    return React.createElement(CopyButton, Object.assign({}, props, handlePress));
}
function ImageControl(_a) {
    var _b, _c;
    var { children } = _a, props = __rest(_a, ["children"]);
    const { platform } = usePlatform();
    const { SetupTotp: { Image }, } = usePrimitives();
    const { qrCodeDataUrl } = useSetupTotp();
    const imageSource = isReactNative(platform)
        ? { source: (_b = props.source) !== null && _b !== void 0 ? _b : qrCodeDataUrl }
        : { src: (_c = props.src) !== null && _c !== void 0 ? _c : qrCodeDataUrl };
    if (!children || !imageSource) {
        return null;
    }
    return (React.createElement(Image, Object.assign({}, props, imageSource), children));
}
function LoaderControl(props) {
    const { SetupTotp: { Loader }, } = usePrimitives();
    const { qrCodeDataUrl, totpCodeUrl } = useSetupTotp();
    if (!totpCodeUrl || qrCodeDataUrl) {
        return null;
    }
    return React.createElement(Loader, Object.assign({}, props));
}
function InstructionTextControlOne(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const { SetupTotp: { InstructionTextOne }, } = usePrimitives();
    if (!children) {
        return null;
    }
    return React.createElement(InstructionTextOne, Object.assign({}, rest), children);
}
function InstructionTextControlTwo(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const { SetupTotp: { InstructionTextTwo }, } = usePrimitives();
    if (!children) {
        return null;
    }
    return React.createElement(InstructionTextTwo, Object.assign({}, rest), children);
}
function InstructionTextControlThree(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const { SetupTotp: { InstructionTextThree }, } = usePrimitives();
    if (!children) {
        return null;
    }
    return React.createElement(InstructionTextThree, Object.assign({}, rest), children);
}
function SetupTotpControlBase() {
    return (React.createElement(ContainerControl, null,
        React.createElement(LoaderControl, null),
        React.createElement(ImageControl, null),
        React.createElement(CopyButtonControl, null)));
}
const SetupTotpControl = Object.assign(SetupTotpControlBase, {
    Container: ContainerControl,
    CopyButton: CopyButtonControl,
    Image: ImageControl,
    InstructionTextOne: InstructionTextControlOne,
    InstructionTextTwo: InstructionTextControlTwo,
    InstructionTextThree: InstructionTextControlThree,
    Loader: LoaderControl,
});

export { SetupTotpControl };
