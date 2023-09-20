import React from 'react';
import { isTypedFunction, isString } from '@aws-amplify/ui';
import { useTimeout } from '@aws-amplify/ui-react-core';

/**
 * Base copy utility hook, prefer usage of platform specific `useHandleCopy`
 *
 * @param {UseHandleCopyBaseParams} params requires `copyHandler`
 * @returns {UseHandleCopyBase} `handleCopy` callback and copied `value`
 */
function useHandleCopyBase({ copyHandler, reset, target, }) {
    const [value, setValue] = React.useState();
    // prevent `useTimeout` from executing `callback` by assigning `undefined`
    useTimeout({
        callback: value ? () => setValue(undefined) : undefined,
        delay: reset,
    });
    const handleCopy = React.useCallback((v) => {
        // prefer `v` passed to callback over `target`
        const copyValue = v !== null && v !== void 0 ? v : target;
        if (isTypedFunction(copyHandler) && isString(copyValue)) {
            copyHandler(copyValue);
            setValue(copyValue);
        }
    }, [copyHandler, target]);
    return { handleCopy, value };
}

export { useHandleCopyBase };
