import type { App } from 'vue';

// import styles
// TODO: is this necessary?
import './styles.css';

// import components to register
import {
  AmplifyButton,
  AmplifyCheckBox,
  AmplifyTextField,
  Authenticator,
  AuthenticatorForceNewPasswordFormFields,
  AuthenticatorSignUpFormFields,
  BaseFormField,
  BaseFormFields,
  ConfirmResetPassword,
  ConfirmSignIn,
  ConfirmSignUp,
  ConfirmVerifyUser,
  FederatedSignIn,
  ForceNewPassword,
  PasswordControl,
  RenderInfo,
  ResetPassword,
  SignIn,
  SignUp,
  VerifyUser,
} from './components/index';

// export hoooks
export { useAuthenticator } from './composables';

// export components
export {
  AmplifyButton,
  AmplifyCheckBox,
  AmplifyTextField,
  Authenticator,
  AuthenticatorForceNewPasswordFormFields,
  AuthenticatorSignUpFormFields,
  ConfirmResetPassword,
  ConfirmSignIn,
  ConfirmSignUp,
  ConfirmVerifyUser,
  FederatedSignIn,
  ForceNewPassword,
  PasswordControl,
  RenderInfo,
  ResetPassword,
  SignIn,
  SignUp,
  VerifyUser,
};

// Re-export public APIs from `@aws-amplify/ui`
export { translations } from '@aws-amplify/ui';

// register components
export default {
  install: (app: App) => {
    app.component('SignIn', SignIn);
    app.component('SignUp', SignUp);
    app.component('FederatedSignIn', FederatedSignIn);
    app.component('Authenticator', Authenticator);
    app.component('RenderInfo', RenderInfo);
    app.component('PasswordControl', PasswordControl);
    app.component('ForceNewPassword', ForceNewPassword);
    app.component('ResetPassword', ResetPassword);
    app.component('ConfirmResetPassword', ConfirmResetPassword);
    app.component('ConfirmSignUp', ConfirmSignUp);
    app.component('ConfirmSignIn', ConfirmSignIn);
    app.component('VerifyUser', VerifyUser);
    app.component('ConfirmVerifyUser', ConfirmVerifyUser);
    app.component('AmplifyTextField', AmplifyTextField);
    app.component('AmplifyCheckBox', AmplifyCheckBox);
    app.component('AmplifyButton', AmplifyButton);
    app.component('BaseFormField', BaseFormField);
    app.component('BaseFormFields', BaseFormFields);
    app.component(
      'AuthenticatorSignUpFormFields',
      AuthenticatorSignUpFormFields
    );
    app.component(
      'AuthenticatorForceNewPasswordFormFields',
      AuthenticatorForceNewPasswordFormFields
    );
  },
};
