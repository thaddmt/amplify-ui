import { Platform, PrimitivesDefault } from '../Provider';
import { AuthenticatorComponent, CreateParamsWithPlatform } from '../types';
export declare const createDefault: <T extends Platform, K extends PrimitivesDefault<T>>({ platform, primitives, }: CreateParamsWithPlatform<T, K>) => AuthenticatorComponent<K>;
