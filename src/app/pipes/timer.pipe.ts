import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
  standalone: true,
})
export class TimerPipe implements PipeTransform {
  transform(value: number) {
    if (value < 10 && value >= 0) return '0' + value?.toString();
    return value?.toString();
  }
}
