import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatestockPage } from './updatestock.page';

describe('UpdatestockPage', () => {
  let component: UpdatestockPage;
  let fixture: ComponentFixture<UpdatestockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatestockPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatestockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
