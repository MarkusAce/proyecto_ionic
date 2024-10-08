import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barranav',
  templateUrl: './barranav.component.html',
  styleUrls: ['./barranav.component.scss'],
})
export class BarranavComponent  implements OnInit {

  @Input() titulo: string = "";
  @Input() tipousuario: string = "";
  constructor(private router: Router) { }

  ngOnInit() {}
  irPerfil(){
    if(this.tipousuario==="2"){
      this.router.navigate(['/perfil'])
    }
    else if(this.tipousuario==="3"){
      this.router.navigate(['/perfil'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }
}
