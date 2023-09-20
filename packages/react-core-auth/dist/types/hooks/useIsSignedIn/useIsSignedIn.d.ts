export interface UseIsSignedInParams {
    onSignIn?: () => void;
    onSignOut?: () => void;
}
interface UseIsSignedIn {
    isSignedIn: boolean;
}
/**
 * listens for `Auth` sign in and sign out events
 *
 * @param {UseIsSignedInParams} params `onSignIn` and `onSignOut` event callbacks
 * @returns {UseIsSignedIn} Outputs `isSignedIn`
 */
export default function useIsSignedIn({ onSignIn, onSignOut, }: UseIsSignedInParams): UseIsSignedIn;
export {};
