/// <reference types="react" />
interface PlatformContextType {
    platform: Platform;
}
export type Platform = 'react' | 'react-native';
export declare const PlatformProvider: import("react").ComponentType<import("react").PropsWithChildren<PlatformContextType>>, usePlatform: (params?: {
    errorMessage?: string | undefined;
} | undefined) => PlatformContextType;
export declare const isReactNative: (platform: Platform) => platform is "react-native";
export {};
