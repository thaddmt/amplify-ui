/// <reference types="react" />
import { Platform } from '../Platform';
import { PrimitivesDefault } from './types';
declare const PrimitivesProvider: import("react").ComponentType<import("react").PropsWithChildren<PrimitivesDefault<unknown>>>;
declare function usePrimitives<T extends Platform>(): PrimitivesDefault<T>;
export { PrimitivesProvider, usePrimitives };
