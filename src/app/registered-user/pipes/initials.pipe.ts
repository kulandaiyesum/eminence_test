import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(email: string): string {
    if (!email) {
      return '';
    }

    const initials = email
      .split('@')[0] // Get the part before '@'
      .split(/\s+/) // Split by spaces
      .map(part => part.charAt(0).toUpperCase()) // Get the first letter of each part and convert to uppercase
      .join(''); // Join the initials

    return initials;
  }

}
