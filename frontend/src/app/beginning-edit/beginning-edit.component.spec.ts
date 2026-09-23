import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginningEditComponent } from './beginning-edit.component';

describe('BeginningEditComponent', () => {
  let component: BeginningEditComponent;
  let fixture: ComponentFixture<BeginningEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeginningEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeginningEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
