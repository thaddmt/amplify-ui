import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  authenticatorTextUtil,
  getFormDataFromEvent,
  FormFieldsArray,
} from '@aws-amplify/ui';
import { SignInProps } from '../../types';

const { getForgotPasswordText, getSignInText } = authenticatorTextUtil;

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent implements OnInit {
  @HostBinding('attr.data-amplify-authenticator-signin') dataAttr = '';
  @Input() ctx!: SignInProps;

  public forgotPasswordText = getForgotPasswordText();
  public signInButtonText = getSignInText();
  public sortedFormFields: FormFieldsArray;

  ngOnInit(): void {}

  public get context() {
    return {};
  }

  onInput(event: Event) {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    this.ctx.handleBlur({ name, value });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.ctx.handleSubmit(
      getFormDataFromEvent(event) as Record<string, string>
    );
  }
}
