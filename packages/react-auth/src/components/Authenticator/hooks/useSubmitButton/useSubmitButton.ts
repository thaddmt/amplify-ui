import { isAuthenticatorComponentRouteKey } from '@aws-amplify/ui-react-core-auth';

import { useRoute } from '../useRoute';
import { useSubmit, UseSubmit } from '../useSubmit';
import { useDisplayText, DefaultDisplayText } from '../../DisplayText';

export interface UseSubmitButton extends UseSubmit {
  submitButtonText: ReturnType<DefaultDisplayText['getSubmitButtonText']>;
}

export default function useSubmitButton(): UseSubmitButton {
  const { isDisabled, onSubmit } = useSubmit();
  const { route } = useRoute();
  const { getSubmitButtonText } = useDisplayText();
  const submitButtonText = isAuthenticatorComponentRouteKey(route)
    ? getSubmitButtonText(route)
    : undefined;

  return { isDisabled, onSubmit, submitButtonText };
}
