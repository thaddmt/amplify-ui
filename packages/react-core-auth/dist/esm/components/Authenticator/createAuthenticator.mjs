import { createComposable } from './Composable/createComposable.mjs';
import { isComposable } from './Composable/isComposable.mjs';
import { createDefault } from './Default/createDefault.mjs';
import { withPlatform } from './utils/withPlatform.mjs';

const PLATFORM = 'react';
function createAuthenticator(params) {
    const handleCreate = withPlatform(PLATFORM, isComposable(params.type) ? createComposable : createDefault);
    return handleCreate(params);
}

export { createAuthenticator };
