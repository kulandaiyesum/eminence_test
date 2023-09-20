import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
};
// export class CustomValidator {
//   static MatchValidator(
//     password: string,
//     confirmPassword: string
//   ): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//       const sourceCtrl = control.get(password);
//       const targetCtrl = control.get(confirmPassword);

//       return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
//         ? { mismatch: true }
//         : null;
//     };
//   }
// }
