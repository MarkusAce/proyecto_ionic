import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatotarjeta'
})
export class FormatotarjetaPipe implements PipeTransform {

  transform(value: string | number): string {
    if(!value) return '';

    const numeroTarjeta = value.toString().replace(/\D/g, '');

    const formato = numeroTarjeta.replace(/(.{4})/g, '$1 ').trim();

    return formato
  }

}
