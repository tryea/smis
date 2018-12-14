import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadimagebetaPage } from './downloadimagebeta.page';

describe('DownloadimagebetaPage', () => {
  let component: DownloadimagebetaPage;
  let fixture: ComponentFixture<DownloadimagebetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadimagebetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadimagebetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
