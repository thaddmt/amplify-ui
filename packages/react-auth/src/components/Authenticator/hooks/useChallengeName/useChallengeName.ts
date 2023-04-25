import {
  useAuthenticator,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core-auth';

interface UseChallengeName {
  challengeName: UseAuthenticator['user']['challengeName'];
}

export default function useChallengeName(): UseChallengeName {
  const { user } = useAuthenticator(({ user }) => [user]);
  const { challengeName } = user ?? {};
  return { challengeName };
}
