import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Marca } from 'src/app/services/marca';
import { ServicesbdService } from 'src/app/services/servicesbd.service';
import { Zapatilla } from 'src/app/services/zapatilla';

@Component({
  selector: 'app-zapatillas',
  templateUrl: './zapatillas.page.html',
  styleUrls: ['./zapatillas.page.scss'],
})
export class ZapatillasPage implements OnInit {

  terminoBusqueda: string = '';
  resultado: string = '';
  idUsuario: string = '';
  idRol: string = '';
  uusuario!: string;

  noResultados: boolean = false;

  tamanoListaUsuario!: number;

  tamanoListaAdmin!: number;

  arregloZapatillas: Zapatilla[] = [];

  arregloUsuario: Zapatilla[] = [];

  marcaSeleccionada: string | null = null;

  arregloMarcas: any = [
    {
      id: '',
      nombre: ''
    }
  ];

  constructor(private router: Router, private bd: ServicesbdService, private activerouter: ActivatedRoute) { }

  ngOnInit() {
    this.activerouter.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.terminoBusqueda = this.router.getCurrentNavigation()?.extras?.state?.['termino'];
      }
    })
    this.bd.dbState().subscribe(data =>{
      if(data){
        this.bd.fetchTipoUsuario().subscribe(res =>{
          if(res.length> 0){
            this.idUsuario = res[0].idUsuario;
            this.idRol = res[0].idRol;
            this.uusuario = res[0].uusuario;
          }else{
            this.idUsuario = '';
            this.idRol = '1';
            this.uusuario = '';
          }
        });
        this.cargarZapatillas();
        if (this.terminoBusqueda !== ''){
          this.irBusqueda();
        }
        this.bd.fetchMarca().subscribe(res=>{
          this.arregloMarcas = res;
        })
        
      }
      
    });

  }

  irProducto(idzapatilla: string){
    let navigationExtras: NavigationExtras = {
      state: {
        id: idzapatilla
      }
    }
    this.router.navigate(['/producto'], navigationExtras)
  }
  irInicio(){
    this.router.navigate(['/inicio'])
  }
  irEditar(idzapatilla: string){
    let navigationExtras: NavigationExtras = {
      state: {
        id: idzapatilla
      }
    }
    this.router.navigate(['/editarzapa'], navigationExtras)
  }
  irAgregarZapa(){
    this.router.navigate(['/agregarzapa'])
  }
  irAgregarMarca(){
    this.router.navigate(['/agregarmarca'])
  }

  async confirmarDeshabilitar(id:string){
    this.bd.deshabilitarProducto(id)
    this.router.navigate(['/zapatillas'])
  }

  async habilitar(id:string){
    this.bd.habilitarProductoPorId(id);
    this.router.navigate(['/zapatillas'])
  }

  cargarZapatillas(){
    this.bd.fetchZapatilla().subscribe(res=>{
      this.arregloZapatillas = res;

      if (this.idRol == '1' || this.idRol == '2'){
        this.arregloUsuario = this.arregloZapatillas.filter(zapatilla => zapatilla.zestado === 0 && zapatilla.tallas.some(t => t.stock > 0));
      }
    })
  }

  filtrarZapatillas(){
    if ( this.idRol == '1' || this.idRol == '2' ){
        this.arregloUsuario = this.arregloZapatillas.filter(zapatilla =>{
        const marcaCoincide = this.marcaSeleccionada ? zapatilla.idmarca === this.marcaSeleccionada : true;
  
        return zapatilla.zestado === 0 && marcaCoincide && zapatilla.tallas.some(t => t.stock > 0);
      });
      this.noResultados = this.arregloUsuario.length === 0;
      
    }else if (this.idRol == '3'){
      this.arregloZapatillas = this.arregloZapatillas.filter(zapatilla =>{
        const marcaCoincide = this.marcaSeleccionada ? zapatilla.idmarca === this.marcaSeleccionada : true;
        return marcaCoincide
      })
      this.noResultados = this.arregloZapatillas.length === 0;
    }
      
  }

  limpiarFiltro(){
    this.marcaSeleccionada = null;
    if (this.idRol== '1' || this.idRol == '2'){
      this.arregloUsuario = this.arregloZapatillas.filter(zapatilla => zapatilla.zestado === 0 && zapatilla.tallas.some(t => t.stock > 0));
      this.noResultados = false;
    } else if (this.idRol == '3'){
      this.noResultados = false;
    }
  }

  irBusqueda(){
    this.resultado = this.terminoBusqueda;
    if (this.terminoBusqueda == ''){
      this.cargarZapatillas();
      this.noResultados = false;
    }else{
      if(this.idRol == '1' || this.idRol == '2'){
        this.arregloUsuario = this.arregloZapatillas.filter(zapatilla => zapatilla.znombre.toLowerCase(). includes(this.terminoBusqueda.toLowerCase()) && zapatilla.zestado === 0 && zapatilla.tallas.some(t =>t.stock > 0));
        this.tamanoListaUsuario = this.arregloUsuario.length;
        this.terminoBusqueda = '';
        this.noResultados = false;
      } else if (this.idRol == '3'){
        this.arregloZapatillas = this.arregloZapatillas.filter(zapatilla => zapatilla.znombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()));
        this.tamanoListaAdmin = this.arregloZapatillas.length;
        this.terminoBusqueda = '';
        this.noResultados = false;
      }
    }
  }
}
