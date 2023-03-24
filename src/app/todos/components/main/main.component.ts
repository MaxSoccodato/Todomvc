import { Component, OnInit } from '@angular/core';
import { TodosService } from 'app/todos/services/todos.service';
import { FilterEnum } from 'app/todos/types/filter.enum';
import { TodoInterface } from 'app/todos/types/todo.interface';
import { combineLatest, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<Boolean>;
  isAllTodosSelected$: Observable<Boolean>;

  constructor(private todosService: TodosService) {
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    console.log("notodoclass", this.noTodoClass$)
    //combine Latest combine streams
    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$,
      //Pipe let us call functions when combining streams
    ]).pipe(
      map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
        console.log('combine', todos, filter);
        if (filter === FilterEnum.active) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.completed) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  toggleAllTodos(event: Event) : void{
    const target = event.target as HTMLInputElement
    this.todosService.toggleAll(target.checked)
  }
  ngOnInit() {}
}
