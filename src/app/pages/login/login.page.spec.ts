import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [SQLite, NativeStorage]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar formulario vacio', () =>{
    component.loginForm.controls['usuario'].setValue('');
    component.loginForm.controls['contrasena'].setValue('');
    
    expect(component.loginForm.valid).toBeFalsy();
    expect(component.loginForm.controls['usuario'].hasError('required')).toBeTruthy();
    expect(component.loginForm.controls['contrasena'].hasError('required')).toBeTruthy();
  })
});
