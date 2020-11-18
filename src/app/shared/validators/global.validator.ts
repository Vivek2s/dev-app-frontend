import { AbstractControl, FormControl } from '@angular/forms'
import { ValidationResult } from './validation.interface';

export class GlobalValidator {

  static emailFormat(control: AbstractControl): ValidationResult {

    const EMAIL_REGEXP: RegExp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    // let emailControl = control.get('email');
    if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { 'emailFormat': true };
    }

    return null;
  }

  static passwordCompared(control: AbstractControl): ValidationResult {
    const passwordControl = control.get('password');
    const confirmControl = control.get('confirmPassword');

    if (passwordControl.pristine || confirmControl.pristine)
      return null;
    if (passwordControl.value == confirmControl.value)
      return null;
    return { 'match': true };
  }

  static emailFormatInput(email) {

    const EMAIL_REGEXP: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

    // let emailControl = control.get('email');
    if (email !== '' && (email.length <= 5 || !EMAIL_REGEXP.test(email))) {
      return true;
    }

    return null;
  }

  static passwordFormatCheck(control): ValidationResult {
    const PWD_REGEXP: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i;
    if ( !PWD_REGEXP.test(control.value)) {
       return { 'pwdFormat': true };;
    }

    return null;
  }

  static noWhitespaceValidator(control: AbstractControl): ValidationResult {
    const WHITESPACE_REGEX = /^\s+$/;

    let val = control.value ? control.value.toString() : "";
    const isWhitespace = WHITESPACE_REGEX.test(val);

    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
