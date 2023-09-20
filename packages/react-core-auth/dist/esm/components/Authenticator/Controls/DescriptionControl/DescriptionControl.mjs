import { __rest } from '../../../../node_modules/@rollup/plugin-typescript/node_modules/tslib/tslib.es6.mjs';
import React from 'react';
import '../../Provider/DisplayText/DisplayTextContext.mjs';
import '@aws-amplify/ui';
import '../../Provider/ComponentRoute/ComponentRouteContext.mjs';
import '../../Provider/Machine/MachineContext.mjs';
import '@aws-amplify/ui-react-core';
import { useDescription } from '../../Provider/hooks/useDescription.mjs';
import '@aws-amplify/core';
import 'qrcode';
import '../../Provider/Mfa/MfaContext.mjs';
import '../../Provider/Platform/PlatformContext.mjs';
import { usePrimitives } from '../../Provider/Primitives/PrimitivesContext.mjs';

function DescriptionControl(_a) {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { Description } = usePrimitives();
    const { descriptionText } = useDescription();
    return React.createElement(Description, Object.assign({}, props), children !== null && children !== void 0 ? children : descriptionText);
}

export { DescriptionControl };
