import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicesbdService } from 'src/app/services/servicesbd.service';
import { Talla } from 'src/app/services/talla';

@Component({
  selector: 'app-editarzapa',
  templateUrl: './editarzapa.page.html',
  styleUrls: ['./editarzapa.page.scss'],
})
export class EditarzapaPage implements OnInit {

  modZapaForm!: FormGroup;
  idUsuario: string = '';
  idRol: string = '';

  imagen: any;

  zapatillaSelec: any = {};

  arregloMarcas: any = [
    {
      id: '',
      nombre: ''
    }
  ];

  constructor(private router: Router,private bd:ServicesbdService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.modZapaForm = this.formBuilder.group({
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

    this.activatedRoute.queryParams.subscribe(res =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        const id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
        if (id){
          this.bd.seleccionarZapaId(id).then(res =>{
            this.zapatillaSelec = res;
            this.imagen = res?.zfoto;

            this.modZapaForm.patchValue({
              nombre: this.zapatillaSelec.znombre,
              precio: this.zapatillaSelec.zprecio,
              talla1: this.zapatillaSelec.tallas[0].stock,
              talla2: this.zapatillaSelec.tallas[1].stock,
              talla3: this.zapatillaSelec.tallas[2].stock,
              talla4: this.zapatillaSelec.tallas[3].stock,
              Talla5: this.zapatillaSelec.tallas[4].stock,
              talla6: this.zapatillaSelec.tallas[5].stock,
              talla7: this.zapatillaSelec.tallas[6].stock,
              talla8: this.zapatillaSelec.tallas[7].stock,
              marca: this.zapatillaSelec.idmarca,
              imagen: this.zapatillaSelec.zfoto
            })
          })
        }
      }
    })

    this.bd.dbState().subscribe(data=>{
      if(data){
        this.bd.fetchMarca().subscribe(res=>{
          this.arregloMarcas = res;
        })
      }
    })
  }

  validarZapatilla(){
    
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

  takePicture = async() =>{
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    this.imagen = image.webPath;

    this.modZapaForm.patchValue({
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
