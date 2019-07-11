import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCompletedItemComponent } from './todo-completed-item.component';

describe('TodoCompletedItemComponent', () => {
  let component: TodoCompletedItemComponent;
  let fixture: ComponentFixture<TodoCompletedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCompletedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCompletedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
