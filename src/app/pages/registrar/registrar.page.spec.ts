import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPage } from './registrar.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('RegistrarPage', () => {
  let component: RegistrarPage;
  let fixture: ComponentFixture<RegistrarPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPage ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [SQLite, NativeStorage]
    })
    fixture = TestBed.createComponent(RegistrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar formulario registro vacio', () =>{
    component.registroForm.controls['usuario1'].setValue('');
    component.registroForm.controls['email1'].setValue('');
    component.registroForm.controls['rut'].setValue('');
    component.registroForm.controls['telefono'].setValue('');
    component.registroForm.controls['direccion'].setValue('');
    component.registroForm.controls['comuna'].setValue('');
    component.registroForm.controls['fechanac'].setValue('');
    component.registroForm.controls['contrasena1'].setValue('');
    component.registroForm.controls['contrasenarepetida'].setValue('');
    
    expect(component.registroForm.valid).toBeFalsy();
    expect(component.registroForm.controls['usuario1'].hasError('required')).toBeTruthy();
    expect(component.registroForm.controls['email1'].hasError('required')).toBeTruthy();
    expect(component.registroForm.controls['rut'].hasError('required')).toBeTruthy();
    expect(component.registroForm.controls['telefono'].hasError('required')).toBeTruthy();
    expect(component.registroForm.controls['direccion'].hasError('required')).toBeTruthy();
    expect(component.registroForm.controls['comuna'].hasError('required')).toBeTruthy();
    expect(component.registroForm.controls['fechanac'].hasError('required')).toBeTruthy();
    expect(component.registroForm.controls['contrasena1'].hasError('required')).toBeTruthy();
    expect(component.registroForm.controls['contrasenarepetida'].hasError('required')).toBeTruthy();
  })
});
