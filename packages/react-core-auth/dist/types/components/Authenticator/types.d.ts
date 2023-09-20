/// <reference types="react" />
import { ComplexControlName, ControlName, Platform, PrimitiveControlName, PrimitivesDefault, ProviderComponent, ProviderProps } from './Provider';
/**
 * `createAuthenticator` output type:
 * - `default`: React component rendering provided `children` on sign in complete
 * - `composable`: `Authenticator` composable components for advanced use cases
 */
export type OutputType = 'default' | 'composable';
/**
 * @components control type utilities
 */
type ControlComponents = Record<ControlName, any>;
type PickControls<T extends ControlComponents> = Pick<T, ControlName>;
/**
 * "Convenience" Components responsible for rendering Control specific content.
 * Characteristics of these Components include:
 *
 * - rendering content based on iteration of some configured data, e.g. `federatedProviders`
 * - rendered `children` all use the same underlying primitive, e.g. `FederatedProvider.Button`
 * - do not correspond directly to a Primitive, but use Primitives
 * - receive no `props`
 * - are not available for override in the `default` use case
 *
 * For example, `FederatedProviders.Buttons` renders the `Button` components
 * corresponding to the configured `federatedProviders` value. This allows
 * `FederatedProvider.Buttons` to be used in composing a custom `MyFederatedProviders`
 * Component without having to interact with the underlying data structures.
 *
 * ```tsx
 * const MyFederatedProviders = () => {
 *   return (
 *     <FederatedProviders.ButtonGroup backgroundColor="berrypink">
 *       <FederatedProviders.Buttons />
 *     </FederatedProviders.ButtonGroup>
 *   )
 * }
 * ```
 */
interface ControlComposableComponents {
    FederatedProviders: {
        Buttons: React.ComponentType;
    };
    Links: {
        Buttons: React.ComponentType;
    };
    Fields: React.ComponentType;
}
/**
 * `Outputted `composable` Components type.
 */
export type AuthenticatorComposable<T extends PrimitivesDefault> = {
    [K in keyof PickControls<T>]: K extends ComplexControlName ? (() => JSX.Element) & T[K] : K extends PrimitiveControlName ? T[K] : never;
} & ControlComposableComponents & {
    Provider: ProviderComponent<T, 'composable'>;
};
interface CreateParamsBase<T> {
    primitives: T;
}
export interface CreateAuthenticatorParams<T, K extends OutputType> extends CreateParamsBase<T> {
    type: K;
}
export interface CreateParamsWithPlatform<P extends Platform, C extends PrimitivesDefault<P>> extends CreateParamsBase<C> {
    platform: P;
}
/**
 * @todo
 */
export interface AuthenticatorProps<C> extends ProviderProps<C, 'default'> {
}
/**
 * @todo
 */
export type AuthenticatorComponent<C> = (props: AuthenticatorProps<C>) => JSX.Element | null;
export {};
