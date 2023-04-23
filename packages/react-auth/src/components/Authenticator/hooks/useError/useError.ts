import {
  useAuthenticator,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core-auth';

export default function useError(): {
  errorMessage: UseAuthenticator['error'];
  hasError: boolean;
} {
  const { error: errorMessage } = useAuthenticator(({ error }) => [error]);

  const hasError = !!errorMessage;

  return { errorMessage, hasError };
}
