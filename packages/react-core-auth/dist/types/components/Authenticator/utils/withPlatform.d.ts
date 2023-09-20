import { Platform, PrimitivesDefault } from '../Provider';
import { AuthenticatorComponent, AuthenticatorComposable, CreateAuthenticatorParams, OutputType } from '../types';
type PlatformCallback<T extends Platform, K extends PrimitivesDefault<T>> = <U extends OutputType>(rest: CreateAuthenticatorParams<K, U> & {
    platform: T;
}) => AuthenticatorComposable<K> | AuthenticatorComponent<K>;
type WrappedWithPlatform<T extends Platform, K extends PrimitivesDefault<T>> = <U extends OutputType>(rest: CreateAuthenticatorParams<K, U>) => AuthenticatorComposable<K> | AuthenticatorComponent<K>;
/**
 * @param platform Authenticator Platform
 * @param callback Base create Authenticator callback expecting `platform`
 * @returns `callback` with `platform` injected
 */
export declare const withPlatform: <T extends Platform, K extends PrimitivesDefault<T>>(platform: T, callback: PlatformCallback<T, K>) => WrappedWithPlatform<T, K>;
export {};
