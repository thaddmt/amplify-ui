import {
  useAuthenticator,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core-auth';

export default function useRoute(): Pick<UseAuthenticator, 'route'> {
  const { route } = useAuthenticator(({ route }) => [route]);
  return { route };
}
