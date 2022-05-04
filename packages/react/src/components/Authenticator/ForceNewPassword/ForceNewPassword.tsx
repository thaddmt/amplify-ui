import { translate } from '@aws-amplify/ui';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { Text } from '../../../primitives/Text';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { FormFields } from '../shared/FormFields';
import { RouteContainer, RouteProps } from '../RouteContainer';

export const ForceNewPassword = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { error, isPending, toSignIn } = useAuthenticator((context) => [
    context.error,
    context.isPending,
    context.toSignIn,
  ]);
  const { handleBlur, handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ForceNewPassword: { FormFields = ForceNewPassword.FormFields },
    },
  } = useCustomComponents();

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-forcenewpassword=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={handleBlur}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Heading level={3}>{translate('Change Password')}</Heading>

          <FormFields />
          {error && (
            <Text className="forceNewPasswordErrorText" variation="error">
              {error}
            </Text>
          )}
          <Button
            isDisabled={isPending}
            type="submit"
            variation="primary"
            isLoading={isPending}
            loadingText={translate('Changing')}
            fontWeight="normal"
          >
            {translate('Change Password')}
          </Button>
          <Button
            onClick={toSignIn}
            type="button"
            fontWeight="normal"
            variation="link"
            size="small"
          >
            {translate('Back to Sign In')}
          </Button>
        </Flex>
      </form>
    </RouteContainer>
  );
};

ForceNewPassword.FormFields = () => <FormFields route="forceNewPassword" />;
