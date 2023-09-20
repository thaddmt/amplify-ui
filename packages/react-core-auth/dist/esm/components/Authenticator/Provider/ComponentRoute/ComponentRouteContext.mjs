import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { useMachine } from '../Machine/MachineContext.mjs';
import { COMPONENT_ROUTE } from './constants.mjs';

const isComponentRoute = (t) => COMPONENT_ROUTE.some((key) => key === t);
const { ComponentRouteContext, useComponentRoute } = createContextUtilities({
    contextName: 'ComponentRoute',
    errorMessage: '`useComponentRoute` must be used inside a `ComponentRouteProvider',
});
function isRoute(route, ...currentRoute) {
    return currentRoute.includes(route);
}
/**
 * `ComponentRoute` is a subset of `AuthenticatorComponentRoute` containing
 *  values that directly correlate to the UI. Renders `null` if the current
 * `route` is not a `ComponentRoute`
 */
function ComponentRouteProvider({ children, hideSignUp = false, }) {
    const { route: _route, setRoute: setRouteBase } = useMachine(({ route }) => [
        route,
    ]);
    const route = isComponentRoute(_route) ? _route : undefined;
    const setRoute = React.useRef(setRouteBase).current;
    const value = React.useMemo(() => ({ hideSignUp, route, setRoute }), [hideSignUp, route, setRoute]);
    return (React.createElement(ComponentRouteContext.Provider, { value: value }, route ? children : null));
}

export { ComponentRouteProvider, isComponentRoute, isRoute, useComponentRoute };
