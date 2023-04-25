import {
  useAuthenticator,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core-auth';

export interface UseRoute
  extends Pick<UseAuthenticator, 'route' | 'setNavigableRoute'> {}

export default function useRoute(): UseRoute {
  const { route, setNavigableRoute } = useAuthenticator(
    ({ route, setNavigableRoute }) => [route, setNavigableRoute]
  );
  return { route, setNavigableRoute };
}
