import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarzapaPage } from './agregarzapa.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('AgregarzapaPage', () => {
  let component: AgregarzapaPage;
  let fixture: ComponentFixture<AgregarzapaPage>;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarzapaPage ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [SQLite, NativeStorage]
    })
    fixture = TestBed.createComponent(AgregarzapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar formulario cambiarcontrasena vacio', () =>{
    component.zapaForm.controls['nombre'].setValue('');
    component.zapaForm.controls['precio'].setValue('');
    component.zapaForm.controls['talla1'].setValue('');
    component.zapaForm.controls['talla2'].setValue('');
    component.zapaForm.controls['talla3'].setValue('');
    component.zapaForm.controls['talla4'].setValue('');
    component.zapaForm.controls['talla5'].setValue('');
    component.zapaForm.controls['talla6'].setValue('');
    component.zapaForm.controls['talla7'].setValue('');
    component.zapaForm.controls['talla8'].setValue('');
    component.zapaForm.controls['marca'].setValue('');
    component.zapaForm.controls['imagen'].setValue('');
    
    expect(component.zapaForm.valid).toBeFalsy();
    expect(component.zapaForm.controls['nombre'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['precio'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['talla1'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['talla2'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['talla3'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['talla4'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['talla5'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['talla6'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['talla7'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['talla8'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['marca'].hasError('required')).toBeTruthy();
    expect(component.zapaForm.controls['imagen'].hasError('required')).toBeTruthy();
  })
});
