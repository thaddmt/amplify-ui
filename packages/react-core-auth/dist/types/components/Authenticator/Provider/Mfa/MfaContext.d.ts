/// <reference types="react" />
export interface MfaContextType {
    totpIssuer?: string;
    totpUsername?: string;
}
export declare const MfaProvider: import("react").ComponentType<import("react").PropsWithChildren<MfaContextType>>, useMfa: (params?: {
    errorMessage?: string | undefined;
} | undefined) => MfaContextType;
