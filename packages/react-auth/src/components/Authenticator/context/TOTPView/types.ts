import { WithContextProps } from '@aws-amplify/ui-react-core';

export type TOTPViewContextType = {
  totpIssuer?: string | undefined | null;
  totpSecretCode?: string | undefined | null;
  totpUsername?: string | undefined | null;
};

export type WithTOTPViewProps<P> = WithContextProps<TOTPViewContextType, P>;
