import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  registroForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      usuario1: ['', [Validators.required, Validators.minLength(5)]],
      email1: ['', [Validators.required, Validators.email]],
      rut:['', [Validators.required, this.rutValidador]],
      telefono: ['',[Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
      direccion: ['', [Validators.required,Validators.minLength(5)]],
      fechanac: ['', [Validators.required, this.fechaNacValidar]],
      contrasena1: [null, [Validators.required, this.contrasenaValidador]],
      contrasenarepetida: ['', Validators.required]
    }, {validator: this.contrasenasIguales});

  }

  contrasenaValidador(control: AbstractControl): ValidationErrors | null {
    const contrasena = control.value;
    const errors: ValidationErrors = {};

    if(!contrasena){
      errors['vacia'] = true;
      return errors;
    }
    const mayusculaValid = /[A-Z]/.test(contrasena);
    const minusculaValid = /[a-z]/.test(contrasena);
    const numeroValid = /\d/.test(contrasena);
    const especialValid = /[@$!%*?&]/.test(contrasena);
    const minimoValid = contrasena.length >=8;

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
    const contrasena = form.get('contrasena1')?.value;
    const contrasenarepetida = form.get('contrasenarepetida')?.value;
    return contrasena === contrasenarepetida? null : {mismatch: true};
  }

  rutValidador(control: AbstractControl): ValidationErrors | null {
    const rut = control.value;
    
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');

    const rutRegex = /^[0-9]{7,8}[0-9kK]?$/;

    if (!rutRegex.test(rutLimpio)){
      return {rutInvalido: true}
    }
    return null;
  }

  fechaNacValidar(control: AbstractControl): ValidationErrors | null {
    const fechaNac = new Date(control.value);
    const fechaActual = new Date();
    const edadMinima = 16;
    const edadMaxima = 130;
    const edadUsuario = fechaActual.getFullYear() - fechaNac.getFullYear();

    if (edadUsuario < edadMinima){
      return {menorDeEdad: true};
    }
    if (edadUsuario > edadMaxima){
      return {maximoEdad: true};
    }
    if (fechaNac >= fechaActual){
      return {fechaInvalida: true};
    }
    return null;
  }

  validarRegistro(){
    if (this.registroForm.valid){
      this.router.navigate(['/login']);
    }
  }

  irLogin(){
    this.router.navigate(['/login']);
  }
}
