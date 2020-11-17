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

  static phoneFormat(control: AbstractControl): ValidationResult {
    const PHONE_REGEXP: RegExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i;
    if (control.value !== '' && !PHONE_REGEXP.test(control.value)) {
      return { 'phoneFormat': true };
    }

    return null;
  }

  static emailFormatInput(email) {

    const EMAIL_REGEXP: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

    // let emailControl = control.get('email');
    if (email !== '' && (email.length <= 5 || !EMAIL_REGEXP.test(email))) {
      return true;
    }

    return null;
  }

  static phoneFormatCheck(phone) {
    const PHONE_REGEXP: RegExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i;
    if (phone !== '' && !PHONE_REGEXP.test(phone)) {
      return true;
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

  static numberCheckValidator(control): ValidationResult {
    let val = Number(control.value);

    return isNaN(val) ? { 'numberInvalid': true } : null;
  }

  // static accountInput(country, accountNumber) {
  //   let accountNumberRegEx;
  //   // if (country == 'india') {
  //   accountNumberRegEx = /^[0-9]{9,18}$/;
  //   // }
  //   if (!accountNumberRegEx.test(accountNumber))
  //     return true;
  //   return null;
  // }

  // static ifscInput(country, ifscCode) {
  //   let ifscRegEx;
  //   ifscRegEx = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  //   if (!ifscRegEx.test(ifscCode))
  //     return true;
  //   return null;
  // }

  // static panInput(country, panNumber) {
  //   let panNumberRegEx
  //   panNumberRegEx = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
  //   if (!panNumberRegEx.test(panNumber))
  //     return true;
  //   return null;
  // }
}
