import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.page.html',
  styleUrls: ['./cambiarcontra.page.scss'],
})
export class CambiarcontraPage implements OnInit {

  contrasenaForm!: FormGroup;

  idUsuario: string = '';
  idRol: string = '';

  constructor(private router: Router,private bd: ServicesbdService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contrasenaForm = this.formBuilder.group({
      antigua: ['', [Validators.required]],
      nueva: [null, [Validators.required, this.contrasenaValidador]],
      confirmar: ['', Validators.required]
    }, {validator: this.contrasenasIguales});

    this.bd.dbState().subscribe(data =>{
      if(data){
        this.bd.fetchTipoUsuario().subscribe(res =>{
          if(res.length> 0){
            this.idUsuario = res[0].idUsuario;
            this.idRol = res[0].idRol;
          }else{
            this.idUsuario = '';
            this.idRol = '1';
          }
        });
      }
    });
  }

  async validarCambioContra(){
    if (this.contrasenaForm.valid){
      const {antigua, nueva} = this.contrasenaForm.value;

      const contrasenaValida = await this.bd.seleccionarComparar(this.idUsuario, antigua);
      if(contrasenaValida){
        const actualizado = await this.bd.modificarContrasena(this.idUsuario, nueva);
        if(actualizado){
          this.router.navigate(['/perfil'])
        }else{
          this.bd.presentAlert('Error', 'La contraseña no se pudo actualizar');
        }
      }else{
        this.bd.presentAlert('Error', 'La contraseña antigua es incorrecta');
      }
    }
  }

  contrasenaValidador(control: AbstractControl): ValidationErrors | null {
    const nueva = control.value;
    const errors: ValidationErrors = {};

    if(!nueva){
      errors['vacia'] = true;
      return errors;
    }
    const mayusculaValid = /[A-Z]/.test(nueva);
    const minusculaValid = /[a-z]/.test(nueva);
    const numeroValid = /\d/.test(nueva);
    const especialValid = /[@$!%*?&]/.test(nueva);
    const minimoValid = nueva.length >=8;

    if(!mayusculaValid){
      errors['mayuscula'] = true;
    }
    if (!minusculaValid){
      errors['minuscula'] = true;
    }
    if (!numeroValid){
      errors['numero'] = true;
    }
    if (!especialValid){
      errors['especial'] = true;
    }
    if (!minimoValid){
      errors['minimo'] = true;
    }
    return Object.keys(errors).length > 0 ? errors : null;
  }

  contrasenasIguales(form: FormGroup) {
    const nueva = form.get('nueva')?.value;
    const confirmar = form.get('confirmar')?.value;
    return nueva === confirmar? null : {mismatch: true};
  }
}
