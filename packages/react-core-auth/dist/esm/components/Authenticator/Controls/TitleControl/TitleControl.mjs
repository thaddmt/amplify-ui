import { __rest } from '../../../../node_modules/@rollup/plugin-typescript/node_modules/tslib/tslib.es6.mjs';
import React from 'react';
import '../../Provider/DisplayText/DisplayTextContext.mjs';
import '@aws-amplify/ui';
import '../../Provider/ComponentRoute/ComponentRouteContext.mjs';
import '../../Provider/Machine/MachineContext.mjs';
import '@aws-amplify/ui-react-core';
import '@aws-amplify/core';
import 'qrcode';
import '../../Provider/Mfa/MfaContext.mjs';
import { useTitle } from '../../Provider/hooks/useTitle.mjs';
import '../../Provider/Platform/PlatformContext.mjs';
import { usePrimitives } from '../../Provider/Primitives/PrimitivesContext.mjs';

function TitleControl(_a) {
    var { children } = _a, props = __rest(_a, ["children"]);
    const { Title } = usePrimitives();
    const { titleText } = useTitle();
    return React.createElement(Title, Object.assign({}, props), children !== null && children !== void 0 ? children : titleText);
}

export { TitleControl };
