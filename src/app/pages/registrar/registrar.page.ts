import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Comuna } from 'src/app/services/comuna';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  registroForm!: FormGroup;
  arregloComunas: any = [
    {
      id: '',
      nombre: '',
    }
  ];

  constructor(private router: Router, private formBuilder: FormBuilder, private bd: ServicesbdService) { }

  

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      usuario1: ['', [Validators.required, Validators.minLength(5)]],
      email1: ['', [Validators.required, Validators.email]],
      rut:['', [Validators.required, this.rutValidador]],
      telefono: ['',[Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
      direccion: ['', [Validators.required,Validators.minLength(5), Validators.pattern(/.*\d+.*/)]],
      comuna: ['', Validators.required],
      fechanac: ['', [Validators.required, this.validarFechaNac.bind(this)]],
      contrasena1: [null, [Validators.required, this.contrasenaValidador]],
      contrasenarepetida: ['', Validators.required]
    }, {validator: this.contrasenasIguales});

    this.bd.dbState().subscribe(data=>{
      if(data){
        this.bd.fetchComuna().subscribe(res=>{
          this.arregloComunas = res;
        })
      }
    })
  }

  // validarUsuario(){
  //   const usuarioControl = this.registroForm.get('usuario1');
  //   const usuario = usuarioControl?.value;

  //   if (usuario){
  //     this.bd.verificarUsuario(usuario).then(existe =>{
  //       if (existe){
  //         usuarioControl?.setErrors({usuarioExistente:true});
  //       }else{
  //         usuarioControl?.setErrors(null);
  //       }
  //     });
  //   }
  // }

  validarCorreo(){

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

  validarFechaNac(control: any){
    const valor = control.value;

    if(!valor){
      return null;
    }

    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if(!regex.test(valor)){
      return { fechaInvalida: true};
    }

    const [dia, mes, anio] = valor.split('/').map(Number);
    const fecha = new Date(anio,mes -1, dia);

    if(fecha.getFullYear() !== anio || fecha.getMonth() + 1 !== mes || fecha.getDate() !== dia){
      return { fechaInvalida: true};
    }

    const hoy = new Date();
    
    if(fecha >  hoy){
      return{fechaMayor: true};
    }

    const edad = hoy.getFullYear() - fecha.getFullYear();
    const mesNacimiento = fecha.getMonth();
    const mesActual = hoy.getMonth();
    const diaNacimiento = fecha.getDate();
    const diaActual = hoy.getDate();

    if(edad < 16 || (edad === 16 &&(mesNacimiento > mesActual || (mesNacimiento === mesActual && diaNacimiento > diaActual)))){
      return {menorDeEdad: true};
    }

    if (edad > 130){
      return {maximoEdad: true};
    }

  return null;
  }

  validarRegistro(){
    if (this.registroForm.valid){
      const usuario = this.registroForm.get('usuario1')?.value;
      const email = this.registroForm.get('email1')?.value;
      const rut = this.registroForm.get('rut')?.value;
      const telefono = this.registroForm.get('telefono')?.value;
      const fechanac = this.registroForm.get('fechanac')?.value;
      const idComuna = this.registroForm.get('comuna')?.value;
      const direccion = this.registroForm.get('direccion')?.value;
      const contrasena = this.registroForm.get('contrasena1')?.value;
      
      this.bd.insertarUsuario(usuario, email, rut, telefono, fechanac, contrasena).then(idUsuario =>{
        this.bd.insertarDireccion(direccion, idUsuario, idComuna).then(()=>{
          this.router.navigate(['/login']);
        })
      })
    }
  }

  irLogin(){
    this.router.navigate(['/login']);
  }
}