import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPlate',
  standalone: true,
})
export class FormatPlatePipe implements PipeTransform {
  transform(plate: string): string {
    if (!plate) return '';

    const cleaned = plate.toUpperCase().replace(/\W/g, '');

    // Validação de formato
    if (/^[A-Z]{3}\d{4}$/.test(cleaned)) {
      return `${cleaned.substring(0, 3)}-${cleaned.substring(3)}`;
    }

    if (/^[A-Z]{3}\d[A-Z]\d{2}$/.test(cleaned)) {
      return `${cleaned.substring(0, 3)}-${cleaned.substring(3)}`;
    }

    return plate;
  }
}
