import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { countryDialCodes } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-phone-number-field',
  templateUrl: './phone-number-field.component.html',
})
export class PhoneNumberFieldComponent implements OnInit {
  @Input() autocomplete = 'new-password';
  @Input() disabled = false;
  @Input() defaultCountryCode!: string;
  @Input() selectFieldId: string = `amplify-field-${nanoid(12)}`;
  @Input() textFieldId: string = `amplify-field-${nanoid(12)}`;
  @Input() initialValue = '';
  @Input() label = '';
  @Input() name!: string;
  @Input() placeholder = '';
  @Input() required = true;
  @Input() type: string = 'tel';
  @Input() labelHidden = false;
  @Input() dialCodeList: Array<string> = countryDialCodes;
  @Input() hasError: boolean = false;
  @Input() describedBy?: string;

  @HostBinding('style.display') display = 'contents';

  ngOnInit(): void {}
}
