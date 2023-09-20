import { Comparator, UseMachineSelector } from './types';
export declare const defaultComparator: () => false;
/**
 * Does an ordering and shallow comparison of each array value,
 * plus a value equality check for empty objects and arrays.
 */
export declare function areSelectorDepsEqual<T>(currentDeps: T[], nextDeps: T[]): boolean;
export declare const getComparator: (selector: UseMachineSelector) => Comparator;
