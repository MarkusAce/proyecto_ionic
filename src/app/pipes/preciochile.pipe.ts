import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preciochile'
})
export class PreciochilePipe implements PipeTransform {

  transform(value: number): string {
    if(!value){
      return '$0';
    }

    const valorFormateado = value.toLocaleString('es-CL',{ style: 'currency', currency: 'CLP'});

    return valorFormateado;
  }

}
