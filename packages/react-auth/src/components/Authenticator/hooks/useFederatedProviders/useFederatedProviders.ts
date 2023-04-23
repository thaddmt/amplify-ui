import {
  useAuthenticator,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core-auth';

interface useFederatedProviders {
  providers: UseAuthenticator['socialProviders'];
  toFederatedProvider: UseAuthenticator['toFederatedSignIn'];
}

export default function useFederatedProviders(): useFederatedProviders {
  const { socialProviders: providers, toFederatedSignIn: toFederatedProvider } =
    useAuthenticator(({ socialProviders, toFederatedSignIn }) => [
      socialProviders,
      toFederatedSignIn,
    ]);

  return { providers, toFederatedProvider };
}
