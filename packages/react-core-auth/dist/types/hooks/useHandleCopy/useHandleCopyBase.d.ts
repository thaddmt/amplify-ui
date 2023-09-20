import { UseHandleCopyBaseParams, UseHandleCopyBase } from './types';
/**
 * Base copy utility hook, prefer usage of platform specific `useHandleCopy`
 *
 * @param {UseHandleCopyBaseParams} params requires `copyHandler`
 * @returns {UseHandleCopyBase} `handleCopy` callback and copied `value`
 */
export declare function useHandleCopyBase({ copyHandler, reset, target, }: UseHandleCopyBaseParams): UseHandleCopyBase;
