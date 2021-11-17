import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from '@aws-amplify/ui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomSignUpFieldsComponent } from 'src/pages/ui/components/authenticator/custom-sign-up-fields/custom-sign-up-fields.component';
import { CustomSlotsComponent } from 'src/pages/ui/components/authenticator/custom-slots/custom-slots.component';
import { I18nComponent } from 'src/pages/ui/components/authenticator/i18n/i18n.component';
import { ResetPasswordComponent } from 'src/pages/ui/components/authenticator/reset-password/reset-password.component';
import { SignInFederatedComponent } from 'src/pages/ui/components/authenticator/sign-in-federated/sign-in-federated.component';
import { SignInSMSMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-sms-mfa/sign-in-sms-mfa.component';
import { SignInTOTPMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-mfa/sign-in-totp-mfa.component';
import { SignInTOTPSMSComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-sms/sign-in-totp-sms.component';
import { SignInWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-in-with-email/sign-in-with-email.component';
import { SignInWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-in-with-phone/sign-in-with-phone.component';
import { SignInWithUsernameComponent } from 'src/pages/ui/components/authenticator/sign-in-with-username/sign-in-with-username.component';
import { SignUpWithAttributesComponent } from 'src/pages/ui/components/authenticator/sign-up-with-attributes/sign-up-with-attributes.component';
import { SignUpWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email/sign-up-with-email.component';
import { SignUpWithEmailLambdaComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email-lambda/sign-up-with-email-lambda.component';
import { SignUpWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-up-with-phone/sign-up-with-phone.component';
import { SignUpWithUsernameComponent } from 'src/pages/ui/components/authenticator/sign-up-with-username/sign-up-with-username.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomSignUpFieldsComponent,
    CustomSlotsComponent,
    I18nComponent,
    ResetPasswordComponent,
    SignInFederatedComponent,
    SignInSMSMFAComponent,
    SignInTOTPMFAComponent,
    SignInTOTPSMSComponent,
    SignInWithEmailComponent,
    SignInWithPhoneComponent,
    SignInWithUsernameComponent,
    SignUpWithAttributesComponent,
    SignUpWithEmailComponent,
    SignUpWithEmailComponent,
    SignUpWithEmailLambdaComponent,
    SignUpWithPhoneComponent,
    SignUpWithUsernameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    HttpClientModule,
  ],
  providers: [AuthenticatorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
