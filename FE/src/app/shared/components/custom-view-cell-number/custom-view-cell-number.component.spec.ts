/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustomViewCellNumberComponent } from './custom-view-cell-number.component';

describe('CustomViewCellNumberComponent', () => {
  let component: CustomViewCellNumberComponent;
  let fixture: ComponentFixture<CustomViewCellNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomViewCellNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomViewCellNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
