import { Platform, PrimitivesDefault } from '../Provider';
import { AuthenticatorComposable, CreateParamsWithPlatform } from '../types';
export declare const createComposable: <T extends Platform, K extends PrimitivesDefault<T>>(params: CreateParamsWithPlatform<T, K>) => AuthenticatorComposable<K>;
