import { useHandleCopyBase } from './useHandleCopyBase.mjs';

/**
 * Basic copy utility hook
 *
 * @param {UseHandleCopyParams} params `useHandleCopy` optional parameters
 * @returns {UseHandleCopy} `handleCopy` callback and copied `value`
 */
const useHandleCopy = (params) => useHandleCopyBase(Object.assign(Object.assign({}, params), { copyHandler: navigator.clipboard.writeText }));

export { useHandleCopy };
