import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestproductlistPage } from './requestproductlist.page';

describe('RequestproductlistPage', () => {
  let component: RequestproductlistPage;
  let fixture: ComponentFixture<RequestproductlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestproductlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestproductlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
