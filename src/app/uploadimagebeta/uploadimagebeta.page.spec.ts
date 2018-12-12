import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadimagebetaPage } from './uploadimagebeta.page';

describe('UploadimagebetaPage', () => {
  let component: UploadimagebetaPage;
  let fixture: ComponentFixture<UploadimagebetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadimagebetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadimagebetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
