import { UseAuthenticator, WithContextProps } from '@aws-amplify/ui-react-core';

export interface ErrorViewContextType {
  errorMessage?: UseAuthenticator['error'] | undefined | null;
  hasError?: boolean;
}

export type WithErrorViewProps<P> = WithContextProps<ErrorViewContextType, P>;
