import { Component, OnInit } from '@angular/core';
import { TodosService } from 'app/todos/services/todos.service';
import { FilterEnum } from 'app/todos/types/filter.enum';
import { TodoInterface } from 'app/todos/types/todo.interface';
import { combineLatest, Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  visibleTodos$: Observable<TodoInterface[]>;

  constructor(private todosService: TodosService) {
    //combine Latest combine streams 
    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$
      //Pipe let us call functions when combining streams
    ]).pipe(map(([todos, filter]:  [TodoInterface[], FilterEnum]) => {
      console.log('combine', todos, filter);
      if (filter === FilterEnum.active){
        return todos.filter((todo) => !todo.isCompleted)
      } else if (filter === FilterEnum.completed) {
        return todos.filter((todo) => todo.isCompleted)
      }
      return todos;
    }))
   }
  ngOnInit() { }

}
