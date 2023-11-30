import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat',
})
export class TimeformatPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null || isNaN(value) || value < 0) {
      return '-';
    }

    const minutes: number = Math.floor(value / 60);
    const seconds: number = Math.floor(value % 60);

    const formattedMinutes: string = String(minutes).padStart(2, '0');
    const formattedSeconds: string = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
