import React from 'react';
import { DisplayText } from './DisplayText';
import { InitialRoute } from './ComponentRoute';
export interface CreateProviderParams<T, K, U> {
    platform: T;
    primitives: K;
    type: U;
}
export interface ProviderProps<T, K> {
    children?: React.ReactNode;
    components?: K extends 'default' ? T : never;
    displayText?: DisplayText;
    initialRoute?: InitialRoute;
}
export type ProviderComponent<T, K> = (params: ProviderProps<T, K>) => JSX.Element;
