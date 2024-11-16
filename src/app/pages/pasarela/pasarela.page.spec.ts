import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasarelaPage } from './pasarela.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute } from '@angular/router';
import { Paquete1Module } from 'src/app/components/paquete1/paquete1.module';

describe('PasarelaPage', () => {
  let component: PasarelaPage;
  let fixture: ComponentFixture<PasarelaPage>;

  beforeEach( async() => {
    await TestBed.configureTestingModule({
      declarations: [ PasarelaPage ],
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
    }).compileComponents();
    fixture = TestBed.createComponent(PasarelaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
