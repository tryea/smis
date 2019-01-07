import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfmakerbetaPage } from './pdfmakerbeta.page';

describe('PdfmakerbetaPage', () => {
  let component: PdfmakerbetaPage;
  let fixture: ComponentFixture<PdfmakerbetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfmakerbetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfmakerbetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
