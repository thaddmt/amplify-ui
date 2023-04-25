import { useDisplayText } from '../../DisplayText';

import { useChallengeName } from '../useChallengeName';
import { useRoute } from '../useRoute';

export default function useSubHeadingText(): string | undefined {
  const { route } = useRoute();
  const { challengeName } = useChallengeName();
  const { getChallengeText } = useDisplayText();

  if (route === 'confirmSignIn') {
    return getChallengeText(challengeName);
  }
}
