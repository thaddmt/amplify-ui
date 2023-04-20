import { createSharedComposable } from '@vueuse/core';

import { watchEffect, ref } from 'vue';
import { useMachine } from '@xstate/vue';
import { createAuthenticatorMachine, getServiceFacade } from '@aws-amplify/ui';

function useAuthenticator() {
  const { state, send } = useMachine(createAuthenticatorMachine);
  const facade = ref(getServiceFacade({ state: state.value, send }));

  watchEffect(() => {
    console.log('[useAuthenticator]', 'updated facade value');
    facade.value = getServiceFacade({ state: state.value, send });
  });

  return facade;
}

export default createSharedComposable(useAuthenticator);
