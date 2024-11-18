import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarcontraPage } from './cambiarcontra.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute } from '@angular/router';

describe('CambiarcontraPage', () => {
  let component: CambiarcontraPage;
  let fixture: ComponentFixture<CambiarcontraPage>;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarcontraPage ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [SQLite, NativeStorage,
        {
          provide: ActivatedRoute,
          useValue: {queryParams: {subscribe: (fn: Function) => fn({})}}
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CambiarcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar formulario recuperarcontrasena vacio', () =>{
    component.contrasenacodigoForm.controls['codigo'].setValue('');
    component.contrasenacodigoForm.controls['nueva'].setValue('');
    component.contrasenacodigoForm.controls['confirmar'].setValue('');
    
    expect(component.contrasenacodigoForm.valid).toBeFalsy();
    expect(component.contrasenacodigoForm.controls['codigo'].hasError('required')).toBeTruthy();
    expect(component.contrasenacodigoForm.controls['nueva'].hasError('required')).toBeTruthy();
    expect(component.contrasenacodigoForm.controls['confirmar'].hasError('required')).toBeTruthy();
  })

  it('Validar formulario cambiarcontrasena vacio', () =>{
    component.contrasenaForm.controls['antigua'].setValue('');
    component.contrasenaForm.controls['nueva'].setValue('');
    component.contrasenaForm.controls['confirmar'].setValue('');
    
    expect(component.contrasenaForm.valid).toBeFalsy();
    expect(component.contrasenaForm.controls['antigua'].hasError('required')).toBeTruthy();
    expect(component.contrasenaForm.controls['nueva'].hasError('required')).toBeTruthy();
    expect(component.contrasenaForm.controls['confirmar'].hasError('required')).toBeTruthy();
  })
});
