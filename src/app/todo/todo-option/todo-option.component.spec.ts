import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoOptionComponent } from './todo-option.component';

describe('TodoOptionComponent', () => {
  let component: TodoOptionComponent;
  let fixture: ComponentFixture<TodoOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
