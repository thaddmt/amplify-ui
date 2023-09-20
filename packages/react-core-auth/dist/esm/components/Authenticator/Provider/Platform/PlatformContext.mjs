import { createContextUtilities } from '@aws-amplify/ui-react-core';

const { PlatformProvider, usePlatform } = createContextUtilities({
    contextName: 'Platform',
    errorMessage: '`usePlatform` must be called inside a `PlatformProvider`',
});
const isReactNative = (platform) => platform === 'react-native';

export { PlatformProvider, isReactNative, usePlatform };
