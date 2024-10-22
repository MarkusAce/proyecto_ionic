import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  idUsuario: string = '';
  idRol: string = '';

  nombreRol: string = '';
  
  constructor(private router: Router, private formBuilder: FormBuilder, private bd: ServicesbdService) { }

  

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      usuario1: ['', [Validators.required, Validators.minLength(5)],[this.validarUsuario.bind(this)]],
      email1: ['', [Validators.required, Validators.email],[this.validarCorreo.bind(this)]],
      rut:['', [Validators.required, this.rutValidador.bind(this)], [this.validarExisteRut.bind(this)]],
      telefono: ['',[Validators.required, Validators.pattern(/^9[0-9]{8}$/)]],
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

    if (this.idRol =='1'){
      this.nombreRol = 'Usuario';
    }
    if(this.idRol =='3'){
      this.nombreRol = 'Administrador';
    }
  }

   validarUsuario(control: AbstractControl): Promise<ValidationErrors | null>{
     
     const usuario = control?.value.toLowerCase();
     
     if (usuario){
        return this.bd.verificarUsuario(usuario).then(existe =>{
         if (existe){
           return { usuarioExiste:true };
         }
         return null;
       });
     }
     return Promise.resolve(null);
   }

  validarCorreo(control: AbstractControl): Promise<ValidationErrors | null>{

    const email = control?.value.toLowerCase();

    if (email){
      return this.bd.verificarEmail(email).then(existe =>{
        if (existe){
          return { emailExiste:true};
        }
        return null;
      });
    }
    return Promise.resolve(null);
  }

  validarExisteRut(control: AbstractControl): Promise<ValidationErrors | null>{
    
    const rut = control?.value;

    if (rut){
      return this.bd.verificarExisteRut(rut).then(existe =>{
        if (existe){
          return { rutExiste:true};
        }
        return null;
      });
    }
    return Promise.resolve(null);
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
    const rut = control.value?.trim();
    
    if (!rut){
      return { required:true }
    }

    const rutLimpio = rut.replace(/[.\-]/g, '');

    const rutRegex = /^[0-9]{7,8}[0-9kK]?$/;

    if (!rutRegex.test(rutLimpio)){
      return {rutInvalido: true}
    }

    const cuerpoRut = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();

    const digitoEsperado = this.calcularDV(cuerpoRut);

    if (dv !== digitoEsperado){
      return{dvInvalido: true};
    }

    return null;
  }

  calcularDV(cuerpoRut: string):string{
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpoRut.length - 1; i >= 0; i--){
      suma += parseInt(cuerpoRut.charAt(i),10)*multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
    }

    const resto = suma % 11;
    const digitoCalculado = 11 - resto;

    if (digitoCalculado === 11){
      return '0';
    }
    if (digitoCalculado === 10){
      return 'K';
    }
    return digitoCalculado.toString();
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
      const usuario = this.registroForm.get('usuario1')?.value.toLowerCase();
      const email = this.registroForm.get('email1')?.value.toLowerCase();
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

  validarRegistroAdmin(){
    if (this.registroForm.valid){
      const usuario = this.registroForm.get('usuario1')?.value.toLowerCase();
      const email = this.registroForm.get('email1')?.value.toLowerCase();
      const rut = this.registroForm.get('rut')?.value;
      const telefono = this.registroForm.get('telefono')?.value;
      const fechanac = this.registroForm.get('fechanac')?.value;
      const idComuna = this.registroForm.get('comuna')?.value;
      const direccion = this.registroForm.get('direccion')?.value;
      const contrasena = this.registroForm.get('contrasena1')?.value;
      
      this.bd.insertarUsuarioAdmin(usuario, email, rut, telefono, fechanac, contrasena).then(idUsuario =>{
        this.bd.insertarDireccion(direccion, idUsuario, idComuna).then(()=>{
        this.router.navigate(['/perfil']);
        })
      })
    }
  }

  irLogin(){
    this.router.navigate(['/login']);
  }
}