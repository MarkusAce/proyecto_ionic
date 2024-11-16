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
});
