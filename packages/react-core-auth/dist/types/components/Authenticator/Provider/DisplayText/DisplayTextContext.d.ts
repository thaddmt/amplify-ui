/// <reference types="amazon-cognito-identity-js" />
/// <reference types="react" />
export declare const DisplayTextContext: import("react").Context<Required<{
    providersDividerText?: string | undefined;
    getChallengeText?: ((challengeName: import("amazon-cognito-identity-js").ChallengeName | undefined) => string | undefined) | undefined;
    getCopyButtonText?: ((hasCopied: boolean) => string) | undefined;
    getDescriptionText?: ((route: import("../ComponentRoute").ComponentRoute | undefined) => string | undefined) | undefined;
    getProviderButtonText?: ((provider: string) => string | undefined) | undefined;
    getResetPasswordLinkText?: ((route: import("@aws-amplify/ui").NavigationRoute) => string | undefined) | undefined;
    getSignInLinkText?: ((route: import("@aws-amplify/ui").NavigationRoute) => string | undefined) | undefined;
    getSignUpLinkText?: ((route: import("@aws-amplify/ui").NavigationRoute) => string | undefined) | undefined;
    getPrimaryButtonText?: ((route: import("../ComponentRoute").ComponentRoute | undefined) => string | undefined) | undefined;
    getSecondaryButtonText?: ((route: "confirmResetPassword" | "confirmSignUp" | "confirmVerifyUser" | "verifyUser" | undefined) => string | undefined) | undefined;
    getTitleText?: ((route: import("../ComponentRoute").ComponentRoute) => string) | undefined;
}> | undefined>, DisplayTextProvider: import("react").ComponentType<import("react").PropsWithChildren<Required<{
    providersDividerText?: string | undefined;
    getChallengeText?: ((challengeName: import("amazon-cognito-identity-js").ChallengeName | undefined) => string | undefined) | undefined;
    getCopyButtonText?: ((hasCopied: boolean) => string) | undefined;
    getDescriptionText?: ((route: import("../ComponentRoute").ComponentRoute | undefined) => string | undefined) | undefined;
    getProviderButtonText?: ((provider: string) => string | undefined) | undefined;
    getResetPasswordLinkText?: ((route: import("@aws-amplify/ui").NavigationRoute) => string | undefined) | undefined;
    getSignInLinkText?: ((route: import("@aws-amplify/ui").NavigationRoute) => string | undefined) | undefined;
    getSignUpLinkText?: ((route: import("@aws-amplify/ui").NavigationRoute) => string | undefined) | undefined;
    getPrimaryButtonText?: ((route: import("../ComponentRoute").ComponentRoute | undefined) => string | undefined) | undefined;
    getSecondaryButtonText?: ((route: "confirmResetPassword" | "confirmSignUp" | "confirmVerifyUser" | "verifyUser" | undefined) => string | undefined) | undefined;
    getTitleText?: ((route: import("../ComponentRoute").ComponentRoute) => string) | undefined;
}>>>, useDisplayText: (params?: {
    errorMessage?: string | undefined;
} | undefined) => Required<{
    providersDividerText?: string | undefined;
    getChallengeText?: ((challengeName: import("amazon-cognito-identity-js").ChallengeName | undefined) => string | undefined) | undefined;
    getCopyButtonText?: ((hasCopied: boolean) => string) | undefined;
    getDescriptionText?: ((route: import("../ComponentRoute").ComponentRoute | undefined) => string | undefined) | undefined;
    getProviderButtonText?: ((provider: string) => string | undefined) | undefined;
    getResetPasswordLinkText?: ((route: import("@aws-amplify/ui").NavigationRoute) => string | undefined) | undefined;
    getSignInLinkText?: ((route: import("@aws-amplify/ui").NavigationRoute) => string | undefined) | undefined;
    getSignUpLinkText?: ((route: import("@aws-amplify/ui").NavigationRoute) => string | undefined) | undefined;
    getPrimaryButtonText?: ((route: import("../ComponentRoute").ComponentRoute | undefined) => string | undefined) | undefined;
    getSecondaryButtonText?: ((route: "confirmResetPassword" | "confirmSignUp" | "confirmVerifyUser" | "verifyUser" | undefined) => string | undefined) | undefined;
    getTitleText?: ((route: import("../ComponentRoute").ComponentRoute) => string) | undefined;
}>;
