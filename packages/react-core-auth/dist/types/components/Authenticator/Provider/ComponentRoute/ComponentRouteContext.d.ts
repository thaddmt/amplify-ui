/// <reference types="react" />
import { ComponentRoute, ComponentRouteContextType, ComponentRouteProviderProps } from './types';
export declare const isComponentRoute: (t: string) => t is ComponentRoute;
declare const useComponentRoute: (params?: {
    errorMessage?: string | undefined;
} | undefined) => ComponentRouteContextType;
export declare function isRoute<T extends ComponentRoute | undefined>(route: ComponentRoute | undefined, ...currentRoute: T[]): route is T;
/**
 * `ComponentRoute` is a subset of `AuthenticatorComponentRoute` containing
 *  values that directly correlate to the UI. Renders `null` if the current
 * `route` is not a `ComponentRoute`
 */
declare function ComponentRouteProvider({ children, hideSignUp, }: ComponentRouteProviderProps): JSX.Element;
export { ComponentRouteProvider, useComponentRoute };
