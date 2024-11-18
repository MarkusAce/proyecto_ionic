import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarcontrasenaPage } from './recuperarcontrasena.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { HttpClientModule } from '@angular/common/http';

describe('RecuperarcontrasenaPage', () => {
  let component: RecuperarcontrasenaPage;
  let fixture: ComponentFixture<RecuperarcontrasenaPage>;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarcontrasenaPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientModule
      ],
      providers: [SQLite, NativeStorage]
    })
    fixture = TestBed.createComponent(RecuperarcontrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
