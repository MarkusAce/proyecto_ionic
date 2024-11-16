import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarmarcaPage } from './editarmarca.page';

describe('EditarmarcaPage', () => {
  let component: EditarmarcaPage;
  let fixture: ComponentFixture<EditarmarcaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarmarcaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
