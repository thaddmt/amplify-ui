import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { SignInProps } from '@aws-amplify/ui-angular';
import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-with-email',
  templateUrl: 'sign-in-with-email.component.html',
})
export class SignInWithEmailComponent {
  constructor() {
    Amplify.configure(awsExports);
  }

  public getSignInProps(ctx: SignInProps): SignInProps {
    return { ...ctx, hideSignUp: true };
  }

  public formFields = {
    confirmVerifyUser: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };
}
