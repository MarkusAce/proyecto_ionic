import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarmarcaPage } from './agregarmarca.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('AgregarmarcaPage', () => {
  let component: AgregarmarcaPage;
  let fixture: ComponentFixture<AgregarmarcaPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarmarcaPage ],
      imports: [
        IonicModule.forRoot()
      ],
      providers: [SQLite, NativeStorage]
    })
    fixture = TestBed.createComponent(AgregarmarcaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
