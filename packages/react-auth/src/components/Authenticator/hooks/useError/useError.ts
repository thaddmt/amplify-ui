import {
  useAuthenticator,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core-auth';

export interface UseError {
  errorMessage: UseAuthenticator['error'];
  hasError: boolean;
}
export default function useError(): UseError {
  const { error: errorMessage } = useAuthenticator(({ error }) => [error]);

  const hasError = !!errorMessage;

  return { errorMessage, hasError };
}
