/// <reference types="react" />
/// <reference types="amazon-cognito-identity-js" />
import { ChallengeName, NavigationRoute } from '@aws-amplify/ui';
import { ComponentRoute } from '../ComponentRoute';
type GetDisplayTextKey = `get${string}Text`;
type DisplayTextKey = `${string}Text`;
type DisplayTextBase = Record<GetDisplayTextKey, (...args: any) => string | undefined> | Record<DisplayTextKey, string>;
type DisplayTextTemplate<T extends DisplayTextBase> = {
    [K in keyof T]: K extends GetDisplayTextKey | DisplayTextKey ? T[K] : never;
};
type GetChallengeText = (challengeName: ChallengeName | undefined) => string | undefined;
type GetCopyButtonText = (hasCopied: boolean) => string;
type GetProviderButtonText = (provider: string) => string | undefined;
type GetPrimaryButtonText = (route: ComponentRoute | undefined) => string | undefined;
type GetSecondaryButtonText = (route: Extract<'confirmResetPassword' | 'confirmSignUp' | 'confirmVerifyUser' | 'verifyUser', ComponentRoute> | undefined) => string | undefined;
type GetTitleText = (route: ComponentRoute) => string;
type GetSubHeadingText = (route: ComponentRoute | undefined) => string | undefined;
type GetSignInLinkText = (route: NavigationRoute) => string | undefined;
type GetResetPasswordLinkText = (route: NavigationRoute) => string | undefined;
type GetSignUpLinkText = (route: NavigationRoute) => string | undefined;
/**
 * Authenticator display text
 */
export type DisplayText = DisplayTextTemplate<{
    providersDividerText?: string;
    getChallengeText?: GetChallengeText;
    getCopyButtonText?: GetCopyButtonText;
    getDescriptionText?: GetSubHeadingText;
    getProviderButtonText?: GetProviderButtonText;
    getResetPasswordLinkText?: GetResetPasswordLinkText;
    getSignInLinkText?: GetSignInLinkText;
    getSignUpLinkText?: GetSignUpLinkText;
    getPrimaryButtonText?: GetPrimaryButtonText;
    getSecondaryButtonText?: GetSecondaryButtonText;
    getTitleText?: GetTitleText;
}>;
export type DisplayTextDefault = Required<DisplayText>;
export interface DisplayTextProviderProps {
    children?: React.ReactNode;
    displayText: DisplayTextDefault;
}
export {};
