import { PrimitivesDefault } from './Provider';
import { AuthenticatorComponent, AuthenticatorComposable, CreateAuthenticatorParams } from './types';
declare const PLATFORM: "react";
type Primitives = PrimitivesDefault<typeof PLATFORM>;
/**
 *
 * @param params
 */
export declare function createAuthenticator<T extends Primitives>(params: CreateAuthenticatorParams<T, 'composable'>): AuthenticatorComposable<T>;
export declare function createAuthenticator(params: CreateAuthenticatorParams<Primitives, 'default'>): AuthenticatorComponent<Primitives>;
export {};
