import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServicesbdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  terminoBusqueda: string = "";
  usuario: string = "";
  
  constructor(private router: Router, private activerouter: ActivatedRoute, private bd: ServicesbdService) {
    this.activerouter.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    })
   }

  ngOnInit() {
  }

  irZapatillasad(){
    this.router.navigate(['/zapatillasad'])
  }
  irListacomprasad(){
    this.router.navigate(['/listacomprasad'])
  }
  irInicio(){
    this.router.navigate(['/inicio'])
  }
}
