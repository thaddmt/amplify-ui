export interface UpdateUserAttributesProps {
  /** callback for successful user deletion */
  onSuccess?: () => void;

  /** callback for unsuccessful user deletion  */
  onError?: (error: Error) => void;

  /** List of UpdateUserAttributes.Field */
  children?: JSX.Element;
}
