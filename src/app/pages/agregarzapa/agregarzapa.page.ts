import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';
import { Camera, CameraResultType} from '@capacitor/camera'

@Component({
  selector: 'app-agregarzapa',
  templateUrl: './agregarzapa.page.html',
  styleUrls: ['./agregarzapa.page.scss'],
})
export class AgregarzapaPage implements OnInit {

  zapaForm!: FormGroup
  idUsuario: string = '';
  idRol: string = '';

  imagen: any;

  arregloMarcas: any = [
    {
      id: '',
      nombre: ''
    }
  ];

  constructor(private router: Router, private bd: ServicesbdService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.zapaForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      precio: [0, [Validators.required, this.validarPrecio.bind(this)]],
      talla1: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla2: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla3: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla4: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla5: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla6: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla7: [0, [Validators.required, this.validarTalla.bind(this)]],
      talla8: [0, [Validators.required, this.validarTalla.bind(this)]],
      marca: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
    }, {validators: this.validarZero});

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

    this.bd.dbState().subscribe(data=>{
      if(data){
        this.bd.fetchMarca().subscribe(res=>{
          this.arregloMarcas = res;
        })
      }
    })
  }

  validarPrecio(control: FormControl): ValidationErrors | null{
    const precio = control?.value;
    if (precio<1){
      return { precioInvalido:true};
    }
    return null;
  }

  validarTalla(control: FormControl): ValidationErrors | null{
    const talla = control?.value;
    if (talla<0){
      return { tallaInvalida:true};
    }
    return null;
  }

  validarZapatilla(){
    if(this.zapaForm.valid){
      const nombre = this.zapaForm.get('nombre')?.value;
      const precio = this.zapaForm.get('precio')?.value;
      const talla1 = this.zapaForm.get('talla1')?.value;
      const talla2 = this.zapaForm.get('talla2')?.value;
      const talla3 = this.zapaForm.get('talla3')?.value;
      const talla4 = this.zapaForm.get('talla4')?.value;
      const talla5 = this.zapaForm.get('talla5')?.value;
      const talla6 = this.zapaForm.get('talla6')?.value;
      const talla7 = this.zapaForm.get('talla7')?.value;
      const talla8 = this.zapaForm.get('talla8')?.value;
      const idmarca = this.zapaForm.get('marca')?.value;
      
      this.bd.insertarZapatilla(nombre, this.imagen, precio, idmarca).then(idZapatilla =>{
        this.bd.insertarTalla(idZapatilla, talla1, '7.5');
        this.bd.insertarTalla(idZapatilla, talla2, '8');
        this.bd.insertarTalla(idZapatilla, talla3, '8.5');
        this.bd.insertarTalla(idZapatilla, talla4, '9');
        this.bd.insertarTalla(idZapatilla, talla5, '9.5');
        this.bd.insertarTalla(idZapatilla, talla6, '10');
        this.bd.insertarTalla(idZapatilla, talla7, '10.5');
        this.bd.insertarTalla(idZapatilla, talla8, '11');
      })
      this.bd.seleccionarZapatilla();
      this.router.navigate(['/zapatillas']);
    }
  }

  takePicture = async() =>{
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    this.imagen = image.webPath;

    this.zapaForm.patchValue({
      imagen: this.imagen
    });
  }
  
  validarZero(control:AbstractControl): ValidationErrors | null {
    const {talla1, talla2, talla3, talla4, talla5, talla6, talla7, talla8} = control.value;

    const todoCero = [
      talla1, talla2, talla3, talla4, talla5, talla6, talla7, talla8
    ].every(talla => talla ===0);

    return todoCero ? {tallasInvalidas: true} : null;
  }
}
