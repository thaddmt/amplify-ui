import { __rest } from '../../../node_modules/@rollup/plugin-typescript/node_modules/tslib/tslib.es6.mjs';
import React from 'react';
import { Controls } from '../Controls/Controls.mjs';
import '../Provider/DisplayText/DisplayTextContext.mjs';
import '@aws-amplify/ui';
import '../Provider/ComponentRoute/ComponentRouteContext.mjs';
import '../Provider/Machine/MachineContext.mjs';
import '@aws-amplify/ui-react-core';
import '@aws-amplify/core';
import 'qrcode';
import '../Provider/Mfa/MfaContext.mjs';
import '../Provider/Platform/PlatformContext.mjs';
import '../Provider/Primitives/PrimitivesContext.mjs';
import { createProvider } from '../Provider/createProvider.mjs';

const createDefault = ({ platform, primitives, }) => {
    const Provider = createProvider({ platform, primitives, type: 'default' });
    return function Authenticator(_a) {
        var { children } = _a, props = __rest(_a, ["children"]);
        return (React.createElement(Provider, Object.assign({}, props),
            React.createElement(Controls.Form, null,
                React.createElement(Controls.Title, null),
                React.createElement(Controls.Description, null),
                React.createElement(Controls.SetupTotp, null),
                React.createElement(Controls.Actions, null),
                children)));
    };
};

export { createDefault };
