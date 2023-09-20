import React from 'react';
import { AuthenticatorMachineOptions } from '@aws-amplify/ui';
import { UseMachineSelector, UseMachine } from './types';
import { InitialRoute } from '../ComponentRoute';
export declare const USE_MACHINE_ERROR = "`useMachine` must be used inside an `Authenticator.Provider`.";
export declare function useMachine(selector?: UseMachineSelector): UseMachine;
interface MachineProviderProps extends Omit<AuthenticatorMachineOptions, 'initailState'> {
    children?: React.ReactNode;
    initialRoute: InitialRoute;
}
export declare function MachineProvider({ children, initialRoute: initialState, ...data }: MachineProviderProps): JSX.Element;
export {};
