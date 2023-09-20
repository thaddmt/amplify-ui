import { Platform } from './Platform';
import { PrimitivesDefault } from './Primitives';
import { OutputType } from '../types';
import { CreateProviderParams, ProviderComponent } from './types';
export declare function createProvider<T extends Platform, K extends PrimitivesDefault<T>, U extends OutputType>({ platform, primitives: primitivesDefault, type, }: CreateProviderParams<T, K, U>): ProviderComponent<K, U>;
