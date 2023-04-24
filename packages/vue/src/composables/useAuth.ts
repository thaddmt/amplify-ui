import { reactive, onUnmounted, onMounted, ref, Ref } from 'vue';

import { AmplifyUser } from '@aws-amplify/ui';
import { Auth } from 'aws-amplify';
import { Hub, HubCallback } from '@aws-amplify/core';

interface UseAuthResult {
  error: Error | undefined;
  user: AmplifyUser | undefined;
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

const signOut = () => Auth.signOut();

const useAuth = () => {
  const unsubscribe: Ref<(() => void) | undefined> = ref();
  const result: UseAuthResult = reactive({
    error: undefined,
    user: undefined,
    getIsAuthenticated,
    signOut,
  });

  const fetchCurrentUser = async () => {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as AmplifyUser;
      result.user = user;
      result.error = undefined;
    } catch (e) {
      result.error = e as Error;
      result.user = undefined;
    }
  };

  const handleAuth: HubCallback = ({ payload }) => {
    switch (payload.event) {
      // success events
      case 'signIn':
      case 'signUp':
      case 'autoSignIn': {
        const user = payload.data as AmplifyUser;
        result.user = user;
        result.error = undefined;
        break;
      }
      case 'signOut': {
        result.user = undefined;
        result.error = undefined;
        break;
      }

      // failure events
      case 'tokenRefresh_failure':
      case 'signIn_failure': {
        result.error = payload.data as Error;
        result.user = undefined;
        break;
      }
      case 'autoSignIn_failure': {
        // autoSignIn just returns error message. Wrap it to an Error object
        result.error = new Error(payload.message);
        result.user = undefined;
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
    unsubscribe.value = Hub.listen('auth', handleAuth);
  });

  onUnmounted(() => {
    unsubscribe.value?.();
  });
};

export default useAuth;
