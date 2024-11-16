import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPage ],
      imports: [
        IonicModule.forRoot(),
        Paquete1Module
      ],
      providers: [SQLite, NativeStorage]
    })
    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
