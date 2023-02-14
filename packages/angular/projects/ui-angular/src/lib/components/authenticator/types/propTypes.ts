// TODO share these contexts from `@aws-amplify/ui`
interface CommonRouteProps {
  error: string;
  isPending: boolean;
  handleBlur: (data: Record<string, string>) => void;
  handleChange: (data: Record<string, string>) => void;
  handleSubmit: (data: Record<string, string>) => void;
}

export interface SignInProps extends CommonRouteProps {
  hideSignUp?: boolean;
  toFederatedSignIn: () => void;
  toResetPassword: () => void;
  toSignUp: () => void;
}
