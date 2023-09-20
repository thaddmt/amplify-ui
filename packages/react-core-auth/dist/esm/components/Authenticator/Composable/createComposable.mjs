import { Controls } from '../Controls/Controls.mjs';
import '../Provider/DisplayText/DisplayTextContext.mjs';
import '@aws-amplify/ui';
import '../Provider/ComponentRoute/ComponentRouteContext.mjs';
import '../Provider/Machine/MachineContext.mjs';
import '@aws-amplify/ui-react-core';
import 'react';
import '@aws-amplify/core';
import 'qrcode';
import '../Provider/Mfa/MfaContext.mjs';
import '../Provider/Platform/PlatformContext.mjs';
import '../Provider/Primitives/PrimitivesContext.mjs';
import { createProvider } from '../Provider/createProvider.mjs';

const createComposable = (params) => {
    const Provider = createProvider(Object.assign(Object.assign({}, params), { type: 'composable' }));
    const composableComponents = Object.assign(Object.assign({}, Controls), { Provider });
    // remove once composable components are fully added
    // @ts-expect-error
    return composableComponents;
};

export { createComposable };
