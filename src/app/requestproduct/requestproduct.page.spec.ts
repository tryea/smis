import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestproductPage } from './requestproduct.page';

describe('RequestproductPage', () => {
  let component: RequestproductPage;
  let fixture: ComponentFixture<RequestproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestproductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
