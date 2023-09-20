import { __rest } from '../../../../node_modules/@rollup/plugin-typescript/node_modules/tslib/tslib.es6.mjs';
import React, { useCallback } from 'react';
import { useSelector, useInterpret } from '@xstate/react';
import { getNextServiceFacade, createAuthenticatorMachine } from '@aws-amplify/ui';
import { getComparator, defaultComparator } from './utils.mjs';

const USE_MACHINE_ERROR = '`useMachine` must be used inside an `Authenticator.Provider`.';
const MachineContext = React.createContext(null);
function useMachine(selector) {
    const context = React.useContext(MachineContext);
    if (!context) {
        throw new Error(USE_MACHINE_ERROR);
    }
    const { service } = context;
    const { send } = service;
    const xstateSelector = useCallback((state) => getNextServiceFacade({ send, state }), [send]);
    const comparator = selector ? getComparator(selector) : defaultComparator;
    const facade = useSelector(service, xstateSelector, comparator);
    return facade;
}
function MachineProvider(_a) {
    var { children, initialRoute: initialState } = _a, data = __rest(_a, ["children", "initialRoute"]);
    const service = useInterpret(() => createAuthenticatorMachine(Object.assign(Object.assign({}, data), { initialState, useNextWaitConfig: true })));
    const value = React.useMemo(() => ({ service }), [service]);
    return (React.createElement(MachineContext.Provider, { value: value }, children));
}

export { MachineProvider, USE_MACHINE_ERROR, useMachine };
