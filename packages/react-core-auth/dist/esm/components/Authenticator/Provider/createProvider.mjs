import React from 'react';
import { ComponentRouteProvider } from './ComponentRoute/ComponentRouteContext.mjs';
import { DisplayTextProvider } from './DisplayText/DisplayTextContext.mjs';
import { displayTextEn } from './DisplayText/i18n/en.mjs';
import { MachineProvider } from './Machine/MachineContext.mjs';
import { MfaProvider } from './Mfa/MfaContext.mjs';
import { PlatformProvider } from './Platform/PlatformContext.mjs';
import { PrimitivesProvider } from './Primitives/PrimitivesContext.mjs';

function createProvider({ platform, primitives: primitivesDefault, type, }) {
    // Composable use case does not allow for Primitive slot overrides
    const ignoreComponentsProp = type === 'composable';
    const Provider = ({ children, components: _components, displayText: _displayText, initialRoute = 'signUp', }) => {
        // do not memo `displayText` or `primitives`, respective providers
        // handle memoization internally
        const displayText = Object.assign(Object.assign({}, _displayText), displayTextEn);
        const primitives = ignoreComponentsProp
            ? primitivesDefault
            : Object.assign(Object.assign({}, primitivesDefault), _components);
        return (React.createElement(PlatformProvider, { platform: platform },
            React.createElement(DisplayTextProvider, Object.assign({}, displayText),
                React.createElement(PrimitivesProvider, Object.assign({}, primitives),
                    React.createElement(MachineProvider, { initialRoute: initialRoute },
                        React.createElement(ComponentRouteProvider, null,
                            React.createElement(MfaProvider, null, children)))))));
    };
    Provider.displayName = 'Authenticator.Provider';
    return Provider;
}

export { createProvider };
