import { WithContextProps } from '@aws-amplify/ui-react-core';

export type TOTPContextType = {
  totpIssuer?: string | undefined | null;
  totpSecretCode?: string | undefined | null;
  totpUsername?: string | undefined | null;
};

export type WithTOTPProps<P> = WithContextProps<TOTPContextType, P>;
