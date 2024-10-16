import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rut'
})
export class RutPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const rutlimpio = value.replace(/\D/g,'');

    if(rutlimpio.length < 8){
      return rutlimpio;
    }

    const rut = rutlimpio.slice(0,-1);
    const dv = rutlimpio.slice(-1).toUpperCase();

    const formatoRut = this.formatoRut(rut);

    return `${formatoRut}-${dv}`;
  }

  private formatoRut(rut:string):string{
    let formatoRut = '';
    const longitudRut = rut.length;

    for (let i = 0; i < longitudRut; i++){
      if(i > 0 && (longitudRut - i) % 3 === 0){
        formatoRut += '.';
      }
      formatoRut += rut[i];
    }
    return formatoRut;
  }

}
