// TODO(poc): is this sharable in ui package?
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
