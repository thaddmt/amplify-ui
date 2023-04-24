import { onUnmounted, onMounted, ref, Ref } from 'vue';

import { Auth, Hub } from 'aws-amplify';
import { HubCallback } from '@aws-amplify/core';
import { AmplifyUser } from '@aws-amplify/ui';

interface UseAuthResult {
  error: Ref<Error | undefined>;
  user: Ref<AmplifyUser | undefined>;
  getIsAuthenticated: () => Promise<boolean>;
  signOut: () => void;
}

const getIsAuthenticated = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (e) {
    return false;
  }
};

const signOut = (): void => {
  Auth.signOut();
};

const useAuth = (): UseAuthResult => {
  const unsubscribe: Ref<(() => void) | undefined> = ref();
  const error: Ref<Error | undefined> = ref();
  const user: Ref<AmplifyUser | undefined> = ref();

  const fetchCurrentUser = async () => {
    try {
      user.value = (await Auth.currentAuthenticatedUser()) as AmplifyUser;
      error.value = undefined;
    } catch (e) {
      error.value = e as Error;
      user.value = undefined;
    }
  };

  const handleAuth: HubCallback = ({ payload }) => {
    switch (payload.event) {
      // success events
      case 'signIn':
      case 'signUp':
      case 'autoSignIn': {
        user.value = payload.data as AmplifyUser;
        error.value = undefined;
        break;
      }
      case 'signOut': {
        user.value = undefined;
        error.value = undefined;
        break;
      }

      // failure events
      case 'tokenRefresh_failure':
      case 'signIn_failure': {
        user.value = undefined;
        error.value = payload.data as Error;
        break;
      }
      case 'autoSignIn_failure': {
        // autoSignIn just returns error message. Wrap it to an Error object
        user.value = undefined;
        error.value = new Error(payload.message);
        break;
      }

      // events that need another fetch
      case 'tokenRefresh': {
        fetchCurrentUser();
        break;
      }

      default: {
        // we do not handle other hub events like `configured`.
        break;
      }
    }
  };

  onMounted(() => {
    unsubscribe.value = Hub.listen('auth', handleAuth, 'useAuth');
    fetchCurrentUser();
  });

  onUnmounted(() => {
    unsubscribe.value?.();
  });

  return {
    user,
    error,
    getIsAuthenticated,
    signOut,
  };
};

export default useAuth;
