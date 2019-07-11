import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPendingItemComponent } from './todo-pending-item.component';

describe('TodoPendingItemComponent', () => {
  let component: TodoPendingItemComponent;
  let fixture: ComponentFixture<TodoPendingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoPendingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPendingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
