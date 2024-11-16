import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoPage } from './producto.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute } from '@angular/router';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

describe('ProductoPage', () => {
  let component: ProductoPage;
  let fixture: ComponentFixture<ProductoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoPage ],
      imports: [
        IonicModule.forRoot(),
        Paquete1Module
      ],
      providers: [SQLite, NativeStorage,
        {
          provide: ActivatedRoute,
          useValue: {queryParams: {subscribe: (fn: Function) => fn({})}}
        }
      ]
    })
    fixture = TestBed.createComponent(ProductoPage);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
