import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('CarritoPage', () => {
  let component: CarritoPage;
  let fixture: ComponentFixture<CarritoPage>;

  beforeEach( async() => {
    const nativeStorageMock = {
      keys: jasmine.createSpy('keys').and.returnValue(Promise.resolve(['carrito_test_user'])),
      getItem: jasmine.createSpy('getItem').and.returnValue(Promise.resolve([]))
    }

    await TestBed.configureTestingModule({
      declarations: [ CarritoPage ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [SQLite, 
        {provide: NativeStorage, useValue: nativeStorageMock}
      ]
    })
    fixture = TestBed.createComponent(CarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
